import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authInfo: localStorage.getItem('authInfo')
    ? JSON.parse(localStorage.getItem('authInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth', 
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.authInfo = action.payload;
      localStorage.setItem('authInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.authInfo = null;
      localStorage.removeItem('authInfo');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;