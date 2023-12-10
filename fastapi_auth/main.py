import json, os
from fastapi import FastAPI, Depends, HTTPException, status, Response, Cookie
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timedelta
from typing import Literal, List
from fastapi.middleware.cors import CORSMiddleware

# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "5198037bf70bc2a44a4b8f7724599ac915d1815bda9e3fb947bff15e85e132df"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES =  0.1
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 30


class Signup(BaseModel):
    username: str
    password: str

class LoginToken(BaseModel):
    access_token: str
    token_type: str

class RefreshToken(BaseModel):
    access_token: str

class TokenData(BaseModel):
    username: Optional[str] = None

class User(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    disabled: Optional[bool] = None
    roles: List[Literal['user', 'editor', 'admin']]

class UserInDB(User):
    hashed_password: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def decode_token(token: str):
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(username: str):
    db = read_json("database.json")
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)

def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def read_json(filename: str):
    try:
        with open(filename, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return {}

def write_json(data, filename: str):
    with open(filename, "w") as file:
        json.dump(data, file)

@app.post("/signup")
async def signup(signup: Signup):
    users = read_json("database.json")
    if signup.username in users:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists",
        )
    users[signup.username] = UserInDB(
        username=signup.username, hashed_password=get_password_hash(signup.password),
        roles=['user']
    ).model_dump()
    write_json(users, "database.json")
    return {"message": "User created successfully"}

@app.post("/signin", response_model=LoginToken)
async def signin(form_data: OAuth2PasswordRequestForm = Depends(), response: Response = None):
    
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "roles": user.roles}, expires_delta=access_token_expires
    )
    refresh_token_expires = timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
    refresh_token = create_access_token(
        data={"sub": user.username}, expires_delta=refresh_token_expires
    )

    # Set refresh token in HTTPOnly cookie
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,   # Important: Makes the cookie inaccessible to JavaScript
        max_age=refresh_token_expires.total_seconds(), # Set the duration for the cookie
        secure=True,     # Send the cookie only over HTTPS
        samesite='Lax'   # Helps with CSRF protection
    )

    return {"access_token": access_token, "token_type": "bearer"}


def get_user_from_token(token: str):
    try:
        payload = decode_token(token)
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)
        user = get_user(username)
        if user is None:
            raise HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)
        return user
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    

async def get_current_user(refresh_token: str = Cookie(None)):
    user = get_user_from_token(refresh_token)  # Implement this function
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

@app.get("/users", response_model=List[User])
async def get_users(current_user: User = Depends(get_current_user)):
    if 'admin' not in current_user.roles:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough privileges"
        )
    users = read_json("database.json")
    return [User(**user_dict) for user_dict in users.values()]


@app.get("/refresh_token", response_model=RefreshToken)
async def refresh_token(current_user: User = Depends(get_current_user)):
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": current_user.username, "roles": current_user.roles}, expires_delta=access_token_expires
    )
    return {"access_token": access_token}


@app.post("/logout")
def logout(response: Response):
    # Clear the refresh token cookie
    response.delete_cookie(
        key="refresh_token",
        httponly=True,
        secure=True,
        samesite='Lax'
    )

    # Optional: Invalidate the refresh token in your backend
    # This would involve database operations to mark the token as invalid
    # ...

    return {"message": "Logged out"}

if __name__ == "__main__":
    os.system("uvicorn main:app --host 0.0.0.0 --port 3500")