import { createSlice } from "@reduxjs/toolkit";


const firstLetterUpperCase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase().trim()
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    isAuth: !!localStorage.getItem("isAuth"),
    remember: !!localStorage.getItem("remember"),
    userFirstName: localStorage.getItem("userFirstName") || null,
    userLastName: localStorage.getItem("userLastName") || null,
    isEditingUserName: false,
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
      state.userFirstName = firstLetterUpperCase(action.payload)
      if (state.remember) {
        localStorage.setItem("userFirstName", state.userFirstName)
      }
    },

    setUserLastName(state, action) {
      state.userLastName = firstLetterUpperCase(action.payload)
      if (state.remember) {
        localStorage.setItem("userLastName", state.userLastName)
      }
    },

    setIsEditingUserName(state, action) {
      state.isEditingUserName = action.payload ? true : false
    },
 
    clearToken(state) {
      state.token = null
      state.userFirstName = null
      state.userLastName = null
      state.isAuth = false
      state.isEditingUserName = false
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



export const { setRemember, setUserFirstName, setUserLastName, setToken, setIsEditingUserName, clearToken, clearRemember } = authSlice.actions;
export default authSlice.reducer;

