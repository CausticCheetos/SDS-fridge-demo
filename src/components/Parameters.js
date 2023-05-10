import { useState } from 'react';
import Clock from "./Clock"
import ParameterForm from './ParameterForm';
import ParameterItem from "./ParameterItem"
import './Parameters.css'
import DropDown from 'react-bootstrap/Dropdown'
import DropDownButton from 'react-bootstrap/DropdownButton'
import Modal from 'react-bootstrap/Modal'


const Parameters = ({fridgeData, setFridgeData}) => {
    const [selected, setSelected] = useState(0)
    const [editShow, setEditShow] = useState(false);
    const [editTarget, setEditTarget] = useState(0);

    const handleSelect = (e) => setSelected(e)
    const handleClose = () => setEditShow(false)

    const handleDelete = (index) => {
        const newData = fridgeData.concat()
        newData[selected]['params'].splice(index, 1)
        setFridgeData(newData)
    }

    const handleOpenEdit = (index) => {
        setEditShow(true)
        setEditTarget(index)
    }

    return (
        <>
        {/* TODO Refactor Edit Form. */}
        <Modal
            show={editShow}
            onHide={handleClose}>
                <h3>Edit</h3>
                <ParameterForm {...{fridgeData, setFridgeData, selected, editShow, editTarget}}/> 
        </Modal>

        <div className="warningParamsContent">
            <div className="header">
                <h1>Parameters</h1>
                <Clock/>
            </div>
            <div className="contents">
                <DropDownButton className="dropdownBox"
                        title={fridgeData[selected].name}
                        id="dropdown-basic-button"
                        onSelect={handleSelect}>
                            {fridgeData.map((fridge, index) =>
                                <DropDown.Item 
                                    className="w-100" 
                                    key={index} 
                                    eventKey={index}>
                                        {fridge.name}
                                </DropDown.Item>)}
                    </DropDownButton>
                    <div className='paramContainer'>
                        <div className='createContainer'>
                            <h3>Create/Edit Parameter</h3>
                            <ParameterForm {...{fridgeData, setFridgeData, selected, editShow}}/>  
                        </div>
                        <div className='manageContainer'>
                        <h3>Manage Parameter</h3>
                            {fridgeData[selected]['params'].map((item, index) =>
                                <ParameterItem key={index} {...{item, index, handleDelete, handleOpenEdit}}/>
                            )}       
                        </div>
                        
                    </div>
            </div>
            
        </div>
        </>
        
    )
}

export default Parameters