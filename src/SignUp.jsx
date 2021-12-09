import './signUp.css';
import { useEffect, useCallback, useState, useRef } from 'react';
import { EmailOutlined, LockOutlined } from '@material-ui/icons';
import {
  emailValidation,
  passValidation,
  formValidation,
  passText,
} from './Validation';
import PasswordContainer from './PasswordText';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState(' ');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailCorrect, setIsEmailCorrect] = useState(false);
  const [passCorrect, setPassCorrect] = useState(false);
  const [formCorrect, setFormCorrect] = useState(false);
  const [hasFocus, setFocus] = useState(true);
  const ref = useRef();

  const SITE_KEY = process.env.REACT_APP_SITE_KEY;

  console.log('main');
  useEffect(() => {
    if (emailValidation(email)) {
      setIsEmailCorrect(true);
    } else {
      setIsEmailCorrect(false);
    }
  }, [email]);

  useEffect(() => {
    if (passValidation(password)) {
      setPassCorrect(true);
    } else {
      setPassCorrect(false);
    }

    console.log(passCorrect);
  }, [password]);

  useEffect(() => {
    if (emailCorrect && passCorrect & (password === rePassword)) {
      setFormCorrect(true);
      console.log(formCorrect);
    } else {
      setFormCorrect(false);
    }
  }, [email, password, rePassword]);
  useEffect(() => {
    if (document.hasFocus() && ref.current.contains(document.activeElement)) {
      setFocus(true);
    }
  }, []);
  // reCAPTCHA v3 integration for me info check below links
  //www.cluemediator.com/how-to-implement-recaptcha-v3-in-react

  useEffect(() => {
    const loadScriptByURL = (id, url, callback) => {
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }

      if (isScriptExist && callback) callback();
    };

    // load the script by passing the URL
    loadScriptByURL(
      'recaptcha-key',
      `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`,
      function () {
        console.log('Script loaded!');
      }
    );
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    setLoading(true);
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(SITE_KEY, { action: 'submit' })
        .then((token) => {
          submitData(token);
        });
    });
  };

  // this part requests token verify from backend server

  const submitData = (token) => {
    // call a backend API to verify reCAPTCHA response
    fetch('http://localhost:4000/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        'g-recaptcha-response': token,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setResponse(res);
      });
  };

  return (
    <div className="signUpContainer">
      <div className="signUpHeader">
        <div className="signUpTitle">Sign up</div>
        <div className="logInInfo">
          Already have an account? <a href="">Log in</a>{' '}
        </div>
      </div>

      <form action="">
        <div className="inputEmail">
          <EmailOutlined
            className="signUpIcons"
            style={emailCorrect ? { color: 'rgb(13, 124, 13)' } : {}}
          />

          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            className="signUpInput"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputPassword">
          <LockOutlined
            className="signUpIcons"
            style={passCorrect ? { color: 'rgb(13, 124, 13)' } : {}}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="signUpInput"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            ref={ref}
          />
          {hasFocus ? (
            <div className="passInfo">
              <div className="triangle"></div>
              {passText.map((item) => {
                return (
                  <>
                    <PasswordContainer
                      pass={password}
                      item={item}
                      setPassCorrect={setPassCorrect}
                    />{' '}
                  </>
                );
              })}
            </div>
          ) : null}
        </div>
        <div className="inputPassword">
          <LockOutlined
            className="signUpIcons"
            style={password === rePassword ? { color: 'rgb(13, 124, 13)' } : {}}
          />
          <label htmlFor="passwordRepeat">Repeat Password</label>
          <input
            type="password"
            name="passwordRepeat"
            className="signUpInput"
            placeholder="Repeat Password"
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>
        <button
          className="signUpCreate"
          onClick={handleCreate}
          disabled={formCorrect ? false : true}
        >
          {loading ? 'Submitting...' : 'Create an account'}
        </button>
      </form>
      {/* {response && (
        <label> Chloek123.
          Output:
          <br />
          <pre>{JSON.stringify(response, undefined, 2)}</pre>
        </label>
      )} */}
      <div className="signUpInfo">
        <div>
          This site is protected by reCAPTCHA and the Google <br />
          <a href="https://policies.google.com/privacy?hl=en">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="https://policies.google.com/terms?hl=en">Terms of Service</a>{' '}
          apply
        </div>
      </div>
    </div>
  );
};
export default SignUp;
