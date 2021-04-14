import React from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddPersonelModal = ({ show, setIsOpen}) => {
    return (
        <Modal
            show={show}
            onHide={() => setIsOpen(false)}
        >
            <Modal.Header
                closeButton
            />
            <Modal.Body>
                <div className="AddPersonelModal">
                        <h4>Name</h4>
                        <input type="text" placeholder="input name"></input>
                        <h4>Contact No.</h4>
                        <input placeholder="input phone number"></input>
                        <h4>Address</h4>
                        <textarea placeholder="Input address"></textarea>
                        <button>Add Personel</button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddPersonelModal;