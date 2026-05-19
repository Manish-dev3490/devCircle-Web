import { createSlice } from '@reduxjs/toolkit';

const connectionSlice = createSlice({
    name: "connection Slice",
    initialState: null,
    reducers: {
        addConnections: (state, action) => {
            return action.payload;
        },
        removeConnection: () => {
            return null;
        }
    }
})
export default connectionSlice.reducer;
export const { addConnections, removeConnection } = connectionSlice.actions