import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Dashboard from  './components/Dashboard'
import DataVisualisation from  './components/DataVisualisation'
import BlueFors from './components/BlueFors'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from "react-router-dom"


function App() {
  const [user, setUser] = useState('User Name')

  return (
    <div className='App'>
      <div className='appContainer'>
        <NavBar {...{user}}/>
        <div className='contents'>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/data_visulisation' element={<DataVisualisation/>}/>
            <Route path='/bluefors_interface' element={<BlueFors/>}/>
          </Routes>
        </div>
      </div>
      
      {/*<Settings/> */}
    </div>
  );
}

export default App;
