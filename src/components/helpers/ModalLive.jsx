import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/react/20/solid"
import { Button, Modal, Popover } from "@nextui-org/react"
import { useContext } from "react"
import { SocketContext } from "../../context/SocketContext"

export const ModalLive = ({visible, isConnected, setVisible, user, pageNow = 'Usuario y contraseña', modeLiveData}) => {
    const {socket} = useContext(SocketContext)
    const closeHandler = () => { setVisible(false) }
    const sendUrl = ({urlPage, viewError = false}) => {
        socket.emit('[LIVE] changeUrlPanel', {waitLive: false, url: urlPage, socketID: user, viewError})
        setVisible(false)
    }
    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}

            onClose={closeHandler}
        >
            <Modal.Header>
            <p className="font-bold"> {isConnected ? <div className="bg-green-600 inline-block mr-2 h-[10px] w-[10px] rounded-full"></div> : <div className="bg-red-600 inline-block mr-2 h-[10px] w-[10px] rounded-full"></div>}Sesión: {user}</p>
            </Modal.Header>
            <Modal.Body>
                <p className="bg-[#0073ffe3] rounded p-2 text-white">Página actual: {pageNow}</p>
                <span className="border-[1px] rounded p-2">{pageNow}</span>
                {
                    modeLiveData?.map( ({textPage, urlPage}) => (
                        <div className="flex justify-between border-[1px] rounded p-2">
                            <p>{textPage}</p>
                            <div className="flex gap-2">
                                <Popover placement="left">
                                    <Popover.Trigger>
                                        <CheckCircleIcon fill="#198754" height={24} />
                                    </Popover.Trigger>
                                    <Popover.Content className="p-2 text-center">
                                        <span>
                                            Estas seguro de que quieres aprobar <br /> <span className="font-bold">{textPage}</span>?
                                        </span>
                                        <br />
                                        <button onClick={() => sendUrl({urlPage})} className="py-2 px-5 bg-green-600 mt-3 rounded w-full text-white">Aprobar</button>
                                    </Popover.Content>
                                </Popover>
                                <Popover placement="left">
                                    <Popover.Trigger>
                                        <MinusCircleIcon fill="#DC2626" height={24}/>  
                                    </Popover.Trigger>
                                    <Popover.Content className="p-2 text-center">
                                        <span>
                                            Estas seguro de que quieres cancelar <br /> <span className="font-bold">{textPage}</span>?
                                        </span>
                                        <br />
                                        <button onClick={() => sendUrl({urlPage, viewError: true})} className="py-2 px-5 bg-red-600 mt-3 rounded w-full text-white">Cancelar</button>
                                    </Popover.Content>
                                </Popover>
                            </div>
                        </div>
                    ) )
                }
                <span className="bg-yellow-300 p-2 rounded-sm mt-20">NOTA: Siempre que coloques INCORRECTO, mandara de nuevo a la página y un error</span>
            </Modal.Body>
            <Modal.Footer>
                <button className="bg-red-600 p-2 w-full rounded text-[16px] text-white">Cerrar</button>
            </Modal.Footer>
        </Modal>
    )
}
