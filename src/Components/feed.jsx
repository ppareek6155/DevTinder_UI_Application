import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserFeed } from "../Store/feedSlice";
import UserCard from "./userCard";

const Feed = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.feed);
  const HandleFeed = async () => {
    const userFeed = await axios.get("http://localhost:8888/user/feed", {
      withCredentials: true,
    });
    dispatch(addUserFeed(userFeed.data));
  };

  useEffect(() => {
    HandleFeed();
  }, []);

  if (!users) return;
  return (
    <div className="justify-center">
      <UserCard user={users[0]} />
    </div>
  );
};

export default Feed;
