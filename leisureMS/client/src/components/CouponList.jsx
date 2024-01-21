import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { deleteCoup, getCoupons, selectAllCoup,  reseter as resetCoups } from '../slicer/Coupons';
import { getUser } from "../slicer/Auth"
import {Notifier} from "../utills/InputHelpers"
import moment from 'moment';

const CouponList = () => {
    const { status, message } = useSelector((state) => state?.coupons);
    const referal = useRef();
    const tbStyle = {
        overflowX: 'auto',
    };
   
    const { user } = useSelector(getUser);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getCoupons())
    }, [dispatch]);
    const datas = useSelector(selectAllCoup);


    useEffect(()=>{
        if (status === "succeeded") {
            Notifier(message, "success")
            dispatch(resetCoups());
        }
        if (status === "failed") {
            // toast.error(message, { autoClose: 4000 });
            Notifier(message, "error")
            dispatch(resetCoups());
        }
    }, [status, message])

    const handleCoupons = (_id) => {
        dispatch(deleteCoup({ _id }));
    }

    referal.current = handleCoupons;
    return (
        <div style={tbStyle} className='container-fluid mt-5'>

            <table className='table striped bordered hover table-responsive'>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>email</th>
                        <th>country</th>
                        <th>DayLeft</th>
                        <th>Create Date</th>
                        <th>Coupon Code</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {datas?.map(dt => (
                        <tr key={dt._id}>
                            <td>{dt?.user?.username}</td>
                            <td>
                                {dt?.user?.email} <br />
                            </td>
                            <td>
                                {dt?.country} <br />

                            </td>
                            <td>
                            {dt?.daysLeft} 
                            </td>

                            <td>
                            {moment(dt?.createdAt).format('MMMM Do YYYY, h:mm:ss a')} <br />
                            </td>
                            <td>
                                {dt?.token} <br />
                            </td>
                        
                            <td>
                                {user?.isAdmin ? (
                                    <>
                                    <div className='my-3'>
                                         <button className="btn btn-outline-success" onClick={() => handleCoupons(dt._id)}> delete coupon </button>
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

export default CouponList;
