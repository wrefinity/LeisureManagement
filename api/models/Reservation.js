import mongoose from "mongoose";
const ReservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  img: {
    type: [String],
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  catId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
}, {timestamps:true});


export default mongoose.model("Reservation", ReservationSchema)