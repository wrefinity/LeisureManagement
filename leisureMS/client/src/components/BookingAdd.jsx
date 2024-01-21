import React, { useRef, useEffect, useState } from "react";
// import upload from "../utills/cloudinaryUpload"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { handleInput, validateEmpty, Notifier } from "../utills/InputHelpers";
import { createBooking, reseter } from "../slicer/Booking";

const BookingAdd = () => {
  const { status, message } = useSelector((state) => state?.bookings);
  const { id } = useParams();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState({
    desc: "",
    maxPeople: "",
  });
  const referal = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    referal.current();
  }, [formErrors, status, message, navigate, dispatch]);

  const handleProduct = (e) => {
    setFormErrors({})
    e.preventDefault();
    setFormErrors(validateEmpty(formData));
    setIsSubmit(true);
  };

  const reset = () => {
    setFormData({
      desc: "",
      maxPeople: ""
    });
  };

  const dispatchSignup = () => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(createBooking({...formData, reserveId: id }));
      setIsSubmit(false);
    }

    if (status === "succeeded") {
      Notifier("booking requested successfully", 'success')
      reset();
      dispatch(reseter());
      setIsSubmit(false);
      setTimeout(()=>{}, 1500);
      navigate("/booking")
    }
    if (status === "failed") {
      Notifier(message, 'error')
      dispatch(reseter());
    }
  };
  referal.current = dispatchSignup;

  return (
    <div className="wrapper">

      <div className="text-center mt-4 name"> Add Booking Utils </div>
      <form className="p-3 mt-3">
        <div className="form-field d-flex align-items-center">
          <input
            type="text"
            name="maxPeople"
            id="namex"
            placeholder="enter maximun people for the reservations"
            value={formData.maxPeople}
            onChange={(e) => handleInput(e, setFormData)}
          />
        </div>
   
        <div className="form-field d-flex align-items-center">
          <textarea
            name="desc"
            id=""
            placeholder="brief reason for reservation"
            cols="0"
            rows="5"
            required
            value={formData.desc}
            onChange={(e) => handleInput(e, setFormData)}
          ></textarea>
        </div>

        <button className="btn mt-3" onClick={(e)=>handleProduct(e)}>Upload</button>
      </form>
    </div>
  );
};

export default BookingAdd;
