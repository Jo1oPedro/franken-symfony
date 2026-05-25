import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type User = {
    id: string,
    email: string
}

type Status = "loading" | "authenticated" | "guest";

type AuthState = {
    user: User | null;
    status: Status
};

const initialState: AuthState = {user: null, status: "loading"};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        //setCredentials
        setUser: (
            state,
            action: PayloadAction<User>
        ) => {
            state.user = action.payload;
            state.status = "authenticated";
        },
        clearUser: (state) => {
            state.user = null;
            state.status = "guest"
        },
    },
})

export const {setUser, clearUser} = authSlice.actions;
export default authSlice.reducer;