import { useEffect, useState } from 'react';
import Button from "./components/Button.tsx";

const API_URL = import.meta.env.VITE_API_URL ?? 'http://api.localhost';

export default function App() {
  const [status, setStatus] = useState<string>('checking...');

  useEffect(() => {
    fetch(`${API_URL}/`)
      .then((r) => setStatus(`API responded ${r.status}`))
      .catch((e) => setStatus(`API unreachable: ${e.message}`));
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
      <div className="max-w-md p-8 rounded-2xl bg-slate-900 shadow-xl border border-slate-800">
        <h1 className="text-2xl font-semibold mb-2">symfony-react</h1>
        <p className="text-slate-400 text-sm mb-4">React + Vite + Tailwind</p>
        <p className="text-sm">
          <span className="text-slate-400">API:</span>{' '}
          <span className="font-mono">{status}</span>
        </p>
      </div>
      <Button />
    </main>
  );
}
