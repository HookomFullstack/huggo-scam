
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

    const [deleteActive, setDeleteActive] = useState(0);

    const [ filteredType, setFilteredType] = useState(['Todos'])

    // TODO: RECUERDA MANTENER LA NOTIFICACION AL AGREGAR UN USUARIO EN EL BANCO SELECCIONADO
    const [notification, setNotification] = useState(false);


    const filterUsers = () => {
        if(filteredType.length > 1 ) {
            let arrData = options.tableFiltersOptions.map( e => filteredType.includes(e.name) ? e.nameServer : '' ).filter(e => e != '').flat()
            const usersFiltered = usersAll?.filter( 
                user => 
                    Object.keys(user)
                        .map( data => arrData.includes(data))
                        .filter( e => e === true).length === arrData.length
                    && user.name === selected 
                )

            usersFiltered.length !== 0 && setUsers(usersFiltered);
        };
        
        if(filteredType.length == 1 && selected != undefined) {
            const userFiltered = usersAll.filter( e => e.name === selected )
            setUsers(userFiltered)
        }
    }

    
    // Obtiene todos los usuarios
    useEffect(() => {

        socket.on('[User] emitAll', (usuarios) => {
            setUsers(usuarios)
            setUsersAll(usuarios)
        })
        
        return () => {
            socket.off('[User] emitAll')
        }
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
    }, [socket])

    // Mantiene constancia en el selected
    useEffect(() => {
        
        if(scamName.length === 1) setSelected( scamName[0] )
        if(scamName.length > 1 && selected == undefined ) setSelected( scamName[0] ) 

    }, [scamName]);

    // Obtiene el valor de los nombre de los scams para los selects
    useMemo(() => {

        if ( usersAll.length >= 1 ) {
            const result = usersAll.reduce((acc,item)=>{
                if(!acc.includes(item?.name)){
                    acc.push(item?.name);
                }
                return acc;
            }, [])
            
            if((result.length != scamName.length || scamName == false) == true) {
                return setScamName(result);
            }
        
        }
    }, [usersAll])

    // Agrega un nuevo usuario
    useEffect(() => {
        socket.on('(Usuario) nuevoUsuario', (usuario) => {
            
            let existUpdate = false;

            const newUsersAll = usersAll.map(e => {
                if(e._id === usuario._id){
                    existUpdate = true
                    return e = usuario;
                }
                return e;
            })
            
            if(existUpdate === false ) {
                console.log('entro')
                setUsersAll([...usersAll, usuario])
                if(selected == usuario.name) {
                    setNotification(true)
                    const userFiltered = usersAll.filter( e => e.name === selected )
                    setUsers(userFiltered)
                }

                filterUsers();
                
                return 
            };
            
            setUsersAll(newUsersAll) 
            
            if(selected == usuario.name) {
                const userFiltered = usersAll.filter( e => e.name === selected )
                setNotification(true)
                setUsers(userFiltered)
            }

            filterUsers();
            return
        });   

        return () => {
            socket.off('(Usuario) nuevoUsuario')
        }
    }, [selected, usersAll]);
    

    useEffect(() => {
        
        if(selected != undefined) {
            const userFiltered = usersAll.filter( e => e.name === selected )
            setUsers(userFiltered)
            filterUsers();
        }

        if(selected == undefined) setUsers([])

    }, [selected, usersAll, filteredType]);

    useEffect(() => {
        
        if(selected === undefined) setScamName([])

    }, [selected]);

    useEffect(() => {


        if (deleteActive === 1) {
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
            setDeleteActive(0)
        }
        
        if(typeof deleteActive == 'object' ) {
            const { _id } = deleteActive 

            socket.emit('[User] delete', {_id})
            const arrDeleteUser = usersAll.filter(user => user._id !== _id )
            setUsersAll(arrDeleteUser)
            setDeleteActive(0)
        }
    
        return () => {
            socket.off('[User] deleteAll')
            socket.off('[User] delete')
        }
        
    }, [socket,  deleteActive]);


    return (
        <ScamContext.Provider value={{ 
            scamName, 
            selected, 
            setSelected,
            users,
            filteredType, 
            setFilteredType,
            setDeleteActive,
            notification,
            setNotification
        }}>
            { children }
        </ScamContext.Provider>
    )
}