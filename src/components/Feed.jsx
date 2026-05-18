import { useSelector } from "react-redux";

const Feed = () => {

  const userData = useSelector((store) => store.userSlice);

  if (!userData) return null;
  console.log("i am inside feed");
  

  return (
    <div>I am feed </div>
  );
};

export default Feed;