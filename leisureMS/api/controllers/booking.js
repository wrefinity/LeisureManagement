import Booking from "../models/Booking.js";
import Reservation from "../models/Reservation.js";
import User from "../models/User.js";

export const createBooking = async (req, res, next) => {
  const userId = req.user.id;
  const booking = new Booking({ ...req.body, userId });
  try {
    const saved = await booking.save();
    res.status(200).json(saved);
  } catch (err) {
    next(err);
  }
};
export const updateBooking = async (req, res, next) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};
export const updateBookingStatus = async (req, res, next) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: {status:"approved"} },
      { new: true }
    ).populate({
      path: 'reserveId',
      model: Reservation,
      select: 'img price name city country address catId',
    })
    .populate({
      path: 'userId',
      model: User,
      select: 'username email phone',
    });;
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};
export const deleteBooking = async (req, res, next) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json("Booking has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};
export const getBookings = async (req, res, next) => {
  try {

    // check that current user is adm
    const isAdmin = req.user?.isAdmin;
    
    let query = {};
    
    // If the user is not an admin, filter bookings by userId
    if (!isAdmin) {
      query.userId = req.user.id;
    }
    
    const bookings = await Booking.find(query)
    .populate({
      path: 'reserveId',
      model: Reservation,
      select: 'img price name city country address catId',
    })
    .populate({
      path: 'userId',
      model: User,
      select: 'username email phone',
    });
    
    res.status(200).json(bookings);
  } catch (err) {
    console.log(err)
    next(err);
  }
};
