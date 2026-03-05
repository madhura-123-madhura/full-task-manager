import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../apis/auth.api";
import { SIGNIN_RESPONSE } from "@/types/Auth";
import { getStorage } from "../utiles/authStorage";

type authType = {
    admin: {
        name: string,
        email: string,
        _id: string,
        mobile: string,
        role: string,
        profilePic: string
    } | null
}

const initialState: authType = {
    admin: getStorage()
}


const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addMatcher(authApi.endpoints.signin.matchFulfilled, (state, { payload }) => {
            state.admin = payload.result
        })


})

// export const { invalidate } = authSlice.actions
export default authSlice.reducer