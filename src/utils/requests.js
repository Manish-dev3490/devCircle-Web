import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "RequestsSlice",
  initialState: null,
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    removeRequest: () => {
      return null;
    },
  },
});
export default requestsSlice.reducer;
export const { addRequest, removeRequest } = requestsSlice.actions;
