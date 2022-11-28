import { Transition } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/20/solid';
import React, { useContext, useState } from 'react'
import { ScamContext } from '../../context/ScamContext';

export const Checkbox = ({options}) => {
    const { filteredType, setFilteredType } = useContext(ScamContext);
    const [show, setShow] = useState(false);
    const [close, setClose] = useState(false);

    // Filtra los datos
    const checkedFilteredAction = ({value, checking}) => {

        // Cuando hace check, revisa si el valor esta en filteredType, caso contrario lo agrega
        if(checking) return filteredType.includes(value) == false ? setFilteredType([...filteredType, value]) : null;
        
        // TODO: ARREGLAR BUG QUE OCASIONA QUE EL 2DO QUITA EL VALOR INICIAL DE USESTATE
        if(filteredType.length === 0 || filteredType.length === 1  ) return setFilteredType(['Todos']);
        
        // En caso de descheck, quita el valor
        return setFilteredType((e) => e.filter( data => data.includes(value) === false))
    }

    const handleToggleShow = () => {
        setClose( e => !e)
        setShow(e => !e)
    };

    return (
        <div className='relative' style={{zIndex: '1000000'}}>

            <button 
                    onClick={() => handleToggleShow()} 
                    className={close == false ? 'bg-[#61aefc] transition-all duration-200 px-5 text-white py-[5px] rounded' : 'bg-red-600 transition-all duration-200 px-5 text-white py-[5px] rounded' }
            >
                Filtro: {filteredType.join(' - ')} {close == true && <XCircleIcon className='inline w-4' />}
            </button>
            <Transition
                show={show}
                enter="transition-all duration-150"
                enterFrom="opacity-0 scale-50"
                enterTo="opacity-100 scale-100"
                leave="transition-all duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-50"
            >
                <div className='absolute'>
                    <div 
                        className='flex flex-col gap-4 bg-white px-5 py-3 shadow border-[1px] rounded mt-3 w-60'
                    >
                        <p className='border-b-2 border-gray-200 pb-2'>Filtra los datos de la tabla</p>
                        {options?.map(({name}, i) => (
                            <div key={i} className='flex justify-start gap-1'>
                                <input 
                                    type="checkbox" 
                                    value={name}
                                    onClick={(e) => checkedFilteredAction({value: e.target.value, checking: e.target.checked})}
                                    id={i}
                                    defaultChecked={filteredType.includes(name) ? true : false}
                                    className={' checked:bg-red-100 border-2 w-4'}
                                />
                                <label className='w-full text-sm' htmlFor={i}>{name}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </Transition>
        </div>
    )
}
