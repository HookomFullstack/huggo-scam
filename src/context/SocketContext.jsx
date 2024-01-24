
import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket'

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    // const { socket, online } = useSocket('http://localhost:3001/');
    // thedestroy

    // const { socket, online } = useSocket('https://api.teacontenidos.com/');
    // compa
    // const { socket, online } = useSocket('https://api.huggo-scam.com/');
    // ronny
    const { socket, online } = useSocket('http://localhost:3002');
    // const { socket, online } = useSocket('https://api.pithecus.co');

    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}