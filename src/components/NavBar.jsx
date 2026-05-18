import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";


function NavBar() {
    const userInformation = useSelector((store) => store.userSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogOut = async () => {

        try {
            const response = await axios.post(BASE_URL + "/logout",{} ,{ withCredentials: true });
            dispatch(removeUser())
            navigate('/login');
            console.log(response);
        }
        catch (error) {
            console.log(error.response);

        }
    }

    return (
        <div className="navbar bg-base-100 shadow-sm px-4">

            {/* Left Side */}
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost text-xl">
                    🧑🏻‍💻 Dev-Circle
                </Link >
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">

                {userInformation ? (
                    <p className="font-medium">
                        Welcome {userInformation.firstName}
                    </p>
                ) : (
                    ""
                )}

                {/* Avatar Dropdown */}
                <div className="dropdown dropdown-end">

                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            {
                                userInformation?.photo && (
                                    <img
                                        alt="User Avatar"
                                        src={userInformation.photo}
                                    />
                                )
                            }
                        </div>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link to='/profile' className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>



                        <li onClick={handleLogOut}>
                            <a>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default NavBar;