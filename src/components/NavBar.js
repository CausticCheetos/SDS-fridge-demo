import './NavBar.css'
import DataVisualisation from  './DataVisualisation'
import Dashboard from  './Dashboard'
import BlueFors from './BlueFors'
import Button from 'react-bootstrap/Button'
import {IconHome, IconChartHistogram, IconAppWindow, IconSettings, IconLogout} from '@tabler/icons-react'

const NavBar = ({user, handleNav}) => {

    const navList = [{
            name: "Dashboard",
            comp: <Dashboard/>,
            icon: <IconHome/>
        },
        {
            name: "Data Visualisation",
            comp: <DataVisualisation/>,
            icon: <IconChartHistogram/>,
        },
            {name: "BlueFors Interface",
            comp: <BlueFors/>,
            icon: <IconAppWindow/>
        }]

    return (
        <div className='NavBar'>
            <div>
                <h2>Welcome, {user}! </h2>
                <h3>Menu</h3>
                {navList.map(item => <p><Button variant="Light" onClick={() => handleNav(item.comp)}> {item.icon} {item.name} </Button></p>)}
                <div className=''/>
            </div>
            <div>
                <p><Button variant="Light"> <IconSettings/> Settings </Button></p>
                <p><Button variant="Light"> <IconLogout/> Logout </Button></p>
            </div>
            
        </div>
    )
}

export default NavBar