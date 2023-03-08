import React from "react";
import "./Post.scss";
import Avatar from "../avatar/Avatar";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { likeAndUnlike } from "../../redux/slices/postSlice";
import { showToast } from "../../redux/slices/appConfigSlice";
import { TOAST_SUCCESS } from "../../App";
import no_img from '../../assets/no_img.jpeg'

function Post({ post }) {
  const dispatch = useDispatch();
  async function handleLike() {
    dispatch(showToast({
      type:TOAST_SUCCESS,
      message:"liked or unliked"
    }))
    dispatch(
      likeAndUnlike({
        postId: post._id,
      })
    );
  }

  const navigate = useNavigate();
  return (
    <div className='Post'>
     {/* { console.log(post)} */}
      <div
        className='heading'
        onClick={() => navigate(`/profile/${post.owner._id}`)}
      >
        <Avatar src={post?.owner?.avatar?.url} />
        <h4>{post.owner?.name}</h4>
      </div>
      <div className='content'>
        <img src={post?.image?.url || no_img} alt={"here"}/>
      </div>
      <div className='footer'>
        <div className='likes' onClick={handleLike}>
          {post.isLiked ? (
            <AiFillHeart style={{ color: " red" }} className='icon' />
          ) : (
            <AiOutlineHeart className='icon' />
          )}
          <h4>{post.likesCount} Likes</h4>
        </div>
        <p className='caption'>{post?.caption}</p>

        <h6 className='time-ago'>{post?.timeAgo}</h6>
      </div>
    </div>
  );
}

export default Post;
