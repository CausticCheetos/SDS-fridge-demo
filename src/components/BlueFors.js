import bluefors from "../images/BFFrontPanel.png";
import black from "../images/black.png";
import blue from "../images/blue.png";
import red from "../images/red.png";
import "./BlueFors.css";
import { useEffect, useState } from "react";
import api from '../services/api'

const BlueFors = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await api.getValves();
    setData(response);
  };

  useEffect(() => {
    getData();
  }, []);


  const [pressure, setPressure] = useState([])
  const getPressure = () => {
        api.getMaxi().then((pressure) => setPressure(pressure));
    };
  useEffect(() => {
    getPressure();
  },[]);

  const [flow, setFlow] = useState([])
  const getFlow = () => {
        api.getFlow().then((flow) => setFlow(flow));
    };
  useEffect(() => {
    getFlow();
  },[]);

  console.log("flow", flow)

  return (
    <div>
      <div className="header">
        <h1>BlueFors Interface</h1>
      </div>
      <div className="diagram-container">
        <img src={bluefors} alt="bluefors" className="diagram" />
        {pressure[0] && <div className="p1">
            <body className="text">{Number(pressure[0].value).toExponential(2)}</body>
        </div>}
        {pressure[1] && <div className="p2">
            <body className="text">{Number(pressure[1].value).toExponential(2)}</body>
        </div>}
        {pressure[2] && <div className="p3">
            <body className="text">{Number(pressure[2].value).toExponential(2)}</body>
        </div>}
        {pressure[3] && <div className="p4">
            <body className="text">{Number(pressure[3].value).toExponential(2)}</body>
        </div>}
        {pressure[4] && <div className="p5">
            <body className="text">{Number(pressure[4].value).toExponential(2)}</body>
        </div>}
        {pressure[5] && <div className="p6">
            <body className="text">{Number(pressure[5].value).toExponential(2)}</body>
        </div>}

        {flow && <div className="flow">
            {console.log(flow)}
            <body className="text">{flow.value}</body>
        </div>}

        <img 
            src={black}
            alt={`coml-indicator`} 
            className={`coml`}
        />

        <img 
            src={black}
            alt={`turbo-2-indicator`} 
            className={`turbo2`}
        />
        
        {data.map((item) => {
            const matchingChildItem = item.find((childItem) => childItem.id === item[0].id);
            console.log(matchingChildItem);
            if (matchingChildItem) {
                console.log(matchingChildItem.value)
                return (
                <img 
                    key={matchingChildItem.id}
                    src={
                    matchingChildItem.value === '0' ? black : (matchingChildItem.id === "v15" || matchingChildItem.id === "v17" || matchingChildItem.id === "v18"
                    ? red : blue)
                    } 
                    alt={`${matchingChildItem.id}-indicator`} 
                    className={`${matchingChildItem.id}`}
                />
                );
            } 
            else {
                return (
                <img 
                    key={item[0]}
                    src={black}
                    alt={`${item[0]}-indicator`} 
                    className={`${item[0]}`}
                />
                );
            }
        })}
      </div>
      </div>
)}

export default BlueFors
