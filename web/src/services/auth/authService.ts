import {api} from "../http.tsx";

type AuthResponse = {
    user: {id: string, email: string, isVerified: boolean}
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

export async function verifyEmail(token: string) {
    return api<null>("/api/auth/verify-email", {
       method: "POST",
       body: JSON.stringify({token})
    });
}

export async function resendVerificationEmail(email: string) {
    return api<null>("/api/auth/resend-verification-email", {
        method: "POST",
        body: JSON.stringify({email})
    });
}

export function logout() {
    return api<null>("/api/auth/logout", { method: "POST" });
}