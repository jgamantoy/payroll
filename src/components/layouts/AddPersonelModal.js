import React, { useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddPersonelModal = ({ show, setIsOpen, setTeamMembers, teamMembers, reload}) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const validateEmail = () => {
        const re = /\S+@\S+\.\S+/;
        return re.test(emailAddress);
      };
      const validatePhone = () => {
        const num = parseInt(phoneNumber);
        if (isNaN(num)) {
          return false;
        }
        if (phoneNumber.toString().replace(/ /g, '').replace('-', '').replace('+63', '0').length !== 11) {
          return false;
        }
        return true;
      };
    const handleSubmit = () => {
        if (validateEmail() && validatePhone() && name.length > 0){
            const newItem = { name: name, contact: phoneNumber, email: emailAddress}
            axios.post('http://localhost:3001/api/members', newItem).then(()=> {
                console.log('item saved');
            }).catch(()=> {
                console.log('something went wrong')
            })
            setTeamMembers([...teamMembers, newItem])
            setName('');
            setPhoneNumber('');
            setEmailAddress('');
            setIsOpen(false);
            reload()
        }
        else {
            if (name.length === 0) {
                const docEl = document.querySelector('#name');
                docEl.style.border = '1px solid red';
              }
            if (!validatePhone()) {
                const docEl = document.querySelector('#phone');
                docEl.style.border = '1px solid red';
            }
            if (!validateEmail()) {
                const docEl = document.querySelector('#email');
                docEl.style.border = '1px solid red';
              }
            
        }
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
                            id="name"
                            placeholder="Input name"
                            onChange={(e)=> {
                                setName(e.target.value)
                                const docEl = document.querySelector('#name');
                                docEl.style.border = '1px solid #000000';
                            }}
                        />
                        <h4>Contact No.</h4>
                        <input 
                            value={phoneNumber}
                            id="phone"
                            placeholder="Input phone number" 
                            onChange={(e)=> {
                                setPhoneNumber(e.target.value)
                                const docEl = document.querySelector('#phone');
                                docEl.style.border = '1px solid #000000';
                            }}
                        />
                        <h4>Email</h4>
                        <input 
                            type="text" 
                            value={emailAddress}
                            id="email"
                            placeholder="Input email"
                            onChange={(e)=> {
                                setEmailAddress(e.target.value)
                                const docEl = document.querySelector('#email');
                                docEl.style.border = '1px solid #000000';
                            }}
                        />
                        <button
                            onClick={()=>handleSubmit()}
                        >Add Personel
                        </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddPersonelModal;