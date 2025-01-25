import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";

const initialState = {
    user: null,
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        
        signin: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
});

export const { signin, logout } = authSlice.actions;

export default authSlice.reducer;

export const currentUser = (state: RootState) => state.auth.user;
export const currentUserToken = (state: RootState) => state.auth.token;