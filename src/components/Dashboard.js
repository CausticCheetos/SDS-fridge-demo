import { useEffect, useState } from "react"
import './Dashboard.css'
import Card from 'react-bootstrap/Card'
import DropDown from 'react-bootstrap/Dropdown'
import DropDownButton from 'react-bootstrap/DropdownButton'
import GaugeChart from 'react-gauge-chart'
import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar,Tooltip, Legend, ResponsiveContainer } from 'recharts'
import InteractiveTable from 'react-interactive-table';


function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

function getRandomInt(max) {
    Math.floor(Math.random(100) * max);
    /* wait(1500); */
    return Math.floor(Math.random(100) * max);
  }


const Dashboard = () => {
    const [date, setDate] = useState(new Date())
    const [selected, setSelected] = useState(0)
    
    const testData = [
        {
            name: "Fridge 1",
            temperature1: {
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
            temperature1: {
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
        },
    ]
    const data = [
        {
          "name": "Pressure Channel 1",
          "uv": 31.47,
          "pv": 2400,
          "fill": "#8884d8"
        },
        {
          "name": "Pressure Channel 2",
          "uv": 26.69,
          "pv": 4567,
          "fill": "#83a6ed"
        },
        {
          "name": "Pressure Channel 3",
          "uv": 15.69,
          "pv": 1398,
          "fill": "#8dd1e1"
        },
        {
          "name": "Pressure Channel 4",
          "uv": 8.22,
          "pv": 9800,
          "fill": "#82ca9d"
        },
        {
            "name": "Pressure Channel 5",
            "uv": 31.22,
            "pv": 9800,
            "fill": "#82ca3d"
          },
          {
            "name": "Pressure Channel 6",
            "uv": 8.22,
            "pv": 9800,
            "fill": "#81ca2d"
          },
       
      ]
    const data2 = [
        {id: 'Temperature Gauge 1', firstname: '0.1 K'},
        {id: 'Temperature Gauge 2', firstname: '2.2 K'},
        {id: 'Temperature Gauge 3', firstname: '-23 K'},
        {id: 'Temperature Gauge 4', firstname: '0.3 K'},
        {id: 'Pressure Gauge 1', firstname: '35 PA'},
        {id: 'Pressure Gauge 2', firstname: '1 PA'},
        {id: 'Pressure Gauge 3', firstname: '23 PA'},
        {id: 'Pressure Gauge 4', firstname: '22 PA'},
        {id: 'Pressure Gauge 5', firstname: '3 PA'},
        {id: 'Pressure Gauge 6', firstname: '1 PA'},
    ]
    
    useEffect(() => {
        setInterval(() => {
            setDate(new Date());
        }, 1000)
    }, [])

    const handleSelect = (e) => setSelected(e)

    return (
        <div className="dashboardContents">
            <div className="header">
                <h1 className="dashboardTitle">Dashboard</h1>
                <div className="clock">{date.toLocaleString("en-AU")}</div>
            </div> 
            <div className="contents">
            
                    <DropDownButton className="dropdownBox"
                        title={testData[selected].name}
                        id="dropdown-basic-button"
                        onSelect={handleSelect}>
                            {testData.map((fridge, index) =>
                                <DropDown.Item 
                                    className="w-100" 
                                    key={index} 
                                    eventKey={index}>
                                        {fridge.name}
                                </DropDown.Item>)}
                    </DropDownButton>
                <Card className ="parentCard">
                    <Card.Title className="cardTitle">Pressure</Card.Title>
                    <InteractiveTable
                tableStyles={'responsive'}
                dataList={data2} 
                columns={
                    {
                        id: {
                            alias: 'Gauge',
                            sortable: true,
                            active: false,
                            sortingKey: 'id'
                        },
                        firstname: {
                            alias: 'Measurement',
                            sortable: true,
                            active: false,
                            sortingKey: 'firstname'
                        }
                    }
                }
                searching={{
                    active: true,
                    searchPlaceholder: 'Search...',
                    searchKeys: ['id', 'firstName', 'mail']
                }}
                paging={{
                    maxRows: 5,
                    prevBtn: 'Prev',
                    nextBtn: 'Next',
                    showAll: true,
                    showAllText: 'show all',
                    joinPages: false
                }}
            />
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
                                dataKey='uv' 
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
                                percent={(testData[selected].temperature1.value/100)}
                                formatTextValue={value=> testData[selected].temperature1.value + " C\u00B0"}
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
                                percent={(testData[selected].temperature1.value/100)}
                                formatTextValue={value=> testData[selected].temperature1.value + " C\u00B0"}
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
                                percent={(testData[selected].temperature1.value/100)}
                                formatTextValue={value=> testData[selected].temperature1.value + " C\u00B0"}
                                textColor={'black'}
                                animate={false}/>
                        </Card.Body>
                    </Card>
                    <Card.Title className="cardTitle">Channel</Card.Title>
                    {/*
                    <Card.Text className="cardText">
                        Temperature 1: {fridge.temperature1.value + fridge.temperature1.unit} <br/>
                        Temperature 2: {fridge.temperature2.value + fridge.temperature2.unit}<br/>
                        Temperature 3: {fridge.temperature3.value + fridge.temperature3.unit} <br/>
                        Temperature 4: {fridge.temperature4.value + fridge.temperature4.unit}<br/>
                        Pressure 1: {fridge.pressure.value + fridge.pressure.unit}<br/>
                        Pressure 2: {fridge.pressure2.value + fridge.pressure.unit}<br/>
                        Pressure 3: {fridge.pressure3.value + fridge.pressure.unit}<br/>
                        Pressure 4: {fridge.pressure4.value + fridge.pressure.unit}<br/>
                        Pressure 5: {fridge.pressure5.value + fridge.pressure.unit}<br/>
                        Pressure 6: {fridge.pressure6.value + fridge.pressure.unit}<br/>
                        Power: {fridge.power.value + fridge.power.unit} <br/>
                        Runtime: {fridge.runtime.value + fridge.runtime.unit} <br/>
                        Status: {fridge.status.value ? "Online" : "Offline"} <br/>
                    </Card.Text> */}
                </Card>
                
            </div>
        </div>
    )
}

export default Dashboard