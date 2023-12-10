import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  console.log(auth)

  const refreshToken = async () => {
    try {
        const res = await axios.get("/refresh_token",{
            headers: { 
                "Content-Type": "application/x-www-form-urlencoded",
            },
            withCredentials: true,
        });
      setAuth(prev => {
        console.log(JSON.stringify(prev));
        console.log(res.data.access_token);
        console.log(res.data);
        return {
          ...prev,
          roles: res.data.roles,
          accessToken: res.data.access_token,
        };
      });
      return res.data.access_token;
    } catch (err) {
      console.log(err);
    }
  };

  return refreshToken;
};

export default useRefreshToken;
