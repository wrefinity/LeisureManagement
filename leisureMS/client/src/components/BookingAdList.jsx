import React, {useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getReservation, selectAllReservation } from "../slicer/Reservations";

const BookingAdList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getReservation())
  }, [dispatch]);
  const datas = useSelector(selectAllReservation);


  const dataDisplay = datas?.map((cat) => {

    return (
      <div className="d-flex justify-content-center row mb-2" key={cat?._id}>
        <div className="col-md-10">
          <div className="row p-2 bg-white border rounded">
            <div className="col-md-3 mt-1">
              <img
                className="img-fluid img-responsive rounded product-image"
                src={cat.img[0]}
                alt="Product"
              />
            </div>
            <div className="col-md-6 mt-1">
              <h5> {cat.name}</h5>
              <div className="mt-1 mb-1 spec-1">
                <span>{cat.city}</span>
                <span className="dot"></span>
                <span> {cat.country}</span>
               
              </div>
              <div className="mt-1 mb-1 spec-1">
                <span>Address:</span>
                <span className="dot"></span>
                <span> {cat?.address}</span>
              </div>
              <p className="text-justify text-truncate para mb-0">
                {cat.desc} <br />
              </p>
            </div>
            <div className="align-items-center align-content-center col-md-3 border-left mt-1">
              <div className="d-flex flex-row align-items-center">
                <h4 className="mr-1"> {cat?.price}</h4>
              </div>
             
                <a href="" className="btn btn-success" type="submit">edit</a>
              <div className="d-flex flex-column mt-4">
              </div>
            </div>
          </div>
          {/* Additional product entries go here */}
        </div>
      </div>
    )

  })

  return (
    <div className="container mt-5 mb-5 text-align-center">
      <h4 className=''> Reservations Created </h4>
      {dataDisplay}
    </div>
  );
}

export default BookingAdList;
