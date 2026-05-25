import {store} from "../store";
import {clearUser} from "../store/authSlice.ts";

const API_URL = import.meta.env.VITE_API_URL ?? "http://api.localhost";

let refreshPromise: Promise<boolean> | null = null;

async function tryRefresh(): Promise<boolean> {
    if(!refreshPromise) {
        refreshPromise = fetch(`${API_URL}/api/auth/refresh`, {
            method: "POST",
            credentials: "include"
        })
            .then((r) => r.ok)
            .finally(() => { refreshPromise = null; });
    }

    return refreshPromise;
}

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
    const doFetch = () => fetch(`${API_URL}${path}`, {
        credentials: "include",
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...(init.headers ?? {}),
        },
    })

    let res = await doFetch();

    if(res.status === 401 && path !== "/api/auth/refresh") {
        const refreshed = await tryRefresh();
        if(refreshed) {
            res = await doFetch();
        } else {
            store.dispatch(clearUser());
            throw new Error("Unauthenticated");
        }
    }

    const data = await res.json().catch(() => null);
    if(!res.ok) throw data;
    return data as T;
}