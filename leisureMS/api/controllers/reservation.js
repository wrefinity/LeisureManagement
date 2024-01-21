import Reservation from "../models/Reservation.js";

export const createReservation = async (req, res, next) => {
  // const userId = req.user.id
  const reserve = new Reservation(req.body);
  console.log(req.body)
  try {
    const saved = await reserve.save();
    res.status(200).json(saved);
  } catch (err) {
    console.log(err)
    next(err);
  }
};
export const updateReservation = async (req, res, next) => {
  try {
    const updated = await Reservation.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};
export const deleteReservation = async (req, res, next) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json("Booking has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getReserve = async (req, res, next) => {
  try {
    const reserve = await Reservation.findById(req.params.id);
    res.status(200).json(reserve);
  } catch (err) {
    next(err);
  }
};
export const getReservations = async (req, res, next) => {
  try {
    const reserve = await Reservation.find({});
    res.status(200).json(reserve);
  } catch (err) {
    next(err);
  }
};
