import {useState } from "react"
import {IconSquareRoundedPlusFilled, IconSquareRoundedMinus} from  '@tabler/icons-react'
import Graph from './Graph'
import Form from 'react-bootstrap/Form'
import './DataVisualisation.css'


const DataVisualisation = () => {
    const [graphCount, setGraphCount] = useState(0)
    const [filter, setFilter] = useState([false, false, false, false, false, false])

    const handleAdd = () => {setGraphCount(count => count + 1)}
    const handleRemove = () => {setGraphCount(count => count - 1)}
    const onChecked = (e) => {
        const newFilter = filter.concat();
        newFilter[e] = !newFilter[e]
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
                            <Form.Check 
                                label="Resistance"
                                checked={filter[0]}
                                onChange={() => onChecked(0)}/>
                            <Form.Check 
                                label="Temperature"
                                checked={filter[1]}
                                onChange={() => onChecked(1)}/>
                            <Form.Check 
                                label="Flow"
                                checked={filter[2]}
                                onChange={() => onChecked(2)}/>
                            <Form.Check 
                                label="Pressure 1"
                                checked={filter[3]}
                                onChange={() => onChecked(3)}/>
                            <Form.Check 
                                label="Pressure 2"
                                checked={filter[4]}
                                onChange={() => onChecked(4)}/>
                            <Form.Check 
                                label="Turbo"
                                checked={filter[5]}
                                onChange={() => onChecked(5)}/>
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