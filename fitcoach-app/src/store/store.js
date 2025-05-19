import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import workoutReducer from "./slices/workoutPlanSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    workout: workoutReducer,
  },
});
