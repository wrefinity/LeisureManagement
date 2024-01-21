import { Schema, model } from "mongoose";


const CoupSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  country: {
    type: String
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 1209600 },
  daysLeft: { type: Number, default: 14 },
});

// Middleware to update 'daysLeft' every day
CoupSchema.pre('save', function (next) {
  const currentDate = new Date();
  const expirationDate = this.expirationDate || this.createdAt.getTime() + 1209600 * 1000;
  const timeDifference = expirationDate - currentDate.getTime();
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  this.daysLeft = daysLeft;
  next();
});

// Ensure virtuals are included when converting to JSON
CoupSchema.set('toObject', { virtuals: true });
CoupSchema.set('toJSON', { virtuals: true });


const CoupounModel = model('Coupon', CoupSchema);

export default CoupounModel;

export const createCoup = (values) =>
  new CoupounModel(values).save().then(token => token.toObject());
export const getCoupByUserId = async (user) => await CoupounModel.find({ user });

export const getUserCoup = async (user, token) =>
  await CoupounModel.findOne({ user, token });

export const getCoups = async () => await CoupounModel.find({});

export const deleteUserCoupoun = async (id) =>
  await CoupounModel.findOneAndDelete({ _id: id });
