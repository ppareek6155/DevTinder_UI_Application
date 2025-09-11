import { Provider } from "react-redux";
import Login from "./Components/login";
import Profile from "./Components/profile";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppStore from "./Store/store";
import Feed from "./Components/feed";
import Logout from "./Components/logout";
import Body from "./Components/body";
import Connections from "./Components/connections";
import Requests from "./Components/requests";

function App() {
  console.log("App.js file.");
  return (
    <>
      <Provider store={AppStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/friends" element={<Connections />} />
              <Route path="/request" element={<Requests />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
