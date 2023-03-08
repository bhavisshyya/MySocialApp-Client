import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMyInfo } from "../../redux/slices/appConfigSlice";
function Home() {
const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyInfo());
  }, []);
  return (
    <>
      <Navbar />
      <div className='outlet' style={{ marginTop: "42px" }}>
        <Outlet />
      </div>
    </>
  );
}

export default Home;
