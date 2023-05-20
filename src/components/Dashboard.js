import { useState, useEffect } from "react"
import './Dashboard.css'
import Card from 'react-bootstrap/Card'
import Clock from './Clock'
import api from '../services/api'

const Dashboard = () => {
    //TODO display data to table
    const [data, setData] = useState([])
    const getData = () => {
          api.getMaxi().then((data) => setData(data));
      };
    useEffect(() => {
        getData();
    },[]);
    
    const tableFormat1 = [
        { Temperature: "Temperature Channel 1: " + 0.1 +"K", Pressure: "Pressure Channel 1: " + 19+"mBar", Flow: "Flow Channel 1: "+ 2+" mmol/S"},
        { Temperature: "Temperature Channel 2: " + 0.4+"K", Pressure: "Pressure Channel 2: " + 19+"mBar" },
        { Temperature: "Temperature Channel 3: " + 1.2+"K", Pressure: "Pressure Channel 3: " + 25+"mBar"},
        { Temperature: "Temperature Channel 4: " + 0.1+"K", Pressure: "Pressure Channel 4: " + 19+"mBar"},
        { Temperature: "Temperature Channel 5: " + 0.4 +"K"},
        { Temperature: "Temperature Channel 6: " + 1.2+"K"},
      ]
      const tableFormat2 = [
        { Temperature: "Temperature Channel 1: " + 0.1 +"K", Pressure: "Pressure Channel 1: " + 19+"mBar", Flow: "Flow Channel 1: "+ 2+"mmol/S"},
        { Temperature: "Temperature Channel 2: " + 0.4+"K", Pressure: "Pressure Channel 2: " + 19 +"mBar"},
        { Temperature: "Temperature Channel 3: " + 1.2+"K", Pressure: "Pressure Channel 3: " + 25+"mBar"},
        { Temperature: "Temperature Channel 4: " + 0.1+"K", Pressure: "Pressure Channel 4: " + 19+"mBar"},
        { Temperature: "Temperature Channel 5: " + 0.4 +"K"},
        { Temperature: "Temperature Channel 6: " + 1.2+"K"},
      ]

    return (
        
        <div className="dashboardContents">
            <div className="header">
                <h1 className="dashboardTitle">Dashboard</h1>
                <Clock/>
            </div> 
            <div className="contents">
                <Card className ="parentCard">
                    <Card.Title className="cardTitle">Fridge 1</Card.Title>
                    <table id="customers">
                    <tr>
                        <th>Temperature</th>
                        <th>Pressure</th>
                        <th>Flow</th>
                    </tr>
                    {tableFormat1.map((val, key) => {
                        return (
                        <tr key={key}>
                            <td>{val.Temperature}</td>
                            <td>{val.Pressure}</td>
                            <td>{val.Flow}</td>
                    </tr>
                        )
                    })}
                    
                        </table>
            
                </Card>
                <Card className ="parentCard">
                    <Card.Title className="cardTitle">Fridge 2</Card.Title>
                    <table id="customers">
                    <tr>
                        <th>Temperature</th>
                        <th>Pressure</th>
                        <th>Flow</th>
                    </tr>
                    {tableFormat2.map((val, key) => {
                        return (
                        <tr key={key}>
                            <td>{val.Temperature}</td>
                            <td>{val.Pressure}</td>
                            <td>{val.Flow}</td>
                    </tr>
                        )
                    })}
                    
                        </table>
             
                </Card>
                
            </div>
        </div>
    )
}

export default Dashboard