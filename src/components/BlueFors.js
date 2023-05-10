import bluefors from "../images/BFFrontPanel.png";
import black from "../images/black.png";
import blue from "../images/blue.png";
import red from "../images/red.png";
import "./BlueFors.css";
import {useEffect, useState} from "react"
import api from '../services/api'

const BlueFors = () => {
    const [data,setData] = useState([])
    const getData = () => {
        api.getValves().then((data) => setData(data)) 
        console.log(data);
  } 
  useEffect(() => {
    getData();
  })
    
    return (
        <div>
            <div className="header">
                <h1>BlueFors Interface</h1>
            </div>
            <div className="diagram-container">
                <img src={bluefors} alt="bluefors" className="diagram"/>
                <div className="p1">
                    <body className="text">3.25</body>
                </div>
                <div className="p2">
                    <body className="text">5.52</body>
                </div>
                <div className="p3">
                    <body className="text">4.24</body>
                </div>
                <div className="p4">
                    <body className="text">6.342</body>
                </div>
                <div className="p5">
                    <body className="text">1.2345</body>
                </div>
                <div className="p6">
                    <body className="text">6.420</body>
                </div>
                <img src={black} alt="black-indicator" className="v1"/>
                <img src={black} alt="black-indicator" className="v2"/>
                <img src={black} alt="black-indicator" className="v3"/>
                <img src={black} alt="black-indicator" className="v4"/>
                <img src={black} alt="black-indicator" className="v5"/>
                <img src={black} alt="black-indicator" className="v6"/>
                <img src={black} alt="black-indicator" className="v7"/>
                <img src={red} alt="black-indicator" className="v8"/>
                <img src={black} alt="black-indicator" className="v9"/>
                <img src={black} alt="black-indicator" className="v10"/>
                <img src={black} alt="black-indicator" className="v11"/>
                <img src={black} alt="black-indicator" className="v12"/>
                <img src={black} alt="black-indicator" className="v13"/>
                <img src={black} alt="black-indicator" className="v14"/>
                <img src={black} alt="black-indicator" className="v15"/>
                <img src={black} alt="black-indicator" className="v16"/>
                <img src={blue} alt="black-indicator" className="v17"/>
                <img src={black} alt="black-indicator" className="v18"/>
                <img src={black} alt="black-indicator" className="v19"/>
                <img src={black} alt="black-indicator" className="v20"/>
                <img src={black} alt="black-indicator" className="v21"/>
                <img src={black} alt="black-indicator" className="v22"/>
                <img src={black} alt="black-indicator" className="v23"/>
                <img src={black} alt="black-indicator" className="scroll-1"/>
                <img src={black} alt="black-indicator" className="scroll-2"/>
                <img src={black} alt="black-indicator" className="turbo-1"/>
                <img src={black} alt="black-indicator" className="turbo-2"/>
                <img src={black} alt="black-indicator" className="coml"/>
                <img src={black} alt="black-indicator" className="pulse-tube"/>
                <img src={black} alt="black-indicator" className="hs-still"/>
                <img src={black} alt="black-indicator" className="hs-mc"/>
                <img src={black} alt="black-indicator" className="ext"/>
                <img src={black} alt="black-indicator" className="four-k-heater"/>
            </div>
        </div>
    )
}

export default BlueFors