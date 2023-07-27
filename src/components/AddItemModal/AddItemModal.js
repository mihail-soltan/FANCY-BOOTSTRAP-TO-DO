import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

export function AddItemModal({ show, closeModal, categories, addTask, user }) {

    const [newTask, setNewTask] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target
        setNewTask((valoareaPrecedenta) => ({ ...valoareaPrecedenta, [name]: value }))
    }



    const onConfirmAddTask = (userId) => {
        newTask.created_at = new Date()
        newTask.created_by = userId
        newTask.completed = false
        newTask.deadline = new Date(newTask.deadline)
        addTask(newTask)
        closeModal()
    }

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} centered={true}>
                <Modal.Header>
                    <Modal.Title>Add New Task, boss</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p className='black'>Add a new task so you can be more productive.</p>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className='black'>Title</Form.Label>
                            <Form.Control type="text" placeholder="Title..." name="title" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className='black'>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" onChange={handleChange} />
                        </Form.Group>
                        <Form.Select onChange={handleChange} name="category" aria-label="Default select example">
                            <option>Select Category</option>
                            {
                                categories.filter((cat)=> !cat.name.includes("all")).map((category) =>
                                    <option key={category._id} value={category.name}>{category.name}</option>
                                )
                            }
                        </Form.Select>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Deadline</Form.Label>
                            <Form.Control onChange={handleChange} name="deadline" type="date" />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-danger" onClick={closeModal}>Close</Button>
                    <Button variant="success" onClick={() => onConfirmAddTask(user._id)}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}