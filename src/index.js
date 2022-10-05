import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import ReactDOM from 'react-dom/client';
import { SocketProvider } from './context/SocketContext';
import { App } from './App';
import { ScamProvider } from './context/ScamContext';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <SocketProvider>
        <NextUIProvider>
            <ScamProvider>
                <App />
            </ScamProvider>
        </NextUIProvider>
    </SocketProvider>
);

