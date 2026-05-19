import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connestionsSlice';
import UserDetail from './UserDetail';

const Connections = () => {

    const connectionData = useSelector((store) => store?.connectionSlice);
    const dispatch = useDispatch();
    const getConnections = async () => {
        try {
            const response = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            console.log(response);
            dispatch(addConnections(response.data.data));

        }
        catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getConnections();
    }, [])

    if (!connectionData) return;
    if (connectionData.length === 0) return (<h1>You dont have any connections</h1>)
    return (

        <div className="min-h-screen bg-base-200 px-5 py-10">

            <h1 className="text-4xl font-bold text-center mb-10">
                Your Connections
            </h1>

            <div className="flex flex-col gap-5">

                {
                    connectionData.map((connection) => (

                        <UserDetail
                            data={connection}
                            key={connection._id}
                        />

                    ))
                }

            </div>

        </div>
    )
}

export default Connections