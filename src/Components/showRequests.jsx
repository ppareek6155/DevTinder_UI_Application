import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "./constant";

const ShowRequests = ({ req }) => {
  const [userRes, setUserRes] = useState(null);
  let userResponse = "";

  const reqHandle = (r) => {
    if (r) {
      userResponse = "accepted";
    } else {
      userResponse = "rejected";
    }
    const url = BASE_URL + "/request/review/" + userResponse + "/" + req._id;
    try {
      axios.post(url, {}, { withCredentials: true });
      setUserRes(r);
    } catch (err) {
      console.log(
        "ERROR while calling the request/review api : " + err.message
      );
    }
  };

  return (
    <>
      <div>
        <img className="size-10 rounded-box" src={req.fromUserId.photoUrl} />
      </div>
      <div>
        <div>{req.fromUserId.firstName + " " + req.fromUserId.lastName}</div>
        <div className="text-xs uppercase font-semibold opacity-60">
          Remaining Reason
        </div>
      </div>
      {userRes == null ? (
        <div>
          <button
            className="btn btn-soft btn-primary"
            onClick={() => reqHandle(true)}>
            Accept
          </button>
          <button
            className="btn btn-soft btn-primary"
            onClick={() => reqHandle(false)}>
            Reject
          </button>
        </div>
      ) : userRes ? (
        <>
          <button className="btn btn-soft ">Accepted</button>
        </>
      ) : (
        <>
          <button className="btn btn-soft ">Rejected</button>
        </>
      )}
    </>
  );
};

export default ShowRequests;
