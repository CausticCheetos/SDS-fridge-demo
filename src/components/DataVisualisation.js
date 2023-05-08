import {useState } from "react"
import {IconSquareRoundedPlusFilled, IconSquareRoundedMinus} from  '@tabler/icons-react'
import Graph from './Graph'
import Form from 'react-bootstrap/Form'
import './DataVisualisation.css'


const DataVisualisation = () => {
    const [graphCount, setGraphCount] = useState(0)
    const [rangeValues, setRangeValues] = useState([['','']])
    const [filter, setFilter] = useState([[
        {
            dataName: "power",
            dataState: false
        },
        {
            dataName: "resistance",
            dataState: false
        },
        {
            dataName: "temperature",
            dataState: false
        },
        {
            dataName: "Pressure 1",
            dataState: false
        },
        {
            dataName: "Pressure 2",
            dataState: false
        },
        {
            dataName: "Turbo",
            dataState: false
        }
    ]])

    const handleAdd = () => {
        setFilter(current => [...current, [
            {
                dataName: "Resistance",
                dataState: false
            },
            {
                dataName: "Temperature",
                dataState: false
            },
            {
                dataName: "Flow",
                dataState: false
            },
            {
                dataName: "Pressure 1",
                dataState: false
            },
            {
                dataName: "Pressure 2",
                dataState: false
            },
            {
                dataName: "Turbo",
                dataState: false
            }
        ]])
        setRangeValues(current => [...current, ['','']])
        setGraphCount(count => count + 1)
    }
    const handleRemove = () => {
        setFilter(current => (current.slice(0, -1)))
        setGraphCount(count => count - 1)
    }

    const handleStart = (event, index) => {
        const newRange = rangeValues.concat()
        const end = rangeValues[index][1]
        const start = event.target.value
        newRange[index] = [start, end]
        setRangeValues(newRange)
    }

    const handleEnd = (event, index) => {
        const newRange = rangeValues.concat()
        const start = rangeValues[index][0]
        const end = event.target.value
        newRange[index] = [start, end]
        setRangeValues(newRange)
    }

    const handleSubmit = (e) => {
        console.log(rangeValues);
        if (e.key === "Enter") {
            console.log("Success!");
        }
    }

    const onChecked = (x, e) => {
        console.log(filter);
        const newFilter = filter.concat();
        newFilter[x][e].dataState = !newFilter[x][e].dataState
        setFilter(newFilter)
        console.log(newFilter);
       /*  console.log(newFilter) */
    }

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
                            {filter[0].map((data, index) => 
                            <Form.Check 
                            label={data.dataName}
                            key={index}
                            checked={data.dataState}
                            onChange={() => onChecked(0, index)}/>
                            )}
                        </div>
                        <h3>Range</h3>
                        <div className="range">
                            <Form 
                            onKeyDown={handleSubmit}>
                                <Form.Group>
                                    <Form.Control name="start" onChange={(e) => handleStart(e, 0)} placeholder="Start"/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control name="end" onChange={(e) => handleEnd(e, 0)} placeholder="End"/>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className='graph'>
                    <Graph filtered={filter[0]} rangeValues={rangeValues[0]}/>
                </div>
                {[...Array(graphCount)].map((x, index) => {
                    const newIndex = index + 1;
                    return (
                    <>
                    <div className="filter">
                        <h3>Data Type</h3>
                        <div className="filterItem">
                            {filter[newIndex].map((data, index) => 
                            <Form.Check 
                            label={data.dataName}
                            key={index}
                            checked={data.dataState}
                            onChange={() => onChecked(newIndex, index)}/>
                            )}
                        </div>
                        <div className="range">
                            <Form 
                            onKeyDown={handleSubmit}>
                                <Form.Group>
                                    <Form.Control name="start" onChange={(e) => handleStart(e, newIndex)} placeholder="Start"/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control name="end" onChange={(e) => handleEnd(e, newIndex)} placeholder="End"/>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                    <div className='graph'
                        key={index}>
                        <Graph filtered={filter[newIndex]} rangeValues={rangeValues[newIndex]}/>
                    </div>
                    </>
                    )}
                )}
                
            </div>
        </div>
    )
}

export default DataVisualisation