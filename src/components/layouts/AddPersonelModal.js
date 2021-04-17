import React, { useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddPersonelModal = ({ show, setIsOpen, setTeamMembers, teamMembers}) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const handleSubmit = () => {
        const newItem = { name: name, contact: phoneNumber, address: address}
        axios.post('http://localhost:3001/api/members', newItem).then(()=> {
            console.log('item saved');
        }).catch(()=> {
            console.log('something went wrong')
        })
        setTeamMembers([...teamMembers, newItem])
        setName('');
        setPhoneNumber('');
        setAddress('');
        setIsOpen(false);
    }
    return (
        <Modal
            show={show}
            onHide={() => setIsOpen(false)}
            dialogClassName="customWidth"
        >
            <Modal.Header
                closeButton
            />
            <Modal.Body>
                <div className="AddPersonelModal">
                        <div className="AddPersonelModal__image" style={{height: '250px', width: '250px', backgroundColor: '#c4c4c4'}}>
                            image
                        </div>
                        <h4>Name</h4>
                        <input 
                            type="text" 
                            value={name}
                            placeholder="input name"
                            onChange={(e)=> setName(e.target.value)}
                        />
                        <h4>Contact No.</h4>
                        <input 
                            value={phoneNumber}
                            placeholder="input phone number" 
                            onChange={(e)=> setPhoneNumber(e.target.value)}
                        />
                        <h4>Address</h4>
                        <input 
                            type="text" 
                            value={address}
                            placeholder="input address"
                            onChange={(e)=> setAddress(e.target.value)}
                        />
                        <button
                            onClick={()=>handleSubmit()}
                        >Add Personel</button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddPersonelModal;