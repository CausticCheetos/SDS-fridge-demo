import {useState } from 'react';
import {IconPencil, IconTrash, IconExclamationCircle} from  '@tabler/icons-react'
import './ParameterItem.css'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

 const EmailItem = ({data, index, handleDelete, handleOpenEdit}) => {
    const [infoShow, setInfoShow] = useState(false);
    const handleClose = () => {setInfoShow(false)}
    const handleInfo = () => setInfoShow(true)
    console.log(data);
    return (
        <>
        <Modal
            show={infoShow}
            onHide={handleClose}>
                <Modal.Header>
                    <h4>
                        {data.EmailAddress}
                    </h4>
                </Modal.Header>
                <Modal.Body/>    
        </Modal>
        <div className='parentItem'>
            <div className='childItem'>
            </div>
            <div className='itemButtons'>
                <button className='paramButton' onClick={() => handleOpenEdit(index, data)}>
                    <IconPencil/>
                </button>
                <button className='paramButton' onClick={() => handleDelete(index,data)}>
                    <IconTrash/>
                </button>
                <button className='paramButton' onClick={handleInfo}>
                    <IconExclamationCircle/>
                </button>
            </div>
        </div>
        </>
    )
}

export default EmailItem