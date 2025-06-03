import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDataInfo: localStorage.getItem('userDataInfo')
    ? JSON.parse(localStorage.getItem('userDataInfo'))
    : null,
};

const userDataSlice = createSlice({
  name: 'userData', 
  initialState,
  reducers: {
    setUserDataInfo: (state, action) => {
      state.userDataInfo = action.payload;
      localStorage.setItem('userDataInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userDataInfo = null;
      localStorage.removeItem('userDataInfo');
    },
  },
});

export const { setUserDataInfo, logout } = userDataSlice.actions;
export default userDataSlice.reducer;