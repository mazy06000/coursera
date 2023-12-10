import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";

const LOGIN_URL = "/signin";

const Login = () => {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from.pathname || "/";

  const userRef = useRef(null);
  const errRef = useRef(null);

  const [user, resetUser, userAttributes] = useInput('user', '')
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [check, toggleCheck] = useToggle('persist', false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append("username", user);
      params.append("password", pwd);

      const res = await axios.post(LOGIN_URL, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      });
      const accessToken = res?.data?.access_token;
      setAuth({ user, accessToken });
      resetUser();
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      setErrMsg("Invalid username or password.");
      userRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertivbe"
      >
        {errMsg}
      </p>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          {...userAttributes}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button type="submit">Login</button>
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            checked={check}
            onChange={toggleCheck}
          />
          <label htmlFor="persist">Keep me logged in</label>
        </div>
      </form>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </section>
  );
};

export default Login;
