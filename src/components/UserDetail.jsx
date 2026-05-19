


const UserDetail = ({ data }) => {

    const {
        firstName,
        lastName,
        age,
        photo
    } = data;

    return (

        <div className="w-full max-w-3xl mx-auto bg-base-100 shadow-xl rounded-2xl p-5 flex items-center justify-between hover:shadow-2xl transition-all duration-300">

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

                <button className="btn btn-primary btn-sm">
                    Message
                </button>

                <button className="btn btn-outline btn-sm">
                    Remove
                </button>

            </div>

        </div>
    );
};

export default UserDetail;