import Body from "./Body";
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";

export default function App() {



  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

        </Routes>
      </BrowserRouter>

    </>
  )
}

