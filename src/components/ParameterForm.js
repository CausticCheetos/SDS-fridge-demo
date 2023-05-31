import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import api from '../services/api'

const ParameterForm = ({data, setFridgeData, selected, editShow, editTarget,state,setState,emailList, smsList,handleEmailClear,handleSmsClear}) => {
    const [id] = useState((i) => editShow ? data[editTarget]['_id'] : '');
    const [toggle] = useState((i) => editShow ? data[editTarget]['toggle'] : '');
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
            threshold: threshold,
            toggle: toggle,
            emailList: emailList,
            smsList: smsList
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
        setParamType('p1')
        setOperator('=');
        setRTP('resistance');
        setRange('');
        setThreshold('');

    }   

    return (
        <Form onSubmit={(e) => e.preventDefault()}>
            <h6>Param. Name</h6>
            <Form.Control className="createParam" onChange={handleName} value={name} placeholder="Name"/>
            <h6>Param. Description</h6>
            <Form.Control className="createParam" onChange={handleDescription} value={description} placeholder="Description"/>
            <h6>Param. Type</h6>
            <Form.Select className="createParam" onChange={handleParamType} value={paramType}>
                <option>p1</option>
                <option>p2</option>
                <option>p3</option>
                <option>p4</option>
                <option>p5</option>
                <option>p6</option>
                <option>scroll1</option>
                <option>scroll2</option>
                <option>turbo1</option>
                <option>turbo2</option>
                <option>pulsetube</option>
                <option>hs-still</option>
                <option>hs-mc</option>
                <option>ext</option>
                <option>compressor</option>
                <option>v1</option>
                <option>v2</option>
                <option>v3</option>
                <option>v4</option>
                <option>v5</option>
                <option>v6</option>
                <option>v7</option>
                <option>v8</option>
                <option>v9</option>
                <option>v10</option>
                <option>v11</option>
                <option>v12</option>
                <option>v13</option>
                <option>v14</option>
                <option>v15</option>
                <option>v16</option>
                <option>v17</option>
                <option>v18</option>
                <option>v19</option>
                <option>v20</option>
                <option>v21</option>
                <option>v22</option>
                <option>v23</option>
                <option>flow</option>
                <option>channel1</option>
                <option>channel2</option>
                <option>channel3</option>
                <option>channel4</option>
                <option>channel5</option>
                <option>channel6</option>
                <option>channel7</option>
                <option>channel8</option>
                <option>warning_state</option>
                <option>warning_state_text</option>
                <option>alarm_state</option>
                <option>alarm_state_text</option>
                <option>coolant_in_temperature1</option>
                <option>coolant_out_temperature</option>
                <option>oil_temperature</option>
                <option>helium_temperature</option>
                <option>low_pressure</option>
                <option>low_pressure_average</option>
                <option>high_pressure</option>
                <option>high_pressure_average</option>
                <option>delta_pressure_average</option>
                <option>motor_current</option>
                <option>turbo1.active_rotational_speed</option>
                <option>turbo1.drive_power</option>
                <option>turbo1.driver_temperature_too_high</option>
                <option>turbo1.pump_temperature_too_high</option>
                <option>turbo1.pump_accelerates</option>
                <option>turbo1.rotation_speed_switch_point_attained</option>
                <option>turbo1.setting_speed_attained</option>
                <option>turbo2.active_rotational_speed</option>
                <option>turbo2.drive_power</option>
                <option>turbo2.driver_temperature_too_high</option>
                <option>turbo2.pump_temperature_too_high</option>
                <option>turbo2.pump_accelerates</option>
                <option>turbo2.rotation_speed_switch_point_attained</option>
                <option>turbo2.setting_speed_attained</option>
                <option>stillenabled</option>
                <option>sampleenabled</option>
                <option>stilloutput_power</option>
                <option>sampleoutput_power</option>
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
            <button style={{marginLeft: 5}} className='createButton' type='submit' onClick={() => {handleSubmit(); handleClear(); handleSmsClear(); handleEmailClear()}}>Confirm</button>
        </Form>
    )
}

export default ParameterForm