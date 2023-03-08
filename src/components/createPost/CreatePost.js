import React, { useState } from "react";
import Avatar from "../avatar/Avatar";
import "../createPost/CreatePost.scss";
// import backImg from "../../assets/img.jpeg";
import { BsCardImage } from "react-icons/bs";
import { axiosClient } from "../../utils/axiosClient";
import {useDispatch, useSelector} from 'react-redux';
import { getUserProfile } from "../../redux/slices/postSlice";

function CreatePost() {
  const [postImg, setPostImg] = useState("");
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  // const myProfile = useSelector(state => state.appConfigReducer.myProfile)
    const handleImage = (e) => {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (fileReader.readyState === fileReader.DONE) {
          setPostImg(fileReader.result);
          console.log("img data", fileReader.result);
        }
      };
    }

  const myProfile = useSelector(state => state.appConfigReducer.myProfile)

  const handlePostSubmit =async()=>{
        try{
            const result = await axiosClient.post('/post', {
                caption, 
                postImg
        })
        console.log('post done', result);
        dispatch(getUserProfile({
          userId:myProfile?._id
        }));
    }catch(err){

    }finally{
        setCaption('');
        setPostImg(''); 
    }
  }
  return (
    <div className='CreatePost'>
      <div className='leftpart'>
        <Avatar src={myProfile?.avatar?.url}/>
      </div>
      <div className='rightpart'>
        <input
        value={caption}
          type='text'
          className='captionInput'
          placeholder="What's on your mind ?"
          onChange={(e)=>{
            setCaption(e.target.value)
          }}
        />
        {postImg && (
          <div className='img-container'>
            <img className='post-img' src={postImg} alt='' />
          </div>
        )}
        <div className='bottom-part'>
          <div className='input-post-img'>
            <label htmlFor='inputImg' className='labelImg'>
              <BsCardImage />
            </label>
            <input
              className='inputImg'
              id='inputImg'
              type='file'
              accept='image/*'
              onChange={handleImage}
            />
          </div>
          <button className='post-btn btn-primary' onClick={handlePostSubmit}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
