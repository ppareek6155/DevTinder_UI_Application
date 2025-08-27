import axios from "axios";
import { useEffect, useState } from "react";

const Connections = () => {
  const [connections, setConnections] = useState(null);
  const getConnections = async () => {
    try {
      const data = await axios.get("http://localhost:8888/connections", {
        withCredentials: true,
      });
      setConnections(data.data);
    } catch (err) {
      console.log(
        "ERROR while calling the request/recevied api : " + err.message
      );
    }
  };
  useEffect(() => {
    getConnections();
  }, []);
  if (!connections) {
    return;
  }
  if (connections === 0) {
    return (
      <div>
        <h1>No friends</h1>
      </div>
    );
  }
  return (
    <>
      <ul className="list bg-base-100 rounded-box shadow-md ">
        <li className="p-4 pb-2 text-3xl opacity-60 tracking-wide">Friends</li>
        {connections.map((r) => (
          <li key={r._id} className="list-row ">
            <div>
              <img className="size-10 rounded-box" src={r.photoUrl} />
            </div>
            <div>
              <div>{r.firstName + " " + r.lastName}</div>
              <div className="text-xs uppercase font-semibold opacity-60">
                Remaining Reason
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Connections;
