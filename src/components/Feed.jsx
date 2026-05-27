import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./userCard";

const Feed = () => {
  const dispatch = useDispatch();

  const feedData = useSelector((store) => store.feedSlice);

  const getFeed = async () => {
    try {
      const feed = await axios.get(
        BASE_URL + "/user/feed",
        {
          withCredentials: true,
        }
      );

      dispatch(addFeed(feed.data));
    } catch (error) {
      console.log(error + "erere hai");
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feedData) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (feedData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">

        <img
          className="w-52 mb-6"
          src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
          alt="No users"
        />

        <h1 className="text-3xl font-bold text-white">
          No New Users Found
        </h1>

        <p className="text-gray-400 mt-3 text-lg">
          You have seen all profiles for now 🚀
        </p>

      </div>
    );
  }
  return (
    <div className="flex flex-row bg-base-300 flex-wrap gap-8 mx-10  my-6">
      {Array.isArray(feedData) && feedData.map((data) => (

        <UserCard key={data._id} feedData={data} />
      ))}
    </div>
  );
};

export default Feed;
