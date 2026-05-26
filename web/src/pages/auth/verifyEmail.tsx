import {Link, useSearchParams} from "react-router";
import {useAppDispatch} from "../../store/hooks.ts";
import {useEffect, useState} from "react";
import {verifyEmail} from "../../services/auth/authService.ts";
import {markVerified} from "../../store/authSlice.ts";

type Status = "verifying" | "success" | "error";

export default function VerifyEmailPage() {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const [status, setStatus] = useState<Status>("verifying");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const token = searchParams.get("token");

    useEffect(() => {
        if(!token) {
            setStatus("error");
            setErrorMessage("Token not found in URL.");
            return;
        }

        verifyEmail(token)
            .then(() => {
                dispatch(markVerified());
                setStatus("success");
            })
            .catch((error) => {
                setStatus("error");
                setErrorMessage(error?.error ?? "The email could not be verified")
            })
    }, [token, dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
            <div className="card bg-base-100 shadow-md w-full max-w-md">
                <div className="card-body items-center text-center gap-4">
                    {status === "verifying" && (
                        <>
                            <span className="loading loading-spinner loading-lg" />
                            <h2 className="card-title">Verifying your email...</h2>
                        </>
                    )}

                    {status === "success" && (
                        <>
                            <div className="text-success text-5xl">✓</div>
                            <h2 className="card-title">Email verified!</h2>
                            <p className="text-base-content/70">
                                Your account is ready to use.
                            </p>
                            <div className="card-actions">
                                <Link to="/dashboard" className="btn btn-primary">
                                    Go to Dashboard
                                </Link>
                            </div>
                        </>
                    )}

                    {status === "error" && (
                        <>
                            <div className="text-error text-5xl">✗</div>
                            <h2 className="card-title">Unable to verify</h2>
                            <p className="text-base-content/70">{errorMessage}</p>
                            <div className="card-actions">
                                <Link to="/dashboard" className="btn btn-ghost">
                                    Back
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}