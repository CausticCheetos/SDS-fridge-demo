import {useState } from "react"
import {IconSquareRoundedPlusFilled, IconSquareRoundedMinus} from  '@tabler/icons-react'
import Graph from './Graph'
import Form from 'react-bootstrap/Form'
import './DataVisualisation.css'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';


const DataVisualisation = () => {
    const [graphCount, setGraphCount] = useState(0)
    const [rangeValues, setRangeValues] = useState([['','','','']])
    const [channels, setChannels] = useState([])
    const [selectedChannel, setSelectedChannel] = useState(['Channel', 'Channel'])
    const [filter, setFilter] = useState([[
        {
            dataName: "power",
            dataState: false,
            colour: '#8884d8'
        },
        {
            dataName: "resistance",
            dataState: false,
            colour: '#387780'
        },
        {
            dataName: "temperature",
            dataState: false,
            colour: '#E83151'
        }
    ]])

    const [filter2, setFilter2] = useState([[
        {
            dataName: "power",
            dataState: false,
            colour: '#8884d8'
        },
        {
            dataName: "resistance",
            dataState: false,
            colour: '#387780'
        },
        {
            dataName: "temperature",
            dataState: false,
            colour: '#E83151'
        }
    ]])

    const handleAdd = () => {
        setFilter(current => [...current, [
            {
                dataName: "power",
                dataState: false,
                colour: '#8884d8'
            },
            {
                dataName: "resistance",
                dataState: false,
                colour: '#387780'
            },
            {
                dataName: "temperature",
                dataState: false,
                colour: '#E83151'
            }
        ]])
        setFilter2(current => [...current, [
            {
                dataName: "power",
                dataState: false,
                colour: '#8884d8'
            },
            {
                dataName: "resistance",
                dataState: false,
                colour: '#387780'
            },
            {
                dataName: "temperature",
                dataState: false,
                colour: '#E83151'
            }
        ]])
        setRangeValues(current => [...current, ['','']])
        setGraphCount(count => count + 1)
    }
    const handleRemove = () => {
        setRangeValues(current => [current.slice(0, -1)])
        setFilter(current => (current.slice(0, -1)))
        setFilter2(current => (current.slice(0, -1)))
        setGraphCount(count => count - 1)
    }

    const handleStart = (event, index) => {
        const newRange = rangeValues.concat()
        const start = event.target.value
        newRange[index] = [start, rangeValues[index][1], rangeValues[index][2], rangeValues[index][3]]
        setRangeValues(newRange)
    }

    const handleEnd = (event, index) => {
        const newRange = rangeValues.concat()
        const end = event.target.value
        newRange[index] = [rangeValues[index][0], end, rangeValues[index][2], rangeValues[index][3]]
        setRangeValues(newRange)
    }

    const handleTop = (event, index) => {
        const newRange = rangeValues.concat()
        const yEnd = event.target.value
        newRange[index] = [rangeValues[index][0], rangeValues[index][1], rangeValues[index][2], yEnd]
        setRangeValues(newRange)
    }

    const handleBottom = (event, index) => {
        const newRange = rangeValues.concat()
        const yStart = event.target.value
        newRange[index] = [rangeValues[index][0], rangeValues[index][1], yStart, rangeValues[index][2]]
        setRangeValues(newRange)
    }

    const handleSubmit = (e) => {
        console.log(rangeValues);
        if (e.key === "Enter") {
            console.log("Success!");
        }
    }

    const onChecked = (x, e) => {
        const newFilter = filter.concat();
        newFilter[x][e].dataState = !newFilter[x][e].dataState
        setFilter(newFilter)
    }

    const onChecked2 = (x, e) => {
        const newFilter = filter2.concat();
        newFilter[x][e].dataState = !newFilter[x][e].dataState
        setFilter2(newFilter)
    }

    const handleSelect = (e) => {setSelectedChannel([e, selectedChannel[1]])}

    const handleSelect2 = (e) => {setSelectedChannel([selectedChannel[0], e])}

    return (
        <div className="dataVisualisationContents">
            <div className="header">
                <h1>Data Visualisation</h1>
            </div>
            <div className='content'>
                <div className='graphHeader'>
                {graphCount > 0 && 
                    <button
                        onClick={() => handleRemove()}
                        className='addGraph'><IconSquareRoundedMinus/> Remove graph</button>}
                    <button 
                    onClick={() => handleAdd()}
                    className='addGraph'>
                        <IconSquareRoundedPlusFilled/> Add graph
                    </button>
                    <div className="filter">
                        <h3>Data Type</h3>
                        <div className="filterItem">
                            <h4>Left</h4>
                            <DropdownButton
                            title={selectedChannel[0].replace("channel", "Channel ")}
                            onSelect={handleSelect}>
                                {channels.map(channel => {
                                    return(
                                    <Dropdown.Item eventKey={channel}>{channel.replace("channel", "Channel ")}</Dropdown.Item>
                                )})}
                            </DropdownButton>

                            {filter[0].map((data, index) => 
                            <Form.Check 
                            label={data.dataName}
                            key={index}
                            checked={data.dataState}
                            onChange={() => onChecked(0, index)}/>
                            )}
                            <h4>Right</h4>
                            <DropdownButton
                            title={selectedChannel[1].replace("channel", "Channel ")}
                            onSelect={handleSelect2}>
                                {channels.map(channel => {
                                    return(
                                    <Dropdown.Item eventKey={channel}>{channel.replace("channel", "Channel ")}</Dropdown.Item>
                                )})}
                            </DropdownButton>

                            {filter2[0].map((data, index) => 
                            <Form.Check 
                            label={data.dataName}
                            key={index}
                            checked={data.dataState}
                            onChange={() => onChecked2(0, index)}/>
                            )}
                        </div>
                        <h3>Range</h3>
                        <div className="range">
                            <Form className="rangeForm"
                            onKeyDown={handleSubmit}>
                                <Form.Group className="rangeItem">
                                    <Form.Control name="start" type="datetime-local" step={1} onChange={(e) => handleStart(e, 0)} title="X Start"/>
                                </Form.Group>
                                <Form.Group className="rangeItem">
                                    <Form.Control name="end" type="datetime-local" step={1} onChange={(e) => handleEnd(e, 0)} title="X End"/>
                                </Form.Group>
                                <Form.Group className="rangeItem">
                                    <Form.Control name="end" onChange={(e) => handleTop(e, 0)} placeholder="Y Start" title="Scientific notation supported!"/>
                                </Form.Group>
                                <Form.Group className="rangeItem">
                                    <Form.Control name="end" onChange={(e) => handleBottom(e, 0)} placeholder="Y End" title="Scientific notation supported!"/>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className='graph'>
                    <Graph filtered={filter[0]} filtered2={filter2[0]} rangeValues={rangeValues[0]} setChannels={setChannels} selectedChannel={selectedChannel}/>
                </div>
                {[...Array(graphCount)].map((x, index) => {
                    const newIndex = index + 1;
                    return (
                    <>
                    <div className="filter">
                        <h3>Data Type</h3>
                        <div className="filterItem">
                            <h4>Left</h4>
                            {filter[newIndex].map((data, index) => 
                            <Form.Check 
                            label={data.dataName}
                            key={index}
                            checked={data.dataState}
                            onChange={() => onChecked(newIndex, index)}/>
                            )}
                            <h4>Right</h4>
                            {filter2[0].map((data, index) => 
                            <Form.Check 
                            label={data.dataName}
                            key={index}
                            checked={data.dataState}
                            onChange={() => onChecked2(newIndex, index)}/>
                            )}
                        </div>
                        <div className="range">
                            <Form className="rangeForm"
                                onKeyDown={handleSubmit}>
                                <Form.Group className="rangeItem">
                                    <Form.Control name="start" type="datetime-local" step={1} onChange={(e) => handleStart(e, newIndex)} placeholder="X Start"/>
                                </Form.Group>
                                <Form.Group className="rangeItem">
                                    <Form.Control name="end" type="datetime-local" step={1} onChange={(e) => handleEnd(e, newIndex)} placeholder="X End"/>
                                </Form.Group>
                                <Form.Group className="rangeItem">
                                    <Form.Control name="end" onChange={(e) => handleTop(e, newIndex)} placeholder="Y Greater"/>
                                </Form.Group>
                                <Form.Group className="rangeItem">
                                    <Form.Control name="end" onChange={(e) => handleBottom(e, newIndex)} placeholder="Y Lesser"/>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                    <div className='graph'
                        key={index}>
                        <Graph filtered={filter[newIndex]} filtered2={filter2[newIndex]} rangeValues={rangeValues[newIndex]}/>
                    </div>
                    </>
                    )}
                )}
                
            </div>
        </div>
    )
}

export default DataVisualisation