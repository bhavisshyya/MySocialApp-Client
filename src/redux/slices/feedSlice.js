import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { likeAndUnlike } from "./postSlice";
// import { useDispatch } from 'react-redux'
// gloabal info

export const getFeedData = createAsyncThunk(
  "user/getFeedData",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get("/user/getFeedData");
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const followAndUnfollowUser = createAsyncThunk('user/followAndUnfollow', async(body) =>{
    try {
       const response = await axiosClient.post("/user/follow", body);
       console.log(response);
       return response.result.user;
    } catch (e) {
      return Promise.reject(e);
      } 
    })

// const dispatch = useDispatch();
const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    feedData: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedData.fulfilled, (state, action) => {
      state.feedData = action.payload;
    })
    .addCase(likeAndUnlike.fulfilled, (state, action) =>{
      const post = action.payload;
      const index = state?.feedData?.posts?.findIndex(item => item._id === post._id)
      if(index!== undefined && index !== -1){
       state.feedData.posts[index] = post;
      }
    })
    .addCase(followAndUnfollowUser.fulfilled, (state, action) =>{
        const user = action.payload;
        const index = state?.feedData?.followings.findIndex(item => item._id === user._id);
        if(index !== undefined && index!== -1){
            state?.feedData?.followings.splice(index,1);
        }else{
            state?.feedData?.followings.push(user);
        }
    })
  },
});

export default feedSlice.reducer;
