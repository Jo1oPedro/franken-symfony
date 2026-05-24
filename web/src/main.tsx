import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import {BrowserRouter} from "react-router";
import {Provider} from "react-redux";
import {store} from "./store";
import {AuthInitializer} from "./components/auth/AuthInitializer.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <AuthInitializer>
                <App />
            </AuthInitializer>
        </BrowserRouter>
    </Provider>
  </StrictMode>,
);
