import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import api from '../services/api'

const EmailForm = ({data, selected, editShow, editTarget,state,setState}) => {
    const [id, setId] = useState((i) => editShow ? data[editTarget]['_id'] : '');
    const [name, setName] = useState((i) => editShow ? data[editTarget]['name'] : '');
    const [email, setEmail] = useState((i) => editShow ? data[editTarget]['email'] : '');

    const handleEmail = (e) => setEmail(e.target.value)
    const handleName = (e) => setName(e.target.value)
    //TODO prevent unexpected values
    const handleSubmit = async() => {
        const newParam = {
            name: name,
            EmailAddress: email
        }
        if (!editShow) {
            await api.createEmail(newParam)
            setState(state+1)
        }
        else
        {
            console.log("Success!");
            await api.updateEmail(newParam,id)
            setState(state+1)
        }
        
    }

    const handleClear = () => {
        setEmail('');
    }

    return (
        <Form onSubmit={(e) => e.preventDefault()}>
            <h6>Name</h6>
            <Form.Control className="createParam" onChange={handleName} value={name} placeholder="Name"/>
            <h6>Email</h6>
            <Form.Control className="Email" onChange={handleEmail} value={email} placeholder="Email"/>
            <button className='createButton' onClick={handleClear}>Clear</button>
            <button className='createButton' type='submit' onClick={handleSubmit}>Confirm</button>
        </Form>
    )
}

export default EmailForm