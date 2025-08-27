import axios from "axios";
import { useEffect, useState } from "react";
import ShowRequests from "./showRequests";

const Requests = () => {
  const [userRequest, setUserRequest] = useState(null);

  const getUserRequests = async () => {
    try {
      const res = await axios.get("http://localhost:8888/request/recevied", {
        withCredentials: true,
      });
      setUserRequest(res.data);
    } catch (err) {
      console.log(
        "ERROR while calling the request/recevied api : " + err.message
      );
    }
  };
  useEffect(() => {
    getUserRequests();
  }, []);

  if (!userRequest) {
    return;
  }

  if (userRequest.length === 0) {
    return (
      <div>
        <ul className="list bg-base-100 rounded-box shadow-md ">
          <li className="p-4 pb-2 text-3xl opacity-60 tracking-wide">
            No Requests
          </li>
        </ul>
      </div>
    );
  }
  return (
    <>
      <ul className="list bg-base-100 rounded-box shadow-md ">
        <li className="p-4 pb-2 text-3xl opacity-60 tracking-wide">Requests</li>
        {userRequest.map((r) => (
          <li key={r._id} className="list-row ">
            <ShowRequests req={r} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Requests;
