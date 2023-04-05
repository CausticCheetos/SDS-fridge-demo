import {useState } from "react"
import {IconSquareRoundedPlusFilled, IconSquareRoundedMinus} from  '@tabler/icons-react'
import Graph from './Graph'
import Form from 'react-bootstrap/Form'
import './DataVisualisation.css'


const DataVisualisation = () => {
    const [graphCount, setGraphCount] = useState(0)
    const [filter, setFilter] = useState([
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
        },
    
    ])

    const handleAdd = () => {setGraphCount(count => count + 1)}
    const handleRemove = () => {setGraphCount(count => count - 1)}
    const onChecked = (e) => {
        const newFilter = filter.concat();
        newFilter[e].dataState = !newFilter[e].dataState
        setFilter(newFilter)
        console.log(newFilter)
    }

    return (
        <div className="dataVisualisationContents">
            <div className="header">
                <h1>DataVisualisation</h1>
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
                            {filter.map((data, index) => 
                            <Form.Check 
                            label={data.dataName}
                            key={index}
                            checked={data.dataState}
                            onChange={() => onChecked(index)}/>
                            )}
                        </div>
                    </div>
                </div>
                <div className='graph'>
                    <Graph/>
                </div>
                {[...Array(graphCount)].map((x, index) => 
                    <div className='graph'
                    key={index}>
                        <Graph/>
                    </div>
                )}
                
            </div>
        </div>
    )
}

export default DataVisualisation