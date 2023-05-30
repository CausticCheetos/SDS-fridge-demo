import './NavBar.css'
import Button from 'react-bootstrap/Button'
import {IconHome, IconChartHistogram, IconAppWindow, IconSettings, IconLogout, IconCpu} from '@tabler/icons-react'
import {useNavigate, useLocation} from 'react-router-dom'
import {DashboardIcon} from './Icons'


const NavBar = ({user}) => {
    const location = useLocation()

    const navList = [{
            name: "Dashboard",
            path: '/',
            icon: <DashboardIcon/>
        },
        {
            name: "Data Visualisation",
            path: '/data_visualisation',
            icon: <IconChartHistogram/>,
        },
        {
            name: "BlueFors Interface",
            path: '/bluefors_interface',
            icon: <IconAppWindow/>
        },
        {
            name: "Warning Parameters",
            path: '/parameters',
            icon: <IconCpu/>
        }]

    const navigate = useNavigate()

    const isSelected = (path) => {return location.pathname === path}

    return (
        <div className='NavBar'>
            <div>
                <h2>Welcome, {user}! </h2>
                <h3>Menu</h3>
                {navList.map(item => 
                <p key={item.name}>
                    <Button 
                        variant="nav" 
                        onClick={() => navigate(item.path)}
                        style={isSelected(item.path) ? {color: 'rgba(255, 255, 255, 0.9)'} : {color: 'rgba(255, 255, 255, 0.4)'}}>
                            {item.icon} {item.name} 
                    </Button>
                </p>)}
            </div>
            <div>
                <p>
                    <Button 
                        variant="nav"
                        onClick={() => navigate('/settings')}
                        style={isSelected('/settings') ? {color: 'rgba(255, 255, 255, 0.9)'} : {color: 'rgba(255, 255, 255, 0.4)'}}> 
                            <IconSettings/> Settings 
                    </Button>
                </p>
                <p><Button variant="nav"> <IconLogout/> Logout </Button></p>
            </div>
            
        </div>
    )
}

export default NavBar