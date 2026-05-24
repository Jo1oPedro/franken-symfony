import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useEffect, useState} from "react";
import {api} from "../../services/http.tsx";
import {logout, setCredentials} from "../../store/authSlice.ts";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const token = useAppSelector(s => s.auth.token);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!token) { setReady(true); return; }
        api<{ user: { id: string, email: string } } >("/api/me")
            .then(({ user }) => dispatch(setCredentials({ token, user })))
            .catch(() => dispatch(logout()))
            .finally(() => setReady(true));
    }, []);

    if(!ready) return <span className="loading loading-spinner" />;
    return <>{children}</>
}