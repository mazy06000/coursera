import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,12}$/;
const PASS_REGEX = /^[a-zA-Z0-9!@#$%^&*]{8,20}$/;
const REGISTER_URL = "/signup";

const Register = () => {
  const userRef = useRef(null);
  const errRef = useRef(null);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PASS_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PASS_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid username or password.");
      return;
    }
    try {
      const res = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        }
      );
      console.log(res.data);
      setSuccess(true);
    } catch (err) {
      if (!err.response) {
        setErrMsg("Network error. Please try again later.");
      } else if (err.response.status === 409) {
        setErrMsg("Username already exists.");
      } else {
        setErrMsg("Unknown error. Please try again later.");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>You have successfully registered.</p>
          <a href="/">Login</a>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              aria-describedby="uidnote"
              aria-invalid={validName ? "false" : "true"}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "intstructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4-12 characters.
              <br />
              Must start with a letter.
              <br />
              Letters, numbers, underscores, and hyphens only.
            </p>
            <label htmlFor="password">
              Password
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              aria-describedby="pwdnote"
              aria-invalid={validPwd ? "false" : "true"}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "intstructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8-20 characters.
              <br />
              Letters, numbers, and special characters only. Allowed special
              characters: <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="number sign">#</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent sign">%</span>
            </p>
            <label htmlFor="confirm_pwd">
              Confirm Password
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              aria-describedby="confirmnote"
              aria-invalid={validMatch ? "false" : "true"}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "intstructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match password.
            </p>

            <button
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Register
            </button>
          </form>
          <p>
            Already have an account? <a href="/">Login</a>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
