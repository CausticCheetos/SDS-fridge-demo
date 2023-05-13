import './NavBar.css'
import Button from 'react-bootstrap/Button'
import {IconHome, IconChartHistogram, IconAppWindow, IconSettings, IconLogout, IconCpu, IconLogin} from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import {DashboardIcon} from './Icons'
import { useEffect } from 'react'


const NavBar = ({user}) => {

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

    return (
        <div className='NavBar'>
            <div>
                <h2>Welcome, {user}! </h2>
                <h3>Menu</h3>
                {navList.map(item => 
                    <p key={item.name}>
                        <Button variant="Light" onClick={() => navigate(item.path)}>
                             {item.icon} {item.name} 
                        </Button>
                    </p>)}
                <div className=''/>
            </div>
            <div>
                <p><Button variant="Light"> <IconSettings/> Settings </Button></p>
                {
                user? <p><Button variant="Light" onClick={()=>{}}> <IconLogout/> Logout </Button></p>
               : <p><Button variant="Light" onClick={() => window.location.href =""}> <IconLogin/> Login </Button></p>
               
            }
            </div>
            
        </div>
    )
}

export default NavBar