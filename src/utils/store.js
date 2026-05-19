import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import feedReducer from './feedSlice.js'
import connectionReducer from './connestionsSlice.js'

const store = configureStore({
    reducer: {
        userSlice: userReducer,
        feedSlice:feedReducer,
        connectionSlice:connectionReducer
    }
})
export default store;