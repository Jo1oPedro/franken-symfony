import {useState} from "react";
import * as React from "react";
import InputField from "../../components/InputField.tsx";
import Button from "../../components/Button.tsx";
import {login} from "../../services/auth/authService.ts";

const LoginPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const data = await login(email, password);
            //dispatch(setCredentais(data));
            //navigate("/dashboard");
        } catch (error) {
            setError("erro ao logar");
        }
        console.log("entrou");
    }

    return (
        <main className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="w-full max-w-sm p-8 rounded-2-xl bg-slate-900 border border-slate-800">
                <h1 className="text-2xl font-semibold mb-6 text-white">Entrar</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <InputField
                        label={"E-mail"}
                        type={"email"}
                        value={email}
                        onChange={setEmail}
                    />
                    <InputField
                        label={"Password"}
                        type={"password"}
                        value={password}
                        onChange={setPassword}
                    />

                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <Button label="enviar" type="submit" className="w-[60px]" />
                </form>
            </div>
        </main>
    )
};

export default LoginPage;