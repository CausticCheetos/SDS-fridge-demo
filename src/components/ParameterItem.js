import {useState } from 'react';
import {IconPencil, IconTrash, IconExclamationCircle} from  '@tabler/icons-react'
import './ParameterItem.css'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ToggleButton from 'react-bootstrap/ToggleButton'

 const ParameterItem = ({data, index, handleDelete, handleOpenEdit}) => {
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
                        {data.name}
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    Description
                    <Row>
                        {data.description}
                    </Row>
                    <Row> Type</Row>
                    <Row>
                        {data.paramType}
                        {data.RTP}
                    </Row>
                    <Row>Range</Row>
                    <Row>
                        <Col>
                            Start
                        </Col>
                        <Col>
                            End
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {data.operator}
                        </Col>
                        <Col>
                            {data.range}
                        </Col>
                    </Row>
                    Treshold
                    <Row>
                        {data.threshold}
                    </Row>
                </Modal.Body>    
        </Modal>
        <div className='parentItem'>
            <div className='childItem'>
                {data.name} 
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
                <ToggleButton type='checkbox' variant='outline-primary' checked={data.toggle}>Toggle</ToggleButton>
            </div>
        </div>
        </>
    )
}

export default ParameterItem