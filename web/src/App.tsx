import LoginPage from "./pages/auth/LoginPage.tsx";
import {Navigate, Route, Routes, useLocation} from "react-router";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import {useAppSelector} from "./store/hooks.ts";
import Dashboard from "./pages/board/Dashboard.tsx";
import * as React from "react";
import VerifyEmailPage from "./pages/auth/verifyEmail.tsx";

function GuestRoute({ children }: { children: React.ReactNode }) {
    const token = useAppSelector((state) => state.auth.user);
    return token ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

function RequireAuth({ children }: { children: React.ReactNode }) {
    const token = useAppSelector((state) => state.auth.user);
    const location = useLocation();
    return token
        ? <>{children}</>
        : <Navigate to="/login" replace state={{ from: location }} />;
}

export default function App() {
  return (
    <Routes>
        <Route path="/login" element={<GuestRoute> <LoginPage /> </GuestRoute>} />
        <Route path="/register" element={<GuestRoute> <RegisterPage /> </GuestRoute>} />
        <Route path="/dashboard" element={<RequireAuth> <Dashboard /> </RequireAuth>} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="*" element={<RequireAuth> <Navigate to="/dashboard" replace /> </RequireAuth>}></Route>
    </Routes>
  );
}