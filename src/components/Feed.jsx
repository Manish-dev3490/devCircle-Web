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

  return (
    <div className="flex flex-row bg-base-300 flex-wrap gap-8 mx-10  my-6">
      {feedData.map((data) => (
        <UserCard key={data._id} feedData={data} />
      ))}
    </div>
  );
};

export default Feed;
