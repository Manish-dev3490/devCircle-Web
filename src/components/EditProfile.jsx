import { useState } from "react";
import UserCard from "./userCard";
import { validateData } from "../utils/validation";
import axios from 'axios'
import { BASE_URL } from "../utils/constant";
import { addUser } from '../utils/userSlice'
import { useDispatch } from "react-redux"
import {useNavigate} from 'react-router-dom'

const EditProfile = (props) => {

    const [firstName, setFirstName] = useState(props.user.firstName);
    const [lastName, setLastName] = useState(props.user.lastName);
    const [age, setAge] = useState(props.user.age);
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const [photo, setPhoto] = useState(props.user.photo);

    // Error States
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [ageError, setAgeError] = useState("");
    const [photoError, setPhotoError] = useState("");

    async function handleSaveProfile(e) {

        try {

            e.preventDefault();

            // reset errors
            setFirstNameError("");
            setLastNameError("");
            setAgeError("");
            setPhotoError("");

            validateData(
                firstName,
                lastName,
                age,
                photo
            );
            console.log("Validation Passed");
            const response = await axios.patch(BASE_URL + "/profile/edit", { firstName, lastName, age, photo }, { withCredentials: true });
            dispatch(addUser(response.data.data))
            alert("Your profile is successfully updated");
            navigate('/');
            console.log(response);



        }
        catch (error) {

            if (error.field === "firstName") {
                setFirstNameError(error.message);
            }

            else if (error.field === "lastName") {
                setLastNameError(error.message);
            }

            else if (error.field === "age") {
                setAgeError(error.message);
            }

            else if (error.field === "photo") {
                setPhotoError(error.message);
            }
        }
    }

    return (

        <div className="min-h-screen bg-base-200 flex justify-center items-start gap-10 px-10 py-10">

            {/* Edit Form */}
            <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-xl p-8">

                <h1 className="text-3xl font-bold text-center mb-8">
                    Edit Your Profile
                </h1>

                <form
                    onSubmit={handleSaveProfile}
                    className="flex flex-col gap-5"
                >

                    {/* Profile Preview */}
                    <div className="flex justify-center">

                        <div className="avatar">

                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">

                                <img
                                    src={photo}
                                    alt="Profile"
                                />

                            </div>

                        </div>

                    </div>

                    {/* First Name */}
                    <div className="flex flex-col gap-2">

                        <label
                            htmlFor="firstName"
                            className="font-medium text-white cursor-pointer"
                        >
                            Enter your first name
                        </label>

                        <input
                            id="firstName"
                            type="text"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                                setFirstNameError("");
                            }}
                            className="input input-bordered w-full px-4"
                        />

                        {
                            firstNameError && (
                                <span className="text-red-500">
                                    {firstNameError}
                                </span>
                            )
                        }

                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col gap-2">

                        <label
                            htmlFor="lastName"
                            className="font-medium text-white cursor-pointer"
                        >
                            Enter your last name
                        </label>

                        <input
                            id="lastName"
                            type="text"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                                setLastNameError("");
                            }}
                            className="input input-bordered w-full px-4"
                        />

                        {
                            lastNameError && (
                                <span className="text-red-500">
                                    {lastNameError}
                                </span>
                            )
                        }

                    </div>

                    {/* Age */}
                    <div className="flex flex-col gap-2">

                        <label
                            htmlFor="age"
                            className="font-medium text-white cursor-pointer"
                        >
                            Enter your age
                        </label>

                        <input
                            id="age"
                            type="number"
                            placeholder="Enter your age"
                            value={age}
                            onChange={(e) => {
                                setAge(e.target.value);
                                setAgeError("");
                            }}
                            className="input input-bordered w-full px-4"
                        />

                        {
                            ageError && (
                                <span className="text-red-500">
                                    {ageError}
                                </span>
                            )
                        }

                    </div>

                    {/* Photo URL */}
                    <div className="flex flex-col gap-2">

                        <label
                            htmlFor="photo"
                            className="font-medium text-white cursor-pointer"
                        >
                            Enter your photo URL
                        </label>

                        <input
                            id="photo"
                            type="text"
                            placeholder="Enter your profile image URL"
                            value={photo}
                            onChange={(e) => {
                                setPhoto(e.target.value);
                                setPhotoError("");
                            }}
                            className="input input-bordered w-full px-4"
                        />

                        {
                            photoError && (
                                <span className="text-red-500">
                                    {photoError}
                                </span>
                            )
                        }

                    </div>

                    {/* Button */}
                    <button className="btn btn-primary mt-3">
                        Save Profile
                    </button>

                </form>

            </div>

            {/* User Card Preview */}
            <div className="flex justify-center items-start">

                <UserCard
                    feedData={{
                        ...props.user,
                        firstName,
                        lastName,
                        age,
                        photo
                    }}
                />

            </div>

        </div>
    );
};

export default EditProfile;