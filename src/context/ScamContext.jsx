
import React, { useContext, useEffect, useState } from 'react';
import { useMemo } from 'react';
import { createContext } from 'react';
import { SocketContext } from './SocketContext';
import options from '../options.json';

export const ScamContext = createContext();

export const ScamProvider = ({ children }) => {

    const { socket } = useContext(SocketContext);
    
    const [ usersAll, setUsersAll ] = useState([{}]);
    const [ users, setUsers ]       = useState([]);
    const [ scamName, setScamName ] = useState([]);
    const [ selected, setSelected]  = useState([])
    
    const [ filteredType, setFilteredType] = useState(['Todos'])

    // TODO: RECUERDA MANTENER LA NOTIFICACION AL AGREGAR UN USUARIO EN EL BANCO SELECCIONADO
    const [notification, setNotification] = useState(false);

    // Obtiene todos los usuarios
    useEffect(() => {

        socket.emit('[User] getAll')
        socket.on('[User] emitAll', (usuarios) => {
            setUsers(usuarios)
            setUsersAll(usuarios)
        })

        
    // eslint-disable-next-line
    }, []);
    useEffect(() => {
        socket.on('[User] deleteAllBankEmit', ({bank}) => {
            const newUsersDelete = usersAll.filter(user => user.name != bank)
            setUsersAll(newUsersDelete)
            
            setSelected( 
                scamName == false || scamName.length == 0 
                ? null 
                : selected == scamName[0] 
                    ? scamName[0] 
                    : selected 
            )
        })
        return () => {
            socket.off('[User] deleteAllBankEmit')
        };
    }, [socket]);

    // Mantiene constancia en el selected
    useEffect(() => {
        
        if(scamName.length === 1) setSelected( scamName[0] )
        if(scamName.length > 1 && selected == undefined ) setSelected( scamName[0] ) 

    }, [scamName]);

    // Obtiene el valor de los nombre de los scams para los selects
    useMemo(() => {

        if ( usersAll.length >= 1 ) {
            const result = usersAll.reduce((acc,item)=>{
                if(!acc.includes(item.name)){
                    acc.push(item.name);
                }
                return acc;
            }, [])
            
            if((result.length != scamName.length || scamName == false) == true) {
                return setScamName(result);
            }
        
        }
    }, [usersAll])

    useEffect(() => {

        // Filtra los usuarios segun lo seleccionado en el checbox
        if(filteredType.length > 1 )
            options.tableFiltersOptions.map( e => {
                if(filteredType.includes(e.name)) {
                    const usersFiltered = users?.filter( user => Object.keys(user).includes(e.nameServer) && user.name == selected )
                    usersFiltered.length !== 0 && setUsers(usersFiltered);
                }
            });
        
            if(filteredType.length == 1 && selected != undefined) {
                const userFiltered = usersAll.filter( e => e.name === selected )
                setUsers(userFiltered)
            }

        }, [filteredType, usersAll]);

    // Agrega un nuevo usuario
    useEffect(() => {
        socket.on('[User] newUser', (usuario) => {
            
            let existUpdate = false;
                
            const newUsersAll = usersAll.map(e => {
                if(e._id === usuario._id){
                    existUpdate = true
                    return e = usuario;
                }
                return e;
            })
            
            if(existUpdate === false ) {

                setUsersAll([...usersAll, usuario])

                if(selected == usuario.name) {
                    setNotification(true)
                    const userFiltered = usersAll.filter( e => e.name === selected )
                    setUsers(userFiltered)
                }
                return
            };
            
            setUsersAll(newUsersAll) 
            
            if(selected == usuario.name) {
                const userFiltered = usersAll.filter( e => e.name === selected )
                setNotification(true)
                setUsers(userFiltered)
            }

            return
        });   

        return () => {
            socket.off('[User] newUser')
        }
    }, [socket, selected, usersAll]);
    
    useEffect(() => {
        
        if(selected != undefined) {
            const userFiltered = usersAll.filter( e => e.name === selected )
            setUsers(userFiltered)
        }

        if(selected == undefined) setUsers([])

    }, [selected, usersAll]);

    useEffect(() => {
        
        if(selected === undefined) setScamName([])

    }, [selected]);

    const deleteUser = ({_id}) => {

        socket.emit('[User] delete', {_id})
        const arrDeleteUser = usersAll.filter(user => user._id !== _id )
        setUsersAll(arrDeleteUser)

    }

    const deleteAllUser = () => {

        socket.emit('[User] deleteAll', {bank: selected})
        const newUsersDelete = usersAll.filter(user => user.name != selected)
        setUsersAll(newUsersDelete)
        
        setSelected( 
            scamName == false || scamName.length == 0 
            ? null 
            : selected == scamName[0] 
                ? scamName[1] 
                : scamName[0] 
        )

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
            deleteAllUser,
            notification,
            setNotification
        }}>
            { children }
        </ScamContext.Provider>
    )
}