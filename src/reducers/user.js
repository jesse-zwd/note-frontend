import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth";

export const login = createAsyncThunk(
    "login",
    async ({ payload, clearForm }) => {
        const user = await AuthService.login(payload)

        if (user.access) {
            clearForm()
            return user
        }
    }
)

export const signup = createAsyncThunk(
    "signup",
    async ({ payload, clearForm }) => {
        const user = await AuthService.signup(payload)

        clearForm()
        return user
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: JSON.parse(localStorage.getItem("user")) || {}
    },
    reducers: {
        updateUser(state, action) {
            state.data = {
                ...state.data,
                ...action.payload,
            };
        },
        logout(state, action) {
            state.data = {};
        },
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.data = action.payload || {};
        },
        [signup.fulfilled]: (state, action) => {
            state.data = action.payload || {};
        },
    },
})

export const {
    updateUser,
    logout,
} = userSlice.actions;

export default userSlice.reducer