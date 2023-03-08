import React, { useEffect, useState } from "react";
import dummy from "../../assets/user.png";
import "./UpdateProfile.scss";
import { useSelector } from "react-redux";
import { updateProfile } from "../../redux/slices/appConfigSlice";
import { useDispatch } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userImg, setUserImg] = useState("");

  useEffect(() => {
    setName(myProfile?.name || "");
    setBio(myProfile?.bio || "");
    setUserImg(myProfile?.avatar?.url || "");
  }, [myProfile]);

  function handleImage(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setUserImg(fileReader.result);
      }
    };
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      updateProfile({
        name,
        bio,
        userImg,
      })
    );
  }

  async function handleDelete() {
    try {
      await axiosClient.delete("/user/");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
    } catch (e) {}
  }

  return (
    <div className='UpdateProfile'>
      <div className='container'>
        <div className='left-part'>
          <div className='input-user-img'>
            <label htmlFor='inputImg' className='labelImg'>
              <img src={userImg ? userImg : dummy} alt={name} />
            </label>
            <input
              className='inputImg'
              id='inputImg'
              type='file'
              accept='image/*'
              onChange={handleImage}
            />
          </div>
        </div>
        <div className='right-part'>
          <form onSubmit={handleSubmit}>
            <input
              value={name}
              type='text'
              placeholder='Your Name'
              onChange={(e) => setName(e.target.value)}
            />
            <input
              value={bio}
              type='text'
              placeholder='Your Bio'
              onChange={(e) => setBio(e.target.value)}
            />

            <input
              type='submit'
              className='btn-primary'
              onClick={handleSubmit}
            />
          </form>

          <button className='del-account btn-primary' onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
