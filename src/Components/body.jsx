import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Store/userSlice";
import { useEffect } from "react";
import { BASE_URL } from "./constant";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  console.log("Body part loaded.");
  const handlePageRefresh = async () => {
    console.log("page refresh loaded");
    try {
      const res = await axios.get(
        BASE_URL + "/profile/view",

        {
          withCredentials: true,
        }
      );
      console.log("after page load api call is " + BASE_URL + "/profile/view");
      dispatch(addUser(res.data));
    } catch (err) {
      if ((err.status = 401)) {
        console.log("/profile/view api got failed due to authorization reason");
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    console.log("we are in useeffect hook and user is " + user);
    if (!user) handlePageRefresh();
  }, []);
  //if (user === null) handlePageRefresh();
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
