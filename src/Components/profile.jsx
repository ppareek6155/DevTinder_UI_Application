import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./userCard";
import axios from "axios";
import { addUser, userReducer } from "../Store/userSlice";

const Profile = () => {
  const userData = useSelector((store) => store.user);
  const [firstName, setFirstname] = useState(userData?.firstName);
  const [lastName, setLastname] = useState(userData?.lastName);
  const [skills, setSkill] = useState(userData?.skills);
  const [photoUrl, setPhoturl] = useState(userData?.photoUrl);
  const [showNotify, setShowNotify] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = async () => {
    try {
      const res = await axios.put(
        "http://localhost:8888/profile/edit",
        {
          firstName,
          lastName,
          skills,
          photoUrl,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      setShowNotify(true);
      setTimeout(() => {
        setShowNotify(false);
      }, 2000);
    } catch (err) {
      console.log("error while edit the profile");
      console.log(err);
    }
  };
  if (!userData) {
    return (
      <>
        <h1>No data found</h1>
      </>
    );
  }

  return (
    <>
      <div className="card bg-base-100 w-96 shadow-sm  border border-black">
        <div className="card-body">
          <h2 className="card-title">Edit Profile</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                className="input"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                className="input"
                value={lastName}
                onChange={(e) => setLastname(e.target.value)}
              />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Skills</legend>
              <input
                type="text"
                className="input"
                value={skills}
                onChange={(e) => setSkill(e.target.value)}
              />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photo</legend>
              <input
                type="text"
                className="input"
                value={photoUrl}
                onChange={(e) => setPhoturl(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleEdit}>
              Save
            </button>
          </div>
        </div>
        <div className="border border-black ">
          <UserCard user={{ firstName, lastName, skills, photoUrl }} />
        </div>
        {showNotify && (
          <div className="toast toast-center toast-middle">
            <div className="alert alert-success">
              <span>Profile edit successfully.</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
