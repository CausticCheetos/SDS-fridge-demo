import { useEffect, useState } from "react"
import './Dashboard.css'
import Card from 'react-bootstrap/Card'

const Dashboard = () => {
    const [date, setDate] = useState(new Date())

    const testData = [
        {
            name: "Fridge 1",
            temperature: {
                value: -10, 
                unit: "C\u00B0"},
            pressure: {
                value: 2100, 
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
            pressure: {
                value: 1, 
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
                                <Card.Body>Graph</Card.Body>
                                <Card.Text className="cardText">
                                    Temperature: {fridge.temperature.value + fridge.temperature.unit} <br/>
                                    Pressure: {fridge.pressure.value + fridge.pressure.unit} <br/>
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