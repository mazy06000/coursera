from fastapi import FastAPI
from joblib import load
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import re
import uvicorn
from pydantic import BaseModel

app = FastAPI()


# Load models
model = load('model.pkl')
tfidf = load('tfidf.pkl')

# Download the Italian stop words
nltk.download('stopwords')
stop_words = set(stopwords.words('italian'))

class Text(BaseModel):
    text: str

def process_text(text):

    text = text.lower()
    
    # Remove extra spaces
    text = re.sub('\s+', ' ', text)

    text = re.sub('\*+', ' ', text)
    
    # Tokenize the text
    words = text.split()
    
    # Remove the stop words
    words = [word for word in words if word not in stop_words]
    
    return ' '.join(words)

@app.post('/predict')
async def predict(request: Text):

    # Process the text
    processed_text = process_text(request.text)
    
    # Convert the processed text into a matrix of TF-IDF features
    features = tfidf.transform([processed_text])
    
    # Make a prediction
    prediction = model.predict(features)
    
    return {'prediction': int(prediction[0])}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)