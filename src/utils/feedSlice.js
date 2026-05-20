import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feedSlice",
    initialState: null,
    reducers: {

        addFeed: (state, action) => {
            return action.payload;
        },
        removeUserFromFeed: (state, action) => {
            const remainingFeed = state.filter((user) => user._id != action.payload);
            return remainingFeed;
        }

    }
})



export default feedSlice.reducer;
export const { addFeed, removeUserFromFeed } = feedSlice.actions