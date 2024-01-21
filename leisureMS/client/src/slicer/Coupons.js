import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";

export const getToken = (ThunkAPI) => {
  const token =
    ThunkAPI.getState().auth.user?.token ??
    JSON.parse(localStorage.getItem("user"))?.token;
  return token;
}
export const thunkError = (error) => {
  const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message.toString() ||
    error.toString();
  return message
}

const initialState = {
  coupons: [],
  status: "idle",
  message: "",
};

export const createCoupons = createAsyncThunk(
  "coupons/create",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI);
      const res = await requestHandler.axioPostHeader(
        "coupons",
        credentials,
        token
      );
      return res?.data;
    } catch (error) {
      const message = thunkError(error);
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const getCoupons = createAsyncThunk(
  "coupons/get_all",
  async (_, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI);
      const res = await requestHandler.axioGetHeader("coupons", token);
      return res?.data;
    } catch (error) {
      const message = thunkError(error);
      return ThunkAPI.rejectWithValue(message);
    }
  }
);


export const deleteCoup = createAsyncThunk(
  "coupons/delete",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI)
      const res = await requestHandler.axioDeleteHeader(
        `coupons/${credentials._id}`,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

const CoupSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    //  coupons creations 
    builder.addCase(createCoupons.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(createCoupons.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.coupons.push(payload.data);
      state.message = payload?.message;
    });
    builder.addCase(createCoupons.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    });
    // get section 
    builder.addCase(getCoupons.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(getCoupons.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.status = "idle";
      state.coupons = payload;
    });
    builder.addCase(getCoupons.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
      state.status = "idle";
    });
    // delete section 
    builder.addCase(deleteCoup.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(deleteCoup.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      console.log(payload, "====")
      const { _id } = payload.data;
      state.coupons = state.coupons.filter((p) => p._id !== _id);
      state.message = payload.message
    });
    builder.addCase(deleteCoup.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload.message;
      state.status = "idle";
    });
  }
});

const { reducer, actions } = CoupSlice;
export const selectAllCoup = (state) => state?.coupons?.coupons;
export const getCoupStatus = (state) => state?.coupons?.status;
export const getCoupError = (state) => state?.coupons?.message;
export const getCoupById = (state, id) =>
  state.coupons.coupons.find((book) => book._id === id);

export const { reseter } = actions;
export default reducer;