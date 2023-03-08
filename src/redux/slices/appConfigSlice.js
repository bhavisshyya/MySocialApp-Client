import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
// import { useDispatch } from 'react-redux'
// gloabal info

export const getMyInfo = createAsyncThunk(
  "user/getMyInfo",
  async (thunkAPI) => {
    try {
      const response = await axiosClient.get("/user/getMyInfo");
      console.log("api cal", response.result);
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    } 
  }
);

export const updateProfile = createAsyncThunk(
  "user/UpdateMyProfile",
  async (body) => {
    try {

      const response = await axiosClient.put("/user/", body);
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    } 
  }
);

// const dispatch = useDispatch();
const appConfigSlice = createSlice({
  name: "appConfigSlice",
  initialState: {
    isLoading: false,
    myProfile: null,
    toastData: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showToast: (state, action) => {
      state.toastData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.myProfile = action.payload.user;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.myProfile = action.payload.user;
      });
  },
});

export default appConfigSlice.reducer;

export const { setLoading, showToast } = appConfigSlice.actions;
