import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workoutPlan: localStorage.getItem('workoutPlan')
    ? JSON.parse(localStorage.getItem('workoutPlan'))
    : null,
};

const workoutSlice = createSlice({
  name: 'workout', 
  initialState,
  reducers: {
    setWorkoutPlan: (state, action) => {
      state.workoutPlan = action.payload;
      localStorage.setItem('workoutPlan', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.workoutPlan = null;
      localStorage.removeItem('workoutPlan');
    },
  },
});

export const { setWorkoutPlan, logout } = workoutSlice.actions;
export default workoutSlice.reducer;