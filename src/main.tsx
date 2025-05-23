import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LoginProvider } from './components/LoginProvider.tsx';
createRoot(document.getElementById('root')!).render(
 
    <LoginProvider>
    <App />
    </LoginProvider>

);
