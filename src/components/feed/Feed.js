import React, { useEffect } from "react";
import "./Feed.scss"
import  Post  from "../post/Post";
import Follower from "../follower/Follower";
import {useSelector, useDispatch } from 'react-redux'
import { getFeedData } from "../../redux/slices/feedSlice";

function Feed() {
  const dispatch = useDispatch();
  const feedData = useSelector(state=>state.feedDataReducer.feedData);
  useEffect(()=>{
    dispatch(getFeedData());
  },[])

  return <div className="Feed">
    <div className="container">
      <div className="left-part">
        {feedData?.posts?.map(post=> <Post key={post._id} post={post} />)}
      </div>
      <div className="right-part">
        <div className="following">
          <h3 className="title">You are following </h3>
          {feedData?.followings?.map(user => <Follower user={user} key={user._id}/>)}
        </div>

        <div className="suggesstion">
          <h3 className="title">Suggestion For You </h3>
          {feedData?.suggestions?.map(user => <Follower user={user} key={user._id}/>)}
        </div>
      </div>
    </div>
  </div>;
}

export default Feed;
