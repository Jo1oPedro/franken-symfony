import {api} from "../http.tsx";

type AuthResponse = {
    token: string,
    user: {id: string, email: string}
};

export async function login(email: string, password: string) {
    return api<AuthResponse>(
        "/api/login",
        {
           method: "POST",
           body: JSON.stringify({email, password})
        }
    );
}

export async function register(name: string, email: string, password: string) {
    return api<AuthResponse>(
        "/api/register",
        {
            method: "POST",
            body: JSON.stringify({name, email, password})
        }
    );
}