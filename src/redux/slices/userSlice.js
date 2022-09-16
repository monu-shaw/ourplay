import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiCalls from '../../apiCalls';



export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});

const initialState = {
  value: 0,
  userID: localStorage.getItem("userLast")?localStorage.getItem("userLast"):'',
  loggedStatus: localStorage.getItem("userLast")?true:false,
  userPlayList: [],
  userNoPlayList: false,
  userVideo: [],
  userNoVideo: false,
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
  extraReducers: (builder) => {
    builder
        .addCase(fetchPlaylistNVideo.pending, (state, action) => {
            //state.status = STATUSES.LOADING;
            //console.log('pending');

        })
        .addCase(fetchPlaylistNVideo.fulfilled, (state, action) => {
            //state.data = action.payload;
            //state.status = STATUSES.IDLE;
            /* console.log('fullfilled');
            console.log(action.payload); */
            if(action.payload !== 0){
              state.userPlayList = action.payload;
              state.userNoPlayList = false;
            }else{
              state.userNoPlayList = true;
            }
        })
        .addCase(fetchPlaylistNVideo.rejected, (state, action) => {
            //state.status = STATUSES.ERROR;
//            console.log('rejected');
        })
        .addCase(fetchVideo.pending, (state, action) => {
            //state.status = STATUSES.LOADING;
           // console.log('pending');
      
        })
        .addCase(fetchVideo.fulfilled, (state, action) => {
            //state.data = action.payload;
            //state.status = STATUSES.IDLE;
            /* console.log('fullfilled');
            console.log(action.payload); */
            if(action.payload !== 0){
              state.userVideo = action.payload;
              state.userNoVideo = false;
            }else{
              state.userNoVideo = true;
            }
        })
        .addCase(fetchVideo.rejected, (state, action) => {
            //state.status = STATUSES.ERROR;
            //console.log('rejected');
            state.userNoVideo = true;
        });
  }
});
//
export const fetchPlaylistNVideo = createAsyncThunk(
  'users/fetchPlaylistNVideo',
  async (userId) => {
    const res = await apiCalls.get('?userPlaylist='+userId);
    const data = await res.data;
    return data;
  }
);
export const fetchVideo = createAsyncThunk(
  'users/fetchVideo',
  async (userId) => {
    const res = await apiCalls.get('?userVideos='+userId);
    const data = await res.data;
    return data;
  }
);

// Action creators are generated for each case reducer function
export const { logOUT, logIN, Register } = userSlice.actions


export default userSlice.reducer