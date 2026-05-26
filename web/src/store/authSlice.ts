import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type User = {
    id: string,
    email: string,
    isVerified: boolean
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
        markVerified: (state) => {
            if(state.user) {
                state.user.isVerified = true;
            }
        }
    },
})

export const {setUser, clearUser, markVerified} = authSlice.actions;
export default authSlice.reducer;