import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import api from '../services/api'

const ParameterForm = ({fridgeData, setFridgeData, selected, editShow, editTarget}) => {
    const [name, setName] = useState((i) => editShow ? fridgeData[selected]['params'][editTarget]['name'] : '');
    const [description, setDescription] = useState((i) => editShow ? fridgeData[selected]['params'][editTarget]['description'] : '');
    const [paramType, setParamType] = useState((i) => editShow ? fridgeData[selected]['params'][editTarget]['paramType'] : 'Pressure 1');
    const [rangeStart, setRangeStart] = useState((i) => editShow ? fridgeData[selected]['params'][editTarget]['start'] : '');
    const [rangeEnd, setRangeEnd] = useState((i) => editShow ? fridgeData[selected]['params'][editTarget]['end'] : '');

    const handleName = (e) => setName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handleParamType = (e) => setParamType(e.target.value)
    const handleRangeStart = (e) => setRangeStart(e.target.value)
    const handleRangeEnd = (e) => setRangeEnd(e.target.value)
    
    //TODO prevent unexpected values
    const handleSubmit = async() => {
        const newData = fridgeData.concat()
        const newParam = {
            name: name,
            description: description, 
            paramType: paramType,
            start: rangeStart,
            end: rangeEnd}
        if (!editShow) {
            newData[selected].params.push(newParam)
            setFridgeData(newData)
            await api.postParameters(newParam)
        }
        else
        {
            newData[selected]['params'][editTarget] = newParam
            console.log("Success!");
        }
        
    }

    const handleClear = () => {
        setName('');
        setDescription('');
        setParamType('Pressure 1')
        setRangeStart('');
        setRangeEnd('');
    }

    return (
        <Form onSubmit={(e) => e.preventDefault()}>
            <h6>Param. Name</h6>
            <Form.Control className="createParam" onChange={handleName} value={name} placeholder="Name"/>
            <h6>Param. Description</h6>
            <Form.Control className="createParam" onChange={handleDescription} value={description} placeholder="Description"/>
            <h6>Param. Type</h6>
            <Form.Select className="createParam" onChange={handleParamType} value={paramType}>
                <option>Pressure 1</option>
                <option>Pressure 2</option>
            </Form.Select>
            <h6>Acceptable Range</h6>
            <div style={{display: "flex"}}>
            <Form.Control className="createParamRangeL" onChange={handleRangeStart} value={rangeStart} placeholder="Start"/>
            <Form.Control className="createParamRangeR" onChange={handleRangeEnd} value={rangeEnd} placeholder="End"/>
            </div>
            <button className='createButton' onClick={handleClear}>Clear</button>
            <button className='createButton' type='submit' onClick={handleSubmit}>Confirm</button>
        </Form>
    )
}

export default ParameterForm