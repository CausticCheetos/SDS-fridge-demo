import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Dashboard from  './components/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  const [user, setUser] = useState('User Name')
  const [displayed, setDisplayed] = useState(<Dashboard/>)
  
  const handleNav = (item) => {
    setDisplayed(item)
  }

  return (
    <div className='App'>
      <div className='appContainer'>
        
        <NavBar {...{user, handleNav}}/>
        <div className='contents'>
          {displayed}
        </div>
      </div>
      
      {/*<Settings/> */}
    </div>
  );
}

export default App;
