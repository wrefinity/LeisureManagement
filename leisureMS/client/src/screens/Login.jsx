import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { LineWave } from "react-loader-spinner";

import {
  handleInput,
  loaderSize,
  loaderColor,
  validateEmpty,
  Notifier,
} from "../utills/InputHelpers";
import { reseter, login } from "../slicer/Auth";


const Login = () => {
  const { user, status, message } = useSelector((state) => state.auth);
  const [loginData, setLogin] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const referal = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const redirector = () => {
    navigate(from, { replace: true });
  };

  const reset = () => {
    setLogin({
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    referal.current();
  }, [formErrors, status, message, navigate, dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    setFormErrors(validateEmpty(loginData));
    setIsSubmit(true);
  };

  const dispatchLogin = () => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(reseter());
      dispatch(login(loginData));
      setIsSubmit(false);
    }

    if (status === "succeeded") {
      Notifier("login sucess", "success")
      dispatch(reseter());
      reset();
      navigate("/profile");
    }
    if (user) {
      dispatch(reseter());
      reset();
      // redirector();
      navigate("/profile"); 
    }
    if (status === "failed") {
      dispatch(reseter());
      Notifier(message, "error")
      setIsSubmit(false);
    }
  };
  referal.current = dispatchLogin;

  return (
    <div className="wrapper">
      <div className="text-center mt-4 name"> Login </div>
      <form className="p-3 mt-3" onSubmit={handleLogin}>
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input
            type="email"
            name="email"
            id="email"
            value={loginData.email}
            onChange={(e) => handleInput(e, setLogin)}
            placeholder="email"
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input
            type="password"
            name="password"
            id="pwd"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => handleInput(e, setLogin)}
          />
        </div>


        {status === "loading" ? (
          <LineWave
            color={loaderColor}
            height={loaderSize}
            width={loaderSize}
          />
        ) : (
          <button className="btn mt-3">Login</button>
        )}
      </form>
      <div className="text-center fs-6">
        <a href="/password_reset">Forgot password?</a> or <a href="/register">Sign up</a>
      </div>
    </div>
  );
};

export default Login;
