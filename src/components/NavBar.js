import './NavBar.css'
import DataVisualisation from  './DataVisualisation'
import Dashboard from  './Dashboard'
import BlueFors from './BlueFors'
import Button from 'react-bootstrap/Button'

const NavBar = ({user, handleNav}) => {

    const navList = [{
            name: "Dashboard",
            comp: <Dashboard/>
        },
        {
            name: "Data Visualisation",
            comp: <DataVisualisation/>
        },
            {name: "BlueFors Interface",
            comp: <BlueFors/>
        }]

    return (
        <div className='NavBar'>
            <h1>Welcome, {user}! </h1>
            <h2>Menu</h2>
            {navList.map(item => <p><Button variant="Light" onClick={() => handleNav(item.comp)}> {item.name} </Button></p>)}

        </div>
    )
}

export default NavBar