import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
import { thunkError, getToken } from "./Coupons";


const initialState = {
  categories: [],
  status: "idle",
  message: "",
};

export const createCat = createAsyncThunk(
  "categories/create",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI);
      const res = await requestHandler.axioPostHeader(
        "categories",
        credentials,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

export const getCategory = createAsyncThunk(
  "categories/get_all",
  async (_, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI);
      const res = await requestHandler.axioGetHeader("categories", token);
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);


export const deleteCat = createAsyncThunk(
  "categories/delete",
  async (credentials, ThunkAPI) => {
    try {
      const token = getToken(ThunkAPI);
      const res = await requestHandler.axioDeleteHeader(
        `categories/${credentials._id}`,
        token
      );
      return res?.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(thunkError(error));
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    //  product creations 
    builder.addCase(createCat.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(createCat.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.categories.push(payload?.data);
    });
    builder.addCase(createCat.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    });
    // get section 
    builder.addCase(getCategory.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(getCategory.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.status = "idle";
      state.categories = payload;
    });
    builder.addCase(getCategory.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
      state.status = "idle";
    });
    // delete section 
    builder.addCase(deleteCat.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(deleteCat.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload.data;
      state.categories = state.categories.filter((c) => c._id !== _id);
    });
    builder.addCase(deleteCat.rejected, (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
      state.status = "idle";
    });
  }
});

const { reducer, actions } = categorySlice;
export const selectAllCategories = (state) => state?.categories?.categories;
export const getCategoriesStatus = (state) => state?.categories?.status;
export const getCategoriesError = (state) => state?.categories?.message;
export const getCategoryById = (state, id) =>
  state.categories.categories.find((ct) => ct._id === id);

export const { reseter } = actions;
export default reducer;