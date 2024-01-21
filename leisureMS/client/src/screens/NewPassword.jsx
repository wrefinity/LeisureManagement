import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { LineWave } from "react-loader-spinner";

import {
  handleInput,
  loaderSize,
  loaderColor,
  validateEmpty,
} from "../utills/InputHelpers";
import { reseter, resetPassword } from "../slicer/Auth";

const NewPassword = () => {

  const { user, status, message } = useSelector((state) => state.auth);
  const [formData, setResetPasswordInfo] = useState({
    password: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const referal = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, token } = useParams();

  const reset = () => {
    setResetPasswordInfo({
      password: "",
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

  const dispatchNewPassword = () => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(resetPassword({ ...formData, id, token }));
      setIsSubmit(false);
    }

    if (status === "succeeded" || user) {
      toast.success(message, { autoClose: 2000 });
      dispatch(reseter());
      reset();
      navigate("/login");
    }
    if (status === "failed") {
      dispatch(reseter());
      toast.error(message, { autoClose: 4000 });
      setIsSubmit(false);
    }
  };
  referal.current = dispatchNewPassword;
  return (
    <div className="wrapper">
      <div className="text-center mt-4 name"> Reset Your Password </div>
      <form className="p-3 mt-3" onSubmit={handleLogin}>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input
            type="password"
            name="password"
            id="pwd"
            placeholder="enter your new password"
            value={formData.password}
            onChange={(e) => handleInput(e, setResetPasswordInfo)}
          />
        </div>

        {status === "laoding" ? (
          <LineWave
            color={loaderColor}
            height={loaderSize}
            width={loaderSize}
          />
        ) : (
          <button className="btn mt-3">Reset Now</button>
        )}
      </form>
    </div>
  );
};

export default NewPassword;
