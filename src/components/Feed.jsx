import { useSelector } from "react-redux";

const Feed = () => {

  const userData = useSelector((store) => store.userSlice);

  if (!userData) return null;

  return (
    <div>Feed</div>
  );
};

export default Feed;