import { configureStore } from "@reduxjs/toolkit"
import authSliceReducer from "../slices/authSlice"

const rootReducer = {
  auth: authSliceReducer,
}

const store = configureStore({
  reducer: rootReducer,
})


export default store
