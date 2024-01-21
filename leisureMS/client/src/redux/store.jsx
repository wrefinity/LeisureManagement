import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../slicer/Auth"
import BookingReducer from "../slicer/Booking"
import ReservationReducer from "../slicer/Reservations"
import categoryReducer from "../slicer/Category"
import userReducer from "../slicer/UserSlice"
import coupsReducer from "../slicer/Coupons"

export const store = configureStore({
  reducer: {
    auth:authReducer,
    categories: categoryReducer,
    reservations:ReservationReducer,
    bookings: BookingReducer,
    users: userReducer,
    coupons:coupsReducer,
  },
})