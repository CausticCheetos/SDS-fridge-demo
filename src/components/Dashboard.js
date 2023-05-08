import { useState, useEffect } from "react"
import './Dashboard.css'
import Card from 'react-bootstrap/Card'
import DropDown from 'react-bootstrap/Dropdown'
import DropDownButton from 'react-bootstrap/DropdownButton'
import GaugeChart from 'react-gauge-chart'
import Clock from './Clock'
import React from 'react';
import { RadialBarChart, RadialBar,Tooltip, Legend } from 'recharts'
import api from '../services/api'

const Dashboard = ({fridgeData}) => {
    const [selected, setSelected] = useState(0)
    const [data, setData] = useState([])
    const getData = () => {
          api.getMaxi().then((data) => setData(data));
      };
    useEffect(() => {
        getData();
    },[]);
    const handleSelect = (e) => setSelected(e)

    return (
        <div className="dashboardContents">
            <div className="header">
                <h1 className="dashboardTitle">Dashboard</h1>
                <Clock/>
            </div> 
            <div className="contents">
                    <DropDownButton className="dropdownBox"
                        title={fridgeData[selected].id}
                        id="dropdown-basic-button"
                        onSelect={handleSelect}>
                            {fridgeData.map((fridge, index) =>
                                <DropDown.Item 
                                    className="w-100" 
                                    key={index} 
                                    eventKey={index}>
                                        {fridge.name}
                                </DropDown.Item>)}
                    </DropDownButton>
                <Card className ="parentCard">
                    <Card.Title className="cardTitle">Pressure</Card.Title>
                    <Card className="childCard">
                        <Card.Body>
                            <RadialBarChart 
                                verticalAlign='center'
                                width={800} 
                                height={400} 
                                innerRadius="10%" 
                                outerRadius="80%" 
                                data={data} 
                                startAngle={180} 
                                endAngle={0}
                                textColor={'black'}
                            >
                            <RadialBar 
                                minAngle={15}  
                                fill="#0BEFF2" 
                                label={{ position: 'insideStart', fill: '#fff' }}
                                background
                                clockWise={true} 
                                dataKey='value'
                            />
                            <Tooltip />
                            <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='center' align="right" />
                            </RadialBarChart>
                        </Card.Body>
                        
                    </Card>
                    <Card.Title className="cardTitle">Temperature</Card.Title>
                    <Card className="childCard">
                        <Card.Body>
                            <GaugeChart
                                id="gauge-chart1"
                                nrOfLevels={10}
                                colors={["green", "orange", "red"]}
                                arcWidth={0.3}
                                percent={(fridgeData[selected].temperature1.value/100)}
                                formatTextValue={value=> fridgeData[selected].temperature1.value + " C\u00B0"}
                                textColor={'black'}
                                animate={false}/>
                        </Card.Body>
                    </Card>
                    <Card className="childCard">
                        <Card.Body>
                            <GaugeChart
                                id="gauge-chart1"
                                nrOfLevels={10}
                                colors={["green", "orange", "red"]}
                                arcWidth={0.3}
                                percent={(fridgeData[selected].temperature1.value/100)}
                                formatTextValue={value=> fridgeData[selected].temperature1.value + " C\u00B0"}
                                textColor={'black'}
                                animate={false}/>
                        </Card.Body>
                    </Card>
                    <Card className="childCard">
                        <Card.Body>
                            <GaugeChart
                                id="gauge-chart1"
                                nrOfLevels={10}
                                colors={["green", "orange", "red"]}
                                arcWidth={0.3}
                                percent={(fridgeData[selected].temperature1.value/100)}
                                formatTextValue={value=> fridgeData[selected].temperature1.value + " C\u00B0"}
                                textColor={'black'}
                                animate={false}/>
                        </Card.Body>
                    </Card>
                    <Card.Title className="cardTitle">Channel</Card.Title>
                </Card>
                
            </div>
        </div>
    )
}

export default Dashboard