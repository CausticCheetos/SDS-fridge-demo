import './NavBar.css'
import Button from 'react-bootstrap/Button'
import {IconHome, IconChartHistogram, IconAppWindow, IconSettings, IconLogout, IconCpu} from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

const NavBar = ({user}) => {

    const navList = [{
            name: "Dashboard",
            path: '/',
            icon: <IconHome/>
        },
        {
            name: "Data Visualisation",
            path: '/data_visulisation',
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
                <p><Button variant="Light"> <IconLogout/> Logout </Button></p>
            </div>
            
        </div>
    )
}

export default NavBar