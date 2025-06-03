import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userDataReducer from "./slices/userDataSlice";
import workoutReducer from "./slices/workoutPlanSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userData: userDataReducer,
    workout: workoutReducer,
  },
});
