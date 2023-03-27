import { useEffect, useState } from "react"
import './Dashboard.css'
import Card from 'react-bootstrap/Card'
import GaugeChart from 'react-gauge-chart'

function getRandomInt(max) {

    return Math.floor(Math.random(100) * max);
    
  }
const Dashboard = () => {
    const [date, setDate] = useState(new Date())
    
    const testData = [
        {
            name: "Fridge 1",
            temperature: {
                value: getRandomInt(100), 
                unit: "C\u00B0"},
            temperature2: {
                value: 13, 
                unit: "C\u00B0"},
            temperature3: {
                value: 23, 
                unit: "C\u00B0"},
            temperature4: {
                value: 30, 
                unit: "C\u00B0"},
            pressure: {
                value: 2100, 
                unit: "psi"},
            pressure2: {
                value: 2300, 
                unit: "psi"},
            pressure3: {
                value: 2140, 
                unit: "psi"},
            pressure4: {
                value: 2301, 
                unit: "psi"},
            pressure5: {
                value: 1923, 
                unit: "psi"},
            pressure6: {
                value: 2123, 
                unit: "psi"},
            power: {
                value: 4400, 
                unit: "mW"},
            runtime: {
                value: "", 
                unit: ""},
            status: {
                value: true}
        },
        {
            name: "Fridge 2",
            temperature: {
                value: 80, 
                unit: "C\u00B0"},
                temperature2: {
                    value: 82, 
                    unit: "C\u00B0"},
                temperature3: {
                    value: 94, 
                    unit: "C\u00B0"},
                temperature4: {
                    value: 75, 
                    unit: "C\u00B0"},
                pressure: {
                    value: 2200, 
                    unit: "psi"},
                pressure2: {
                    value: 2155, 
                    unit: "psi"},
                pressure3: {
                    value: 1884, 
                    unit: "psi"},
                pressure4: {
                    value: 1974, 
                    unit: "psi"},
                pressure5: {
                    value: 2301, 
                    unit: "psi"},
                pressure6: {
                    value: 2100, 
                    unit: "psi"},
            power: {
                value: 2000, 
                unit: "mW"},
            runtime: {
                value: "", 
                unit: ""},
            status: {
                value: false}
        }
    ]

    useEffect(() => {
        setInterval(() => {
            setDate(new Date());
        }, 1000)
    }, [])

    return (
        <div className="dashboardContents">
            <h1 className="dashboard">Dashboard</h1>
            <div className="clock">{date.toLocaleString("en-AU")}</div>       
            <div className="table">
            <table className="dashboardTable">
                <tbody>
                    <tr>
                        {testData.map(fridge =>
                        <td className="dashboardCells"> 
                            <Card className ="card">
                                <Card.Title>{fridge.name}</Card.Title>
                                <Card.Body>
                                    <GaugeChart
                                        id="gauge-chart1"
                                        nrOfLevels={10}
                                        colors={["green", "orange", "red"]}
                                        arcWidth={0.3}
                                        percent={(fridge.temperature.value/100)}
                                        formatTextValue={value=> fridge.temperature.value + " C\u00B0"}
                                        textColor={'black'}
                                        animate={false}
                                        />
                                </Card.Body>
                                <Card.Text className="cardText">
                                    Temperature 1: {fridge.temperature.value + fridge.temperature.unit} <br/>
                                    Temperature 2: {fridge.temperature2.value + fridge.temperature.unit}<br/>
                                    Temperature 3: {fridge.temperature3.value + fridge.temperature.unit} <br/>
                                    Temperature 4: {fridge.temperature4.value + fridge.temperature.unit}<br/>
                                    Pressure 1: {fridge.pressure.value + fridge.pressure.unit}<br/>
                                    Pressure 2: {fridge.pressure2.value + fridge.pressure.unit}<br/>
                                    Pressure 3: {fridge.pressure3.value + fridge.pressure.unit}<br/>
                                    Pressure 4: {fridge.pressure4.value + fridge.pressure.unit}<br/>
                                    Pressure 5: {fridge.pressure5.value + fridge.pressure.unit}<br/>
                                    Pressure 6: {fridge.pressure6.value + fridge.pressure.unit}<br/>
                                    Power: {fridge.power.value + fridge.power.unit} <br/>
                                    Runtime: {fridge.runtime.value + fridge.runtime.unit} <br/>
                                    Status: {fridge.status.value ? "Online" : "Offline"} <br/>
                                </Card.Text>
                            </Card>
                        </td>)}
                    </tr>
                </tbody>
            </table> 
            </div>
        </div>
    )
}

export default Dashboard