import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "RequestsSlice",
  initialState: null,
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {

      const remainingRequest = state.filter((request) => {
        return request._id !== action.payload;
      });

      return remainingRequest;
    },
  },
});
export default requestsSlice.reducer;
export const { addRequest, removeRequest } = requestsSlice.actions;
