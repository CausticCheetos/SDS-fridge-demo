import { useState } from 'react';
import Clock from "./Clock"
import ParameterItem from "./ParameterItem"
import './Parameters.css'
import DropDown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import DropDownButton from 'react-bootstrap/DropdownButton'

const Parameters = ({fridgeData, setFridgeData}) => {
    const [selected, setSelected] = useState(0)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [paramType, setParamType] = useState("Pressure");
    const [rangeStart, setRangeStart] = useState('');
    const [rangeEnd, setRangeEnd] = useState('');

    const handleSelect = (e) => setSelected(e)

    const handleName = (e) => setName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handleParamType = (e) => setParamType(e.target.value)
    const handleRangeStart = (e) => setRangeStart(e.target.value)
    const handleRangeEnd = (e) => setRangeEnd(e.target.value)

    //TODO prevent unexpected values
    const handleSubmit = () => {
        const newData = fridgeData.concat()
        newData[selected].params.push([name, description, paramType, rangeStart, rangeEnd])
        setFridgeData(newData)
    }

    const handleClear = () => {
        setName('');
        setDescription('');
        setRangeStart('');
        setRangeEnd('');
    }

    const handleInfo = (item) => {
        console.log(item[0]);
    }

    const handleDelete = (index) => {
        const newData = fridgeData.concat()
        newData[selected]['params'].splice(index, 1)
        setFridgeData(newData)
    }

    return (
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
                            <Form onSubmit={(e) => e.preventDefault()}>
                                <h6>Param. Name</h6>
                                <Form.Control className="createParam" onChange={handleName} value={name} placeholder="Name"/>
                                <h6>Param. Description</h6>
                                <Form.Control className="createParam" onChange={handleDescription} value={description} placeholder="Description"/>
                                <h6>Param. Name</h6>
                                <Form.Select className="createParam" onChange={handleParamType}>
                                    <option>Pressure 1</option>
                                    <option>Pressure 2</option>
                                </Form.Select>
                                <h6>Acceptable Range</h6>
                                <div style={{display: "flex"}}>
                                <Form.Control className="createParamRange" onChange={handleRangeStart} value={rangeStart} placeholder="Start"/>
                                 - 
                                <Form.Control className="createParamRange" onChange={handleRangeEnd} value={rangeEnd} placeholder="End"/>
                                </div>
                                <button className='createButton' onClick={handleClear}>Clear</button>
                                <button className='createButton' type='submit' onClick={handleSubmit}>Confirm</button>
                            </Form>     
                        </div>
                        <div className='manageContainer'>
                        <h3>Manage Parameter</h3>
                            {fridgeData[selected]['params'].map((item, index) =>
                                <ParameterItem {...{item, index, handleInfo, handleDelete}}/>
                            )}       
                        </div>
                        
                    </div>
            </div>
            
        </div>
        
    )
}

export default Parameters