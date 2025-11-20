import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserFeed } from "../Store/feedSlice";
import UserCard from "./userCard";
import { BASE_URL } from "./constant";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.feed);
  const navigate = useNavigate();
  console.log("Geeting blank data", users);
  const HandleFeed = async () => {
    const userFeed = await axios.get(BASE_URL + "/user/feed", {
      withCredentials: true,
    });
    dispatch(addUserFeed(userFeed.data));
    console.log(userFeed);
    if (!userFeed) {
      navigate("/");
    }
  };

  useEffect(() => {
    HandleFeed();
  }, []);

  // if (!users) {
  //   navigate("/");
  // }
  return (
    <div className="justify-center">
      <UserCard user={users[0]} />
    </div>
  );
};

export default Feed;
