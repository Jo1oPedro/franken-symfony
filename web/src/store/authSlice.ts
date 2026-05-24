import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type AuthState = {
    token: string | null;
    user: {id: string, email: string} | null
};

function loadInitialState(): AuthState {
    try {
        const raw = localStorage.getItem("auth");
        if(!raw) return { token: null, user: null};
        const parsed = JSON.parse(raw);
        return {
            token: parsed.token ?? null,
            user: parsed.user ?? null,
        };
    } catch {
        return { token: null, user: null};
    }
}

const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{token: string, user: {id: string, email: string}}>
        ) => {
            state.token = action.payload.token
            state.user = action.payload.user;

        },
        logout: (state) => {
            state.token = null;
            state.user = null;
        },
    },
})

export const {setCredentials, logout} = authSlice.actions;
export default authSlice.reducer;