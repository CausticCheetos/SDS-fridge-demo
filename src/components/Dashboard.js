import { useEffect, useState } from "react"
import './Dashboard.css'
import Card from 'react-bootstrap/Card'

const Dashboard = () => {

    const [date, setDate] = useState(new Date())

    useEffect(() => {
        setInterval(() => {
            setDate(new Date());
        }, 1000)
    }, [])

    return (
        <>
            <div>
                <h1 className="dashboard">Dashboard</h1>
                {date.toLocaleString("en-AU")}
                <div className="table">
                <table>
                    <tbody>
                    <tr>
                        <th>
                            <Card>
                                <Card.Title>Fridge 1</Card.Title>
                                <Card.Body>Graph goes here</Card.Body>
                            </Card>
                        </th>
                        <th>
                            <Card>
                                <Card.Title>Fridge 2</Card.Title>
                                <Card.Body>Graph goes here</Card.Body>
                            </Card>
                        </th>
                    </tr>
                    </tbody>
                </table> 
                </div>
            </div>
        </>
    )
}

export default Dashboard