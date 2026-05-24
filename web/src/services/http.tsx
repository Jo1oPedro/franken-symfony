import {store} from "../store";
import {logout} from "../store/authSlice.ts";

const API_URL = import.meta.env.VITE_API_URL ?? "http://api.localhost";

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
    const token = store.getState().auth.token;
    const res = await fetch(`${API_URL}${path}`, {
       ...init,
       headers: {
           "Content-Type": "application/json",
           ...(token ? { Authorization: `Bearer ${token}`}: {}),
           ...(init.headers ?? {}),
       }
    });

    if(res.status === 401) {
        store.dispatch(logout());
        throw new Error("Unauthenticated");
    }

    const data = await res.json().catch(() => null);
    if(!res.ok) throw data;
    return data as T;
}