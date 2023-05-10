import { useState } from 'react';
import {IconPencil, IconTrash, IconExclamationCircle} from  '@tabler/icons-react'
import './ParameterItem.css'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ParameterItem = ({item, index, handleDelete, handleOpenEdit}) => {
    const [infoShow, setInfoShow] = useState(false);

    const handleClose = () => {setInfoShow(false)}
    const handleInfo = () => setInfoShow(true)


    return (
        <>
        <Modal
            show={infoShow}
            onHide={handleClose}>
                <Modal.Header>
                    <h4>
                        {item.name}
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        {item.description}
                    </Row>
                    <Row>
                        {item.paramType}
                    </Row>
                    <Row>
                        <Col>
                            {item.start}
                        </Col>
                        <Col>
                            {item.end}
                        </Col>
                    </Row>
                </Modal.Body>    
        </Modal>
        <div className='parentItem'>
            <div className='childItem'>
                {item.name} 
            </div>
            <div className='itemButtons'>
                <button className='paramButton' onClick={() => handleOpenEdit(index)}>
                    <IconPencil/>
                </button>
                <button className='paramButton' onClick={() => handleDelete(index)}>
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

export default ParameterItem