import Avatar from "../avatar/Avatar";
import { SlLogout } from "react-icons/sl";
import "./navbar.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";
import { axiosClient } from "../../utils/axiosClient";

function Navbar() {
  // DEFINING CLICKS
  const navigate = useNavigate();

  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  async function handleLogout() {
    try {
      await axiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
    } catch (e) {}
  }

  return (
    <div className='Navbar'>
      <div className='container'>
        <h2 className='banner hover-link' onClick={() => navigate("/")}>
          Social Media
        </h2>
        <div className='right-side'>
          <div
            className='profile hover-link'
            onClick={() => navigate(`/profile/${myProfile?._id}`)}
          >
            <Avatar src={myProfile?.avatar?.url} />
          </div>
          <div className='logout hover-link' onClick={handleLogout}>
            <SlLogout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
