import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userSlice",
    initialState: null,
    reducers: {

        addUser: (state, action) => {
            return action.payload;
        }

    }
})



export default userSlice.reducer;
export const { addUser } = userSlice.actions