import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isAuth: false,
    remember: false,
  },
  reducers: {
    setRemember(state, action) {
      state.remember = action.payload ? true : false;
      localStorage.setItem("remember", state.remember)
    },

    setToken(state, action) {
      state.token = action.payload;
      state.isAuth = true;
      if (state.remember) {
        localStorage.setItem("token", state.token)
        localStorage.setItem("isAuth", state.isAuth)
      }
    },

    setUserFirstName(state, action) {
      state.userFirstName = action.payload
      if (state.remember) {
        localStorage.setItem("userFirstName", state.userFirstName)
      }
    },

    setUserLastName(state, action) {
      state.userLastName = action.payload
      if (state.remember) {
        localStorage.setItem("userLastName", state.userLastName)
      }
    },

    clearToken(state) {
      state.remember = false
      state.token = null
      state.setUserFirstName = null
      state.setUserLastName = null
      state.isAuth = false
      localStorage.removeItem("remember")
      localStorage.removeItem("token")
      localStorage.removeItem("isAuth")
      localStorage.removeItem("userFirstName")
      localStorage.removeItem("userLastName")
    },
  },
});



export const { setRemember, setUserFirstName, setUserLastName, setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;

