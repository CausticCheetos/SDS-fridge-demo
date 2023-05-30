import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import api from '../services/api'

const ParameterForm = ({data, setFridgeData, selected, editShow, editTarget,state,setState}) => {
    const [name, setName] = useState((i) => editShow ? data[editTarget]['name'] : '');
    const [description, setDescription] = useState((i) => editShow ? data[editTarget]['description'] : '');
    const [paramType, setParamType] = useState((i) => editShow ? data[editTarget]['paramType'] : 'Pressure 1');
    const [operator, setOperator] = useState((i) => editShow ? data[editTarget]['operator'] : '=');
    const [range, setRange] = useState((i) => editShow ? data[editTarget]['range'] : '');
    const [threshold, setThreshold] = useState((i) => editShow ? data[editTarget]['threshold'] : '');
    const [RTP, setRTP] = useState((i) => editShow ? data[editTarget]['RTP'] : 'resistance');

    const handleName = (e) => setName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handleParamType = (e) => setParamType(e.target.value)
    const handleOperator = (e) => setOperator(e.target.value)
    const handleRange = (e) => setRange(e.target.value)
    const handleThreshold = (e) => setThreshold(e.target.value)
    const handleRTP = (e) => setRTP(e.target.value)
    
    //TODO prevent unexpected values
    const handleSubmit = async() => {
        const newParam = {
            name: name,
            description: description, 
            paramType: paramType,
            RTP: RTP,
            operator: operator,
            range: range,
            threshold: threshold
        }
        if (!editShow) {
            await api.postParameters(newParam)
            setState(state+1)
        }
        else
        {
            console.log("Success!");
        }
        
    }

    const handleClear = () => {
        setName('');
        setDescription('');
        setParamType('Pressure 1')
        setOperator('=');
        setRTP('Resistance');
        setRange('');
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
            <Form.Select className="createParam" onChange={handleRTP} value={RTP}>
                <option>resistance</option>
                <option>power</option>
                <option>temperature</option>
                <option>null</option>
            </Form.Select>
            <h6>Acceptable Range</h6>
            <div style={{display: "flex"}}>
            <Form.Select className="createParam" onChange={handleOperator} value={operator}>
                <option>=</option>
                <option>{'>'}</option>
                <option>{'<'}</option>
            </Form.Select>
            {/* <Form.Control className="createParamRangeL" onChange={handleRangeStart} value={rangeStart} placeholder="Start"/> */}
            <Form.Control className="createParamRangeR" onChange={handleRange} value={range} placeholder="Range"/>
            </div>
            <h6>Threshold</h6>
            <Form.Control className="createParam" onChange={handleThreshold} type="number" value={threshold} placeholder="Pass threshold in a row"/>
            <button style={{marginRight: 5}} className='createButton' onClick={handleClear}>Clear</button>
            <button style={{marginLeft: 5}} className='createButton' type='submit' onClick={handleSubmit}>Confirm</button>
        </Form>
    )
}

export default ParameterForm