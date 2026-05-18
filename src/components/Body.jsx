import NavBar from './NavBar'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store?.userSlice);
  console.log("i am inside body");

  const fetchUser = async () => {
    if (userData) return;
    try {
      const response = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
      dispatch(addUser(response.data));
    }
    catch (error) {
      navigate('/login')
      console.log(error.message);

    }
  }

  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Body