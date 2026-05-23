import { useEffect, useState } from 'react';
import Button from "./components/Button.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";

const API_URL = import.meta.env.VITE_API_URL ?? 'http://api.localhost';

export default function App() {
  const [status, setStatus] = useState<string>('checking...');

  useEffect(() => {
    fetch(`${API_URL}/`)
      .then((r) => setStatus(`API responded ${r.status}`))
      .catch((e) => setStatus(`API unreachable: ${e.message}`));
  }, []);

  return (
    <>
      <LoginPage />
    </>
  );
}
