import React, { useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddPersonelModal = ({ show, setIsOpen, reload}) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [payMethod, setPayMethod] = useState('');

    const validateEmail = () => { //EMAIL VALIDATION
        const re = /\S+@\S+\.\S+/;
        return re.test(emailAddress);
      };
      const validatePhone = () => { //PHONE VALIDATION
        const num = parseInt(phoneNumber);
        if (isNaN(num)) { //IF INCLUDES LETTERS
          return false;
        }
        if (phoneNumber.toString().replace(/ /g, '').replace('-', '').replace('+63', '0').length !== 11) {//REMOVES - an spaces, has to be 11 digits long
          return false;
        }
        return true;
      };
    const handleSubmit = () => {
        if (validateEmail() && validatePhone() && name.length > 0 && payMethod.length > 0){
            const newItem = { name: name, contact: phoneNumber, email: emailAddress, payMethod: payMethod}
            axios.post('http://localhost:3001/api/members', newItem).then(()=> {
                console.log('item saved');
            }).catch(()=> {
                console.log('something went wrong')
            })
            setIsOpen(false);
            reload()
        }
        else {
            if (name.length === 0) {
                const docEl = document.querySelector('#name');
                docEl.style.border = '1px solid red';
            }
            if (payMethod.length === 0) {
                const docEl = document.querySelector('#payMethod');
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
                        <h4>Pay Method</h4>
                        <input 
                            type="text" 
                            value={payMethod}
                            id="payMethod"
                            placeholder="Input pay method"
                            onChange={(e)=> {
                                setPayMethod(e.target.value)
                                const docEl = document.querySelector('#payMethod');
                                docEl.style.border = '1px solid #000000';
                            }}
                        />
                        <button onClick={()=>handleSubmit()}>   
                            Add Personel
                        </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddPersonelModal;