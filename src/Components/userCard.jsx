import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeFeed } from "../Store/feedSlice";
import { BASE_URL } from "./constant";

const UserCard = ({ user }) => {
  const { firstName, lastName, skills, photoUrl, _id } = user;
  const [notify, setNotify] = useState(false);
  const dispatch = useDispatch();

  const handleUserRes = async (r) => {
    const url = BASE_URL + "/request/send/" + r + "/" + _id;
    try {
      const res = await axios.post(url, {}, { withCredentials: true });
      if ((res.status = "200")) {
        dispatch(removeFeed(_id));
      } else {
        setNotify(true);
        setTimeout(() => {
          setNotify(false);
        }, 1000);
      }
    } catch (err) {
      console.log(
        "ERROR occoured while ingnor/interest API call : " + " " + err.message
      );
      setNotify(true);
      setTimeout(() => {
        setNotify(false);
      }, 1000);
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-sm border border-black ">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>

        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => handleUserRes("ignored")}>
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleUserRes("interested")}>
            Interested
          </button>
        </div>
      </div>
      {notify && (
        <div className="toast toast-top toast-center">
          <div className="alert ">
            <span>there is some internal error</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
