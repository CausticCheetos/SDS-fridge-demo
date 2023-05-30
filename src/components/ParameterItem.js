import {useState } from 'react';
import {IconPencil, IconTrash, IconExclamationCircle} from  '@tabler/icons-react'
import './ParameterItem.css'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ToggleButton from 'react-bootstrap/ToggleButton'
import api from '../services/api'

 const ParameterItem = ({data, index, handleDelete, handleOpenEdit,state,setState}) => {
    const [infoShow, setInfoShow] = useState(false);
    const handleClose = () => {setInfoShow(false)}
    const handleInfo = () => setInfoShow(true)

    const handleToggle = () => {
        const newParam = {
            toggle: data.toggle
        }
        api.toggle(newParam,data._id)
        setState(state+1)
    }

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
                    <Row>
                        <h5 style={{padding: 0}}>Description</h5>
                        {data.description}
                    </Row>
                    <Row>
                        <h5 style={{padding: 0}}>Type</h5>
                        {data.paramType} <br/>
                        {data.RTP}
                    </Row>
                    <Row>
                    <h5 style={{padding: 0}}>Acceptable Range</h5>
                        <Col style={{padding: 0}}>
                            <h6 style={{padding: 0}}>Operator</h6>
                        </Col>
                        <Col>
                        <h6 style={{padding: 0}}>Range</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{padding: 0}}>
                            {data.operator}
                        </Col>
                        <Col>
                            {data.range}
                        </Col>
                    </Row>

                    <Row>
                    <h5 style={{padding: 0}}>Threshold</h5>
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
                <ToggleButton type='checkbox' variant='outline-primary' checked={data.toggle} onClick = {handleToggle}>Toggle</ToggleButton>
            </div>
        </div>
        </>
    )
}

export default ParameterItem