import React from 'react';
import { useSelector } from 'react-redux';

// custom function 
import { getUser } from "../slicer/Auth"
import { selectAllCoup } from '../slicer/Coupons';

const Profile = () => {

    const datas = useSelector(selectAllCoup)[0];
    const { user } = useSelector(getUser);
    
    const coupsTable = () =>{
        
        if(!user.isAdmin && datas){
            return (
                <div>
                    <h3>Coupon</h3>
                    <p> You have a pending for {datas?.country}</p>
                    <p> It is due in {datas?.daysLeft} days </p>
                </div>
            )
        }
    }

    return (
        <div className='container d-flex flex-row mt-5'>

            <div className='col-md-6 p-5 border '>

                <h4> {user?.details?.username} Profile</h4>
                <img src={user?.details?.img} width={450} height={300} alt={user.details._id} />

                <h5> {user?.details?.username}</h5>
                <p> {user?.details?.email}</p>
                <p> {user?.details?.phone}</p>
                <p> {user?.details?.city},  {user?.details?.country}</p>

                <div>
                    {coupsTable()}
                </div>
            </div>

        </div>
    )
}

export default Profile
