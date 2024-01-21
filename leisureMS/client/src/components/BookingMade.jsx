import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getBooking, selectAllBooking, updateBookingStatus, reseter } from "../slicer/Booking";
import { getUser } from "../slicer/Auth"
import {Notifier} from "../utills/InputHelpers"

const BookingMade = () => {
    const { status, message } = useSelector((state) => state?.bookings);
    const referal = useRef();
    const tbStyle = {
        overflowX: 'auto',
    };
   
    const { user } = useSelector(getUser);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getBooking())
    }, [dispatch]);
    const datas = useSelector(selectAllBooking);
    const handleBook = (id) => {
        dispatch(updateBookingStatus({ _id: id }));

        if (status === "succeeded") {
            Notifier("item updated", "success")
            dispatch(reseter());
        }
        if (status === "failed") {
            // toast.error(message, { autoClose: 4000 });
            Notifier(message, "error")
            dispatch(reseter());
        }
    }

    referal.current = handleBook;
    return (
        <div style={tbStyle} className='container-fluid mt-5'>

            <table className='table striped bordered hover table-responsive'>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Phone</th>
                        <th>Reservation Type</th>
                        <th>Reservation Place</th>
                        <th>Reservation Address</th>
                        <th>Reservation Cost</th>
                        <th>User's Reservation Description</th>
                        <th>Reservation MaxPeople Count</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {datas.map(dt => (
                        <tr key={dt._id}>
                            <td>{dt.userId?.username}</td>
                            <td>
                                {dt.userId?.phone} <br />
                                {dt.userId?.email} <br />
                            </td>
                            <td>
                                {dt.reserveId?.name} <br />

                            </td>
                            <td>
                                {dt?.reserveId?.img && dt.reserveId.img[0] && (
                                    <img src={dt.reserveId.img[0]} alt={dt._id} width={100} height={70} />
                                )}
                            </td>

                            <td>
                                City: {dt.reserveId?.city} <br />
                                Country: {dt.reserveId?.country} <br />
                                Address: {dt.reserveId?.address} <br />
                            </td>
                            <td>
                                {dt.reserveId?.price} <br />
                            </td>
                            <td>
                                {dt.desc} <br />
                            </td>
                            <td>
                                {dt.maxPeople} <br />
                            </td>
                            <td>
                                {user?.isAdmin ? (
                                    <>
                                    <div className='my-3'>
                                        {dt?.status === "approved" ? dt?.status : <button className="btn btn-outline-success" onClick={() => handleBook(dt._id)}> reserve</button> }
                                    </div>
                                    
                                    </>
                                ) : dt?.status}

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingMade;
