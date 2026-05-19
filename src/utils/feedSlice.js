import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feedSlice",
    initialState: null,
    reducers: {

        addFeed: (state, action) => {
            return action.payload;
        },
        removefeed: () => {
            return null;
        }

    }
})



export default feedSlice.reducer;
export const { addFeed, removeFeed } = feedSlice.actions