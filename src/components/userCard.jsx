import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = (props) => {
    const { firstName, lastName, age, photo, _id } = props.feedData;
    const dispatch = useDispatch();

    const sendConnection = async (_id, status) => {
        try {
            const response = await axios.post(BASE_URL + "/request/send/" + status + "/" + _id, {}, { withCredentials: true });
            dispatch(removeUserFromFeed(_id));
            console.log(response);


        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="card bg-slate-800 w-60 shadow-sm my-8 mx-8 ">
            <figure>
                <img
                    src={photo}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p>{age}</p>
                <div className="card-actions justify-end">
                    <button className="btn px-4" onClick={() => sendConnection(_id, "ignored")}>Ignored</button>
                    <button className="btn bg-orange-400 px-6" onClick={() => sendConnection(_id, "intrested")}>Intrested</button>

                </div>
            </div>
        </div>
    )
}

export default UserCard