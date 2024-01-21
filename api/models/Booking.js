import mongoose from "mongoose";
const BookingSchema = new mongoose.Schema({
  maxPeople: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  reserveId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    default: 'Pending'
  },
  
}, {timestamps:true});


export default mongoose.model("Booking", BookingSchema)