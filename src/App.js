import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Dashboard from  './components/Dashboard'
import DataVisualisation from  './components/DataVisualisation'
import BlueFors from './components/BlueFors'
import Parameters from './components/Parameters';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from "react-router-dom"


function App() {
  const [user, setUser] = useState('User Name')
  const [fridgeData, setFridgeData] = useState([
    {
        name: "Fridge 1",
        temperature1: {
            value: 100, 
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
            value: true},
        params: [{name: "name1",
        description: "description", 
        paramType: "type",
        start: 1,
        end: 2}]
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
            value: false},
        params: [{name: "name2",
            description: "description", 
            paramType: "type",
            start: 1,
            end: 2}]
    },
])


  return (
    <div className='App'>
      <div className='appContainer'>
        <NavBar {...{user}}/>
        <div className='contents'>
          <Routes>
            <Route path='/' element={<Dashboard {...{fridgeData}} />}/>
            <Route path='/data_visulisation' element={<DataVisualisation/>}/>
            <Route path='/bluefors_interface' element={<BlueFors/>}/>
            <Route path='/parameters' element={<Parameters {...{fridgeData, setFridgeData}}/>}/>
          </Routes>
        </div>
      </div>
      
      {/*<Settings/> */}
    </div>
  );
}

export default App;
