import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Store/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./constant";

const Login = () => {
  const [EmailId, setEmailId] = useState("");
  const [Password, setPassword] = useState("");
  const [value, setValue] = useState(" ");
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleSignIn = async () => {
    try {
      const userInfo = await axios.post(
        BASE_URL + "/login",
        {
          emailId: EmailId,
          password: Password,
        },
        { withCredentials: true }
      );
      console.log("after login");
      dispatch(addUser(userInfo.data));
      navigate("/feed");
    } catch (err) {
      console.log("error while sign in : " + err.message);
    }
  };
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId: EmailId,
          password: Password,
          photoUrl,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      console.log("Error while SignUp : " + err.message);
    }
  };

  if (user) {
    navigate("/feed");
  }
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-sm  border border-black justify-center">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                type="text"
                className="input"
                placeholder="abc@gmail.com"
                value={EmailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
          </div>

          {isSignUp && (
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder=" first name............"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </fieldset>
            </div>
          )}
          {isSignUp && (
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="last name............."
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
              </fieldset>
            </div>
          )}
          {isSignUp && (
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo Url</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="photo url............"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
            </div>
          )}

          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="Password...."
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          {!value && (
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Invalid Credentials</legend>
              </fieldset>
            </div>
          )}
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={isSignUp ? handleSignUp : handleSignIn}>
              {isSignUp ? "Sign Up" : "Sign in"}
            </button>
          </div>

          <p onClick={() => setIsSignUp(!isSignUp)} className="cursor-pointer">
            {isSignUp ? "Existing user : sign In  " : "New user : Sign up "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
