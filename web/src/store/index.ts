import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice.ts";

export const store = configureStore({
    reducer: {
        auth: authSlice,
    },
});

store.subscribe(() => {
    const { auth } = store.getState();
    if(auth.token) {
        localStorage.setItem("auth", JSON.stringify(auth));
    } else {
        localStorage.removeItem("auth");
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;