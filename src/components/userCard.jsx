
const UserCard = (props) => {
    const {firstName,lastName,age,photo}=props.feedData

    return (
        <div className="card bg-base-300 w-60 shadow-sm">
            <figure>
                <img
                    src={photo}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName+" "+lastName}</h2>
                <p>{age}</p>
                <div className="card-actions justify-end">
                    <button className="btn px-4">Ignored</button>
                    <button className="btn bg-orange-400 px-6">Intrested</button>

                </div>
            </div>
        </div>
    )
}

export default UserCard