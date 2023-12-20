import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    isAuth: !!localStorage.getItem("isAuth"),
    remember: !!localStorage.getItem("remember"),
  },
  reducers: {
    setRemember(state, action) {
      state.remember = action.payload ? true : false
      localStorage.setItem("remember", state.remember)
    },

    setToken(state, action) {
      state.token = action.payload
      state.isAuth = true
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
      state.token = null
      state.setUserFirstName = null
      state.setUserLastName = null
      state.isAuth = false
      localStorage.removeItem("token")
      localStorage.removeItem("isAuth")
      localStorage.removeItem("userFirstName")
      localStorage.removeItem("userLastName")
    },

    clearRemember(state) {
      state.remember = false
      localStorage.removeItem("remember")
    },
  },
});



export const { setRemember, setUserFirstName, setUserLastName, setToken, clearToken, clearRemember } = authSlice.actions;
export default authSlice.reducer;

