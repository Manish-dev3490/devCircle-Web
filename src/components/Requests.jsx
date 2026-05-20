import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest,removeRequest } from "../utils/requests";

const Requests = () => {

  const requestsData = useSelector(
    (store) => store?.requestsSlice
  );

  const dispatch = useDispatch();

  const getRequests = async () => {

    try {

      const response = await axios.get(
        BASE_URL + "/user/requests/recieved",
        {
          withCredentials: true,
        }
      );

      dispatch(addRequest(response.data.data));

    }
    catch (error) {

      console.log(error.response);

    }
  };

  const handleRequest = async (status, _id) => {
    try {
      const response = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });

      dispatch(removeRequest(_id));
      console.log(response);

    }
    catch (error) {
      console.log(error.response);

    }
  }

  useEffect(() => {

    getRequests();

  }, []);

  // Loading State
  if (!requestsData) {

    return (
      <div className="flex justify-center mt-10">

        <span className="loading loading-spinner loading-lg"></span>

      </div>
    );
  }

  // Empty State
  if (requestsData.length === 0) {

    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">

        <div className="bg-base-100 shadow-2xl rounded-3xl p-10 text-center max-w-lg w-full">

          <div className="text-7xl mb-5">
            📭
          </div>

          <h1 className="text-3xl font-bold mb-3">
            No Requests Yet
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed">
            You don&apos;t have any connection requests right now.
          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-base-200 px-5 py-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        Connection Requests
      </h1>

      <div className="flex flex-col gap-5">

        {
          requestsData.map((request) => {

            const {
              firstName,
              lastName,
              age,
              photo
            } = request.fromUserId;

            return (

              <div
                key={request._id}
                className="w-full max-w-3xl mx-auto bg-base-100 shadow-xl rounded-2xl p-5 flex items-center justify-between hover:shadow-2xl transition-all duration-300"
              >

                {/* Left Section */}
                <div className="flex items-center gap-5">

                  {/* Avatar */}
                  <div className="avatar">

                    <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">

                      <img
                        src={photo}
                        alt="profile"
                      />

                    </div>

                  </div>

                  {/* User Info */}
                  <div className="flex flex-col">

                    <h1 className="text-2xl font-bold">
                      {firstName} {lastName}
                    </h1>

                    <p className="text-gray-400">
                      {age} years old
                    </p>

                  </div>

                </div>

                {/* Right Section */}
                <div className="flex gap-3">

                  <button onClick={() => handleRequest("accepted", request._id)} className="btn btn-success btn-sm px-4">
                    Accept
                  </button>

                  <button onClick={() => handleRequest("rejected", request._id)} className="btn btn-error btn-sm px-4">
                    Reject
                  </button>

                </div>

              </div>
            );
          })
        }

      </div>

    </div>
  );
};

export default Requests;