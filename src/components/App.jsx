import Body from "./Body";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Feed from "./Feed";

import { Provider } from "react-redux";
import store from "../utils/store";
import Connections from "./Connections";
import Requests from "./Requests";
import AI_model from "./AI_model";
import Chat from "./Chat"

export default function App() {



  return (
    <Provider store={store}>

      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Body />}>

            <Route index element={<Feed />} />

            <Route path="login" element={<Login />} />

            <Route path="signup" element={<SignUp />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />


            <Route path="profile" element={<Profile />} />
            <Route path="ai-model" element={<AI_model />} />
            <Route path="/chat/:toUserId" element={<Chat />} />


          </Route>

        </Routes>

      </BrowserRouter>

    </Provider>
  );
}