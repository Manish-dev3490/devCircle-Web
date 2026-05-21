import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ feedData }) => {
  const {
    firstName,
    lastName,
    age,
    photo,
    _id,
  } = feedData;

  const dispatch = useDispatch();

  const sendConnection = async (_id, status) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(removeUserFromFeed(_id));

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-slate-800 w-60 shadow-xl my-6 mx-6 overflow-hidden">

      {/* Image */}
      <figure className="w-full h-64 overflow-hidden">
        <img
          src={photo}
          alt={firstName}
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Content */}
      <div className="card-body p-4">

        <h2 className="card-title text-lg text-white">
          {firstName} {lastName}
        </h2>

        <p className="text-sm text-gray-300">
          Age: {age}
        </p>

        <div className="card-actions justify-between mt-3">

          <button
            className="btn btn-sm"
            onClick={() =>
              sendConnection(_id, "ignored")
            }
          >
            Ignore
          </button>

          <button
            className="btn btn-sm bg-orange-400 border-none hover:bg-orange-500"
            onClick={() =>
              sendConnection(_id, "interested")
            }
          >
            Interested
          </button>

        </div>

      </div>
    </div>
  );
};

export default UserCard;