import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  userID: localStorage.getItem("userLast")?localStorage.getItem("userLast"):'',
  loggedStatus: localStorage.getItem("userLast")?true:false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIN: (state,action) => {
      state.loggedStatus = true;
      state.userID =  action.payload;
      localStorage.setItem("userLast", action.payload);
    },
    logOUT: (state) => {
        state.loggedStatus = false;
        localStorage.removeItem("userLast");
    },
    Register: (state, action) => {
        state.loggedStatus = true;
        state.userID =  action.payload;
        localStorage.setItem("userLast", action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { logOUT, logIN, Register } = userSlice.actions

export default userSlice.reducer