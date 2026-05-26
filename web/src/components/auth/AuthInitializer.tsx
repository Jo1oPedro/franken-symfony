import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useEffect} from "react";
import {api} from "../../services/http.tsx";
import {clearUser, setUser} from "../../store/authSlice.ts";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const status = useAppSelector((s) => s.auth.status);

    useEffect(() => {
        api<{ user: { id: string, email: string, isVerified: boolean } } >("/api/me")
            .then(({ user }) => dispatch(setUser(user)))
            .catch(() => dispatch(clearUser()))
    }, []);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <span className="loading loading-spinner loading-lg" />
            </div>
        );
    }

    return <>{children}</>
}