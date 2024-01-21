import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LineWave } from "react-loader-spinner";

import {
  handleInput,
  loaderSize,
  loaderColor,
  validateEmpty,
} from "../utills/InputHelpers";
import { reseter, resetLink } from "../slicer/Auth";

const ResetPassword = () => {

  const { user, status, message } = useSelector((state) => state.auth);
  const [formData, setResetEmail] = useState({
    email: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const referal = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reset = () => {
    setResetEmail({
      email: "",
    });
  };

  useEffect(() => {
    referal.current();
  }, [formErrors, status, message, navigate, dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    setFormErrors(validateEmpty(formData));
    setIsSubmit(true);
  };

  const dispatchResetPassword = () => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(reseter());
      dispatch(resetLink(formData));
      setIsSubmit(false);
    }

    if (status === "succeeded" || user) {
      toast.success(message, { autoClose: 2000 });
      dispatch(reseter());
      reset();
    }
    if (status === "failed") {
      dispatch(reseter());
      toast.error(message, { autoClose: 4000 });
      setIsSubmit(false);
    }
  };
  referal.current = dispatchResetPassword;


  return (
    <div className="wrapper">
  
      <div className="text-center mt-4 name"> Reset Password </div>
      <form className="p-3 mt-3" onSubmit={handleLogin}>
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={formData.email}
            onChange={(e) => handleInput(e, setResetEmail)}
          />
        </div>

        {status === "laoding" ? (
          <LineWave
            color={loaderColor}
            height={loaderSize}
            width={loaderSize}
          />
        ) : (
          <button className="btn mt-3">Reset-Password</button>
        )}
      </form>
      <div className="text-center fs-6">
        <a href="/register">Register?</a> or <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default ResetPassword;
