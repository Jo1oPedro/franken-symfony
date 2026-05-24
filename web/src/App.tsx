import LoginPage from "./pages/auth/LoginPage.tsx";
import {Navigate, Route, Routes, useLocation} from "react-router";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import {useAppSelector} from "./store/hooks.ts";
import Dashboard from "./pages/board/Dashboard.tsx";

function GuestRoute({ children }: { children: React.ReactNode }) {
    const token = useAppSelector((state) => state.auth.token);
    console.log(token);
    return token ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

function RequireAuth({ children }: { children: React.ReactNode }) {
    const token = useAppSelector((state) => state.auth.token);
    const location = useLocation();
    return token
        ? <>{children}</>
        : <Navigate to="/login" replace state={{ from: location }} />;
}

import * as React from "react";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<GuestRoute> <LoginPage /> </GuestRoute>} />
      <Route path="/register" element={<GuestRoute> <RegisterPage /> </GuestRoute>} />
      <Route path="/dashboard" element={<RequireAuth> <Dashboard /> </RequireAuth>} />
    </Routes>
  );
}