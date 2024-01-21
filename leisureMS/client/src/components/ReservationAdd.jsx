import React, { useRef, useEffect, useState } from "react";
import upload from "../utills/cloudinaryUpload"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleInput, validateEmpty, Notifier } from "../utills/InputHelpers";
import { createReservation, reseter } from "../slicer/Reservations";
import { selectAllCategories } from "../slicer/Category";

const ReservationAdd = () => {
  const { status, message } = useSelector((state) => state?.reservations);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [singleFile, setSingleFile] = useState(undefined);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    desc: "",
    name: "",
    city: "",
    price: "",
    address: "",
    country: "",
    img: "",
    catId: ""
  });
  const referal = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  //get catgories
  const categories = useSelector(selectAllCategories);
  const categoriesOption = !categories
    ? ""
    : Array.from(categories)
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
      .map((category) => {
        return (
        
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        );
      });


  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const cover = await upload(singleFile);
      setFormData((prev) => ({
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
      name: "",
      city: "",
      price: "",
      address: "",
      country: "",
      img: "",
      catId: ""
    });
  };

  const dispatchSignup = () => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(createReservation(formData));
      setIsSubmit(false);
    }

    if (status === "succeeded") {
      Notifier("item created", "success")
      reset();
      dispatch(reseter());
      setIsSubmit(false);
    }
    if (status === "failed") {
      Notifier(message, "success")
      dispatch(reseter());
    }
  };
  referal.current = dispatchSignup;

  return (
    <div className="wrapper">

      <div className="text-center mt-4 name"> Create Reservation Utils </div>
      <form className="p-3 mt-3">
        <p className="text-danger">{formErrors?.name}</p>
        <div className="form-field d-flex align-items-center">
          <input
            type="text"
            name="name"
            id="namex"
            placeholder="enter reservation name"
            value={formData.name}
            onChange={(e) => handleInput(e, setFormData)}
          />
        </div>
        <p className="text-danger">{formErrors?.catId}</p>
        <div className="form-field d-flex align-items-center">
          <select
            name="catId"
            id="catId"
            onChange={(e) => handleInput(e, setFormData)}
          >
            <option>Select reservation Category</option>
            {categoriesOption}
            {/* Add more options as needed */}
          </select>
        </div>
        <p className="text-danger">{formErrors?.price}</p>
        <div className="form-field d-flex align-items-center">
          <input
            type="text"
            name="price"
            id="price"
            placeholder="enter reservation price"
            value={formData.price}
            onChange={(e) => handleInput(e, setFormData)}
          />
        </div>
        <p className="text-danger">{formErrors?.city}</p>
        <div className="form-field d-flex align-items-center">
          <input
            type="text"
            name="city"
            id="city"
            placeholder="enter reservation city"
            value={formData.city}
            onChange={(e) => handleInput(e, setFormData)}
          />
        </div>
        <p className="text-danger">{formErrors?.address}</p>
        <div className="form-field d-flex align-items-center">
          <input
            type="text"
            name="address"
            id="address"
            placeholder="enter reservation address"
            value={formData.address}
            onChange={(e) => handleInput(e, setFormData)}
          />
        </div>
        <p className="text-danger">{formErrors?.country}</p>
        <div className="form-field d-flex align-items-center">
          <input
            type="text"
            name="country"
            id="country"
            placeholder="enter reservation country"
            value={formData.country}
            onChange={(e) => handleInput(e, setFormData)}
          />
        </div>
        <p className="text-danger">{formErrors?.img}</p>
        <div className="form-field d-flex align-items-center">
          <input
            type="file"
            required
            name="img"
            id="imagesx"
            onChange={(e) => setSingleFile(e.target.files[0])}
          />
          {!formData.img && (
            <button className='btn' onClick={(e) => handleUpload(e)}>
              {uploading ? "uploading" : "Upload"}
            </button>

          )}
        </div>
        <p className="text-danger">{formErrors?.desc}</p>
        <div className="form-field d-flex align-items-center">
          <textarea
            name="desc"
            id=""
            placeholder="brief reservation descriptions descriptions"
            cols="0"
            rows="5"
            required
            value={formData.desc}
            onChange={(e) => handleInput(e, setFormData)}
          ></textarea>
        </div>

        <button className="btn mt-3" onClick={handleProduct}>Upload</button>
      </form>
    </div>
  );
};

export default ReservationAdd;
