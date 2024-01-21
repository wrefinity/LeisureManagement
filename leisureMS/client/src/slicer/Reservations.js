import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";


const initialState = {
  reservations: [],
  status: "idle",
  message: "",
};

export const createReservation = createAsyncThunk(
  "reservations/create",
  async (credentials, ThunkAPI) => {
    try {
      const token =
      ThunkAPI.getState().auth.user?.token ??
      JSON.parse(localStorage.getItem("user"))?.token;
      console.log(credentials)
      const res = await requestHandler.axioPostHeader(
        "reservations",
        credentials,
        token
      );
      return res?.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message.toString() ||
        error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const getReservation = createAsyncThunk(
  "reservations/get_all",
  async (_, ThunkAPI) => {
    try {
      const res = await requestHandler.axioGet("reservations");
      return res?.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message.toString() ||
        error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);


export const deleteReservation = createAsyncThunk(
  "reservations/delete",
  async (credentials, ThunkAPI) => {
    try {
      const token =
        ThunkAPI.getState().auth.user?.token ??
        JSON.parse(localStorage.getItem("user"))?.token;
      const res = await requestHandler.axioDeleteHeader(
        `reservations/${credentials._id}`,
        token
      );
      return res?.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message.toString() ||
        error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

const ReservationSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) =>{
    //  reservations creations 
    builder.addCase(createReservation.pending, (state, { payload })=>{
      state.status = "loading"; 
    });
    builder.addCase(createReservation.fulfilled, (state, { payload })=>{
      state.status = "succeeded";
      state.reservations.push(payload);
    });
    builder.addCase(createReservation.rejected, (state, { payload })=>{
      state.status = "failed";
      state.message = payload;
    });
    // get section 
    builder.addCase(getReservation.pending, (state, { payload })=>{
      state.status = "loading"; 
    });
    builder.addCase(getReservation.fulfilled, (state, { payload })=>{
      state.status = "succeeded";
      state.status = "idle";
      state.reservations = payload;
    });
    builder.addCase(getReservation.rejected, (state, { payload })=>{
      state.status = "failed";
      state.message = payload;
      state.status = "idle";
    });
    // delete section 
    builder.addCase(deleteReservation.pending, (state, { payload })=>{
      state.status = "loading"; 
    });
    builder.addCase(deleteReservation.fulfilled, (state, { payload })=>{
      state.status = "succeeded";
      const { _id } = payload.data;
      state.reservations = state.reservations.filter((p) => p._id !== _id);
    });
    builder.addCase(deleteReservation.rejected, (state, { payload })=>{
      state.status = "failed";
      state.message = payload;
      state.status = "idle";
    });
  }
});

const { reducer, actions } = ReservationSlice;
export const selectAllReservation = (state) => state?.reservations?.reservations;
export const getReservationStatus = (state) => state?.reservations?.status;
export const getReservationError = (state) => state?.reservations?.message;
export const getReservationById = (state, id) =>
  state.reservations.reservations.find((book) => book._id === id);

export const { reseter } = actions;
export default reducer;