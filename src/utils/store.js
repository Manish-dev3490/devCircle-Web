import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'

const store = configureStore({
    reducer: {
        userSlice: userReducer
    }
})
export default store;