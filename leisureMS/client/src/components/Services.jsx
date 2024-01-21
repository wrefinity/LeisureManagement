import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getReservation, selectAllReservation } from "../slicer/Reservations";


const Services = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getReservation())
  }, [dispatch]);
  const datas = useSelector(selectAllReservation);
  console.log(datas)

  const dataDisplay = datas?.map((cat) => {
    return (
      <div className="col-md-3">
        <div className="card product-card">
          <div className="image-container">
            <div className="first">
              <div className="d-flex justify-content-between align-items-center">
                <span className="discount">-25%</span>
                <span className="wishlist"><i className="fa fa-heart-o"></i></span>
              </div>
            </div>
            <img src={cat.img[0]} alt="ppssp" className="img-fluid rounded thumbnail-image" />
          </div>
          <div className="product-detail-container p-2">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="dress-name">{cat.name}</h5>
              <div className="d-flex flex-column mb-2">
                <span className="new-price">$ {cat.price}</span>

              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center pt-1">
              <div>
                <i className="fa fa-star-o rating-star"></i>
                <span className="rating-number">{cat?.country}</span>
              </div>

              <a href={`/booking/${cat?._id}`}>

              <span className="buy"> book</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    )
  })
  return (
    <div className="container mt-5">
      <div className="row">
        {dataDisplay}
        {/* Repeat the above structure for the remaining columns */}
      </div>
    </div>
  );
};

export default Services;
