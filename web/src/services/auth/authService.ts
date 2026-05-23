const API_URL = import.meta.env.VITE_API_URL ?? "http://api.localhost";

export async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
       method: "POST",
       headers: {"Content-Type": "application/json"},
       body: JSON.stringify({email, password})
    });

    if(!res.ok) throw new Error("Invalid credentials");

    return res.json() as Promise<{token: string; user: {email: string}}>;
}