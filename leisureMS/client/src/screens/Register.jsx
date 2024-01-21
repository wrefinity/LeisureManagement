import { useRef, useEffect, useState } from "react";
import upload from "../utills/cloudinaryUpload"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleInput, validate, Notifier } from "../utills/InputHelpers";
import { register, reseter } from "../slicer/Auth";

const Register = () => {

  const { status, message } = useSelector((state) => state?.auth);
  const [signupData, setSignup] = useState({
    email: "",
    username: "",
    password: "",
    city: "",
    phone: "",
    country: "",
    img: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [singleFile, setSingleFile] = useState(undefined);
  const [uploading, setUploading] = useState(false);
  const referal = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reset = () => {
    setSignup({
      email: "",
      username: "",
      password: "",
      city: "",
      phone: "",
      country: "",
      img: "",
    });
  };

  useEffect(() => {
    referal.current();
  }, [formErrors, status, message, navigate, dispatch]);

  const handleSignup = (e) => {
    setFormErrors({})
    e.preventDefault();
    setFormErrors(validate(signupData));
    setIsSubmit(true);
  };


  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const cover = await upload(singleFile);
      setSignup((prev) => ({
        ...prev,
        "img": cover,
      }));
      setUploading(false);
      Notifier("Image Uploaded", "success");
    } catch (err) {
      console.log(err);
      Notifier(err, "error");
    }
  };

  const dispatchSignup = () => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(register(signupData));
      setIsSubmit(false);
    }

    if (status === "succeeded") {
      Notifier(message, "success")
      reset();
      dispatch(reseter());
      setIsSubmit(false);
      // navigate("/login");
    }
    if (status === "failed") {
      Notifier(message, "error")
      dispatch(reseter());
    }
  };
  referal.current = dispatchSignup;
  return (
    <div className="wrapper">
      <div className="text-center mt-4 name">please register</div>
      <form className="p-3 mt-3" >
        <p className="text-danger">{formErrors?.username}</p>
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            value={signupData.username}
            onChange={(e) => handleInput(e, setSignup)}
          />
        </div>
        <p className="text-danger">{formErrors?.email}</p>
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={signupData.email}
            onChange={(e) => handleInput(e, setSignup)}
          />
        </div>
        <p className="text-danger">{formErrors?.password}</p>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input
            type="password"
            name="password"
            id="pwd"
            placeholder="Password"
            value={signupData.password}
            onChange={(e) => handleInput(e, setSignup)}
          />
        </div>
        <p className="text-danger">{formErrors?.city}</p>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input
            type="text"
            name="city"
            id="cty"
            placeholder="enter city"
            value={signupData.city}
            onChange={(e) => handleInput(e, setSignup)}
          />
        </div>
        <p className="text-danger">{formErrors?.country}</p>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input
            type="text"
            name="country"
            id="country"
            placeholder="enter country"
            value={signupData.country}
            onChange={(e) => handleInput(e, setSignup)}
          />
        </div>
        <p className="text-danger">{formErrors?.phone}</p>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="enter phone"
            value={signupData.phone}
            onChange={(e) => handleInput(e, setSignup)}
          />
        </div>
        <p className="text-danger">{formErrors?.img}</p>
        <div className="form-field d-flex align-items-center">
          <input
            type="file"
            required
            name="img"
            id="images"
            onChange={(e) => setSingleFile(e.target.files[0])}
          />

          {/* <button className='btn' onClick={(e)=>handleUpload(e)}>
            {uploading ? "uploading" : "Upload"}
          </button> */}

          {!signupData.img && (
            <button className='btn' onClick={(e) => handleUpload(e)}>
              {uploading ? "uploading" : "Upload"}
            </button>

          )}
        </div>
        {status === "loading" ? (
          ""
        ) : (
          <button className="btn mt-3" onClick={handleSignup}>Register</button>
        )}

      </form>
      <div className="text-center fs-6">
        <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default Register;
