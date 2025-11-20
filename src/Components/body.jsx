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

  const handlePageRefresh = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/profile/view",

        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data));
    } catch (err) {
      if ((err.status = 401)) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    if (!user) handlePageRefresh();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
