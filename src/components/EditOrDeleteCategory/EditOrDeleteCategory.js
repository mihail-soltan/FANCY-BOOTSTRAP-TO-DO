import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

export function EditOrDeleteCategory({show, category, closeModal}) {

    const [currentCategory, setCurrentCategory] = useState('')
    const handleChange = (e) => {
        const { name, value } = e.target
        setCurrentCategory((valoareaPrecedenta) => ({ ...valoareaPrecedenta, [name]: value }))
    }

    const handleEditCategory = ()=>{ 
        console.log("edit")
    }

    return (<div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
    >
        <Modal show={show} centered={true}>
            <Modal.Header>
                <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Edit category </p>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name..." name="name" onChange={handleChange} value={category.name} />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-danger" onClick={closeModal}>Close</Button>
                <Button variant="success" onClick={() => { handleEditCategory(category._id, currentCategory) }}>Edit Category</Button>
            </Modal.Footer>
        </Modal>
    </div>)
}

