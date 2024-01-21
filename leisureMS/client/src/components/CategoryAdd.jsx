import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createCat, reseter } from "../slicer/Category";
import { LineWave } from "react-loader-spinner";
import {
    handleInput,
    Notifier,
    validateEmpty,
    loaderSize,
    loaderColor,
} from "../utills/InputHelpers";


const CategoryAdd = () => {
    const [formData, setFormData] = useState({
        desc: "",
        name: "",
    });
    const { status, message } = useSelector((state) => state.categories);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const referal = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        referal.current();
    }, [formErrors, status, message, dispatch]);

    const reset = () => {
        setFormData({
            desc: "",
            name: "",
        });
    };

    const dispatchFormData = () => {
        if (Object.keys(formErrors).length === 0 && isSubmit && status === "idle") {
            dispatch(createCat(formData));
            dispatch(reseter());
            setIsSubmit(false);
        }
        if (status === "succeeded") {
            reset();
            dispatch(reseter());
            Notifier(message, 'success');
            setIsSubmit(false);
        }
        if (status === "failed") {
            dispatch(reseter());
            Notifier(message, 'error');
            setIsSubmit(false);
        }
    };
    referal.current = dispatchFormData;

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormErrors(validateEmpty(formData));
        setIsSubmit(true);
    };
    return (
        <div className="wrapper">
            <div className="text-center mt-4 name"> Add Reservation Category </div>
            <form className="p-3 mt-3" onSubmit={handleSubmit}>
                <div className="form-field d-flex align-items-center">
                    <input
                        type="text"
                        name="name"
                        id="namex"
                        placeholder="enter leisure name"
                        value={formData.name}
                        onChange={(e) => handleInput(e, setFormData)}
                    />
                </div>
                <div className="form-field d-flex align-items-center">
                    <textarea
                        name="desc"
                        id=""
                        placeholder="brief leisure descriptions"
                        cols="0"
                        rows="5"
                        required
                        value={formData.desc}
                        onChange={(e) => handleInput(e, setFormData)}
                    ></textarea>
                </div>
                {status === "loading" ? (
                    <div className="d-flex justify-content-center">
                        <LineWave
                            color={loaderColor}
                            height={loaderSize}
                            width={loaderSize}
                        />
                    </div>
                ) : (
                    <button className="btn mt-3">Upload</button>
                )}
            </form>
        </div>
    );
};

export default CategoryAdd;
