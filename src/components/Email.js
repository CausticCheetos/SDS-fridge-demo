import { useEffect, useState } from 'react';
import Clock from "./Clock"
import './Parameters.css'
import Modal from 'react-bootstrap/Modal'
import api from '../services/api'
import './Parameters.css'
import EmailForm from "./EmailForm"
import EmailItem from "./EmailItem"

const Email= () => { 
    const [selected, setSelected] = useState(0)
    const [editShow, setEditShow] = useState(false);
    const [editTarget, setEditTarget] = useState(0);
    const [state, setState] = useState(0)
    const [data,setData] = useState([]);
    const handleSelect = (e) => setSelected(e)
    const handleClose = () => setEditShow(false)

    const handleDelete = (index,data) => {
        api.deleteParameters(data._id)
        setState(state-1)
    }   
    const handleOpenEdit = (index) => {
        setEditShow(true)
        setEditTarget(index)
    }


    const getData = () =>{
        api.getEmails()
            .then((data) => setData(data))
    }

    useEffect(() =>{
        getData();
    }, [state])

    return(
        <>
        <Modal
            show={editShow}
            onHide={handleClose}>
                <h3>Edit</h3>
                <EmailForm {...{data, selected, editShow, editTarget}}/> 
        </Modal>
        <div className="warningParamsContent">
        <div className="header">
            <h1>Email</h1>
            <Clock/>
        </div>
        <div className="contents">
                <div className='paramContainer'>
                    <div className='createContainer'>
                        <EmailForm {...{data, selected, editShow,state,setState}}/> 
                    </div>
                    <div className='manageContainer'>
                    <h3>Manage Email</h3>
                        {data.map((data,index) =>
                            <EmailItem key={index} {...{data, index, handleDelete, handleOpenEdit}}/>
                        )}
                    </div>
                </div>
        </div>
    </div>
    </>
    )

}


export default Email