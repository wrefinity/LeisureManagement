import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
import { thunkError, getToken } from "./Coupons";

const initialState = {
  bookings: [],
  status: "idle",
  message: "",
};

export const createBooking = createAsyncThunk(
  "bookings/create",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI);
      const res = await requestHandler.axioPostHeader(
        "bookings",
        credentials,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

export const getBooking = createAsyncThunk(
  "bookings/get_all",
  async (_, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI);
      const res = await requestHandler.axioGetHeader("bookings", token);
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);


export const deleteBooking = createAsyncThunk(
  "bookings/delete",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI);
      const res = await requestHandler.axioDeleteHeader(
        `bookings/${credentials._id}`,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);
export const updateBookingStatus = createAsyncThunk(
  "bookings/updateStatus",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI);
      const res = await requestHandler.axioPatchHeader(
        `bookings/status/${credentials._id}`,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

const BookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) =>{
    //  bookings creations 
    builder.addCase(createBooking.pending, (state, { payload })=>{
      state.status = "loading"; 
    });
    builder.addCase(createBooking.fulfilled, (state, { payload })=>{
      state.status = "succeeded";
      state.bookings.push(payload);
      state.status = "succeeded";
    });
    builder.addCase(createBooking.rejected, (state, { payload })=>{
      state.status = "failed";
      state.message = payload;
    });
    // get section 
    builder.addCase(getBooking.pending, (state, { payload })=>{
      state.status = "loading"; 
    });
    builder.addCase(getBooking.fulfilled, (state, { payload })=>{
      state.status = "succeeded";
      state.status = "idle";
      state.bookings = payload;
    });
    builder.addCase(getBooking.rejected, (state, { payload })=>{
      state.status = "failed";
      state.message = payload;
      state.status = "idle";
    });
    // delete section 
    builder.addCase(deleteBooking.pending, (state, { payload })=>{
      state.status = "loading"; 
    });
    builder.addCase(deleteBooking.fulfilled, (state, { payload })=>{
      state.status = "succeeded";
      const { _id } = payload.data;
      state.bookings = state.bookings.filter((p) => p._id !== _id);
    });
    builder.addCase(deleteBooking.rejected, (state, { payload })=>{
      state.status = "failed";
      state.message = payload;
      state.status = "idle";
    });
    // update booking status 
    builder.addCase(updateBookingStatus.pending, (state, { payload })=>{
      state.status = "loading"; 
    });
    builder.addCase(updateBookingStatus.fulfilled, (state, { payload })=>{
      state.status = "succeeded";
      const { _id } = payload;
      state.bookings = state.bookings.map((per) =>
        per._id === _id ? payload : per
      );
    });
    builder.addCase(updateBookingStatus.rejected, (state, { payload })=>{
      state.status = "failed";
      state.message = payload;
      state.status = "idle";
    });
  }
});

const { reducer, actions } = BookingSlice;
export const selectAllBooking = (state) => state?.bookings?.bookings;
export const getBokingStatus = (state) => state?.bookings?.status;
export const getBookingError = (state) => state?.bookings?.message;
export const getBookingById = (state, id) =>
  state.bookings.bookings.find((book) => book._id === id);

export const { reseter } = actions;
export default reducer;