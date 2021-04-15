import React from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddPersonelModal = ({ show, setIsOpen}) => {
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
                        <input type="text" placeholder="input name"></input>
                        <h4>Contact No.</h4>
                        <input placeholder="input phone number"></input>
                        <h4>Address</h4>
                        <input type="text" placeholder="input address"></input>
                        <button>Add Personel</button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddPersonelModal;