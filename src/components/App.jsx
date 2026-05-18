import Body from "./Body";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Feed from "./Feed";

import { Provider } from "react-redux";
import store from "../utils/store";

export default function App() {



  return (
    <Provider store={store}>

      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Body />}>

            <Route index element={<Feed />} />

            <Route path="login" element={<Login />} />

            <Route path="signup" element={<SignUp />} />

            <Route path="profile" element={<Profile />} />

          </Route>

        </Routes>

      </BrowserRouter>

    </Provider>
  );
}