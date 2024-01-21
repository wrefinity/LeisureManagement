import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getUsers, fetchUsers } from "../slicer/UserSlice";
import { createCoupons,  reseter as resetCoups } from '../slicer/Coupons';
import { getUser } from "../slicer/Auth"
import {Notifier} from "../utills/InputHelpers"

const UserList = () => {
    const { status, message } = useSelector((state) => state?.coupons);
    const referal = useRef();
    const tbStyle = {
        overflowX: 'auto',
    };
   
    const { user } = useSelector(getUser);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch]);
    const datas = useSelector(fetchUsers);

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
        dispatch(createCoupons({ _id }));
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
                        <th>Image</th>
                        <th>City</th>
                        <th>Phone</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {datas?.map(dt => (
                        <tr key={dt._id}>
                            <td>{dt?.username}</td>
                            <td>
                                {dt?.email} <br />
                            </td>
                            <td>
                                {dt?.country} <br />

                            </td>
                            <td>
                                {dt?.img  && (
                                    <img src={dt?.img} alt={dt._id} width={100} height={100} />
                                )}
                            </td>

                            <td>
                                {dt?.city} <br />
                            </td>
                            <td>
                                {dt?.phone} <br />
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
                                         <button className="btn btn-outline-success" onClick={() => handleCoupons(dt._id)}> create coupon </button>
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

export default UserList;
