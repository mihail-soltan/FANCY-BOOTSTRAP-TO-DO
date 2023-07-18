import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { addNewTask } from '../../services/task.service';

export function AddItemModal({ show, closeModal, categories, tasks, addTask }) {

    const [newTask, setNewTask] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewTask((valoareaPrecedenta) => ({ ...valoareaPrecedenta, [name]: value }))
    }



    const onConfirmAddTask = () => {
        const username = localStorage.getItem("username")
        newTask.created_at = new Date()
        newTask.created_by = username ? username : "some random person"
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
                    <p>Add a new task so you can be more productive.</p>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Title..." name="title" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" onChange={handleChange} />
                        </Form.Group>
                        <Form.Select onChange={handleChange} name="category" aria-label="Default select example">
                            <option>Select Category</option>
                            {
                                categories.map((category, index) =>
                                    <option key={index} value={category}>{category}</option>
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
                    <Button variant="success" onClick={onConfirmAddTask}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}