import React, { useState } from 'react';
import axios from 'axios';
const EditPersonel = (props) => {
    const { activePersonel, teamMembers, setTeamMembers, setUpdateStatus, setActivePersonel } = props;
    const [newName, setNewName] = useState(activePersonel.name);
    const [newContact, setNewContact] = useState(activePersonel.contact);
    const [newEmail, setNewEmail] = useState(activePersonel.email);

    const validateEmail = () => {
        const re = /\S+@\S+\.\S+/;
        return re.test(newEmail);
      };
    const validatePhone = () => {
        const num = parseInt(newContact);
        if (isNaN(num)) {
          return false;
        }
        if (newContact.toString().replace(/ /g, '').replace('-', '').replace('+63', '0').length !== 11) {
          return false;
        }
        return true;
      };
    const handleSubmit = () => {
        if (validateEmail() && validatePhone() && newName.length > 0){
            const newItem = { name: newName, contact: newContact, email: newEmail}
            axios.put(`http://localhost:3001/api/update/${activePersonel.id}`, newItem).then(()=> {
                console.log('item saved');
            }).catch(()=> {
                console.log('something went wrong')
            })
            const newItemIndex = teamMembers.indexOf(activePersonel);
            let newArray = [...teamMembers];
            newArray[newItemIndex] = newItem;
            setTeamMembers(newArray);
            setActivePersonel(newItem);
            setUpdateStatus('off');
        }
        else {
            if (newName.length === 0) {
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
        <div className="EditPersonel">
            <div className="EditPersonel__image" style={{height: '250px', width: '250px', backgroundColor: '#c4c4c4'}}>
                image
            </div>
            <h4>Name</h4>
            <input 
                type="text" 
                value={newName}
                    id="name"
                    placeholder="Input name"
                    onChange={(e)=> {
                        setNewName(e.target.value)
                        const docEl = document.querySelector('#name');
                        docEl.style.border = '1px solid #000000';
                    }}
            />
            <h4>Contact No.</h4>
            <input 
                value={newContact}
                id="phone"
                placeholder="Input phone number" 
                onChange={(e)=> {
                    setNewContact(e.target.value)
                    const docEl = document.querySelector('#phone');
                    docEl.style.border = '1px solid #000000';
                }}
            />
            <h4>Email</h4>
            <input 
                type="text" 
                value={newEmail}
                id="email"
                placeholder="Input email"
                onChange={(e)=> {
                    setNewEmail(e.target.value)
                    const docEl = document.querySelector('#email');
                    docEl.style.border = '1px solid #000000';
                }}
            />
            <div className="EditePersonel__buttons">
                <button onClick={()=> handleSubmit()}>
                    Add Personel
                </button>
                <button onClick={()=> setUpdateStatus('off')}>
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default EditPersonel;