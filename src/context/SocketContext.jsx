
import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket'

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    // thedestroy
    // const { socket, online } = useSocket('https://api.teacontenidos.com/');
    // compa
    // const { socket, online } = useSocket('https://api.huggo-scam.com/');
    // ronny
    // const { socket, online } = useSocket('https://api.ipeach.co/');
    const { socket, online } = useSocket('https://api.pithecus.co');

    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}