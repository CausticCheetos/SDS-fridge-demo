import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import api from '../services/api'

const ParameterForm = ({data, setFridgeData, selected, editShow, editTarget,state,setState}) => {
    const [id, setId] = useState((i) => editShow ? data[editTarget]['_id'] : '');
    const [name, setName] = useState((i) => editShow ? data[editTarget]['name'] : '');
    const [description, setDescription] = useState((i) => editShow ? data[editTarget]['description'] : '');
    const [paramType, setParamType] = useState((i) => editShow ? data[editTarget]['paramType'] : 'Pressure 1');
    const [rangeStart, setRangeStart] = useState((i) => editShow ? data[editTarget]['start'] : '');
    const [rangeEnd, setRangeEnd] = useState((i) => editShow ? data[editTarget]['end'] : '');
    const [threshold, setThreshold] = useState((i) => editShow ? data[editTarget]['threshold'] : '');

    const handleName = (e) => setName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handleParamType = (e) => setParamType(e.target.value)
    const handleRangeStart = (e) => setRangeStart(e.target.value)
    const handleRangeEnd = (e) => setRangeEnd(e.target.value)
    const handleThreshold = (e) => setThreshold(e.target.value)
    
    //TODO prevent unexpected values
    const handleSubmit = async() => {
        const newParam = {
            name: name,
            description: description, 
            paramType: paramType,
            start: rangeStart,
            end: rangeEnd,
            threshold: threshold
        }
        if (!editShow) {
            await api.postParameters(newParam)
            setState(state+1)
        }
        else
        {
            console.log("Success!");
            await api.putParameters(newParam,id)
            setState(state+1)
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
            <h6>Threshold</h6>
            <Form.Control className="createParam" onChange={handleThreshold} type="number" value={threshold} placeholder="Pass threshold in a row"/>
            <button className='createButton' onClick={handleClear}>Clear</button>
            <button className='createButton' type='submit' onClick={handleSubmit}>Confirm</button>
        </Form>
    )
}

export default ParameterForm