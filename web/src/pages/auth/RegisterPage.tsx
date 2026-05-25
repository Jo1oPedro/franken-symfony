import {useAppDispatch} from "../../store/hooks.ts";
import {useState} from "react";
import * as React from "react";
import {register} from "../../services/auth/authService.ts";
import {setUser} from "../../store/authSlice.ts";
import MarketingPanel from "../../components/auth/MarketingPanel.tsx";
import {Link, useNavigate} from "react-router";

const RegisterPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [agreed, setAgreed] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError([]);

        if(!agreed) {
            setError(["You must agree to the terms and Privacy Policy"]);
            return;
        }

        if(password !== confirmPassword) {
            setError(["The passwords are not equal"]);
            return;
        }

        setLoading(true);
        try {
            const data = await register(name, email, password);
            console.log(data);
            dispatch(setUser(data.user));
            navigate("/dashboard");
        } catch (error: any) {
            const messages: string[] = [];

            if(error?.errors && typeof error.errors === "object") {
                messages.push(...Object.values<string>(error.errors));
            }

            if(error?.error && typeof error.error === "string") {
                messages.push(error.error);
            }

            if(messages.length === 0) {
                messages.push("Unexpected error. Please try again.");
            }

            setError(messages);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex bg-base-100">
            <MarketingPanel />

            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-[360px]">
                    <p className="text-right text-xs text-base-content/60 mb-8">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary font-medium">Log in</Link>
                    </p>

                    <h2 className="text-2xl font-semibold mb-1">Create your account</h2>
                    <p className="text-sm text-base-content/60 mb-6">Takes about 20 seconds.</p>

                    <div className="mb-5">
                        <button className="btn btn-outline flex-1 btn-sm h-10">
                            Google
                        </button>
                    </div>

                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex-1 h-px bg-base-300" />
                        <span className="text-xs text-base-content/40">or with email</span>
                        <div className="flex-1 h-px bg-base-300" />
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <label className="form-control w-full">
                            <div className="label pb-1">
                                <span className="label-text text-xs font-medium">Name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Ana Souza"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input input-bordered w-full"
                                required
                            />
                        </label>

                        <label className="form-control w-full">
                            <div className="label pb-1">
                                <span className="label-text text-xs font-medium">Email</span>
                            </div>
                            <input
                                type="email"
                                placeholder="ana@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered w-full"
                                required
                            />
                        </label>

                        <label className="form-control w-full">
                            <div className="label pb-1">
                                <span className="label-text text-xs font-medium">Password</span>
                            </div>
                            <input
                                type="password"
                                placeholder="At least 8 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered w-full"
                                minLength={8}
                                required
                            />
                        </label>

                        <label className="form-control w-full">
                            <div className="label pb-1">
                                <span className="label-text text-xs font-medium">Confirm password</span>
                            </div>
                            <input
                                type="password"
                                placeholder="At least 8 characters"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="input input-bordered w-full"
                                minLength={8}
                                required
                            />
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="checkbox checkbox-primary checkbox-sm mt-0.5"
                            />
                            <span className="text-xs text-base-content/60 leading-relaxed">
                                I agree to the{" "}
                                <a href="#" className="text-base-content-underline">Terms</a>
                                {" "}and{" "}
                                <a href="#" className="text-base-content underline">Privacy Policy</a>
                            </span>
                        </label>

                        {error.length > 0 && (
                            <div role="alert" className="alert alert-error py-2 text-sm">
                                <span>
                                    {error.map((msg, i) => (
                                       <span key={i}>
                                           {msg}
                                           {i < error.length - 1 && <br />}
                                       </span>
                                    ))}
                                </span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full"
                        >
                            {loading
                                ? <span className="loading loading-spinner loading-sm" />
                                : "Create account →"
                            }
                        </button>
                    </form>

                    <p className="text-[11px] text-base-content/40 text-center mt-4">
                        We'll never share your email.
                    </p>
                </div>
            </div>
        </main>
    )
};

export default RegisterPage;