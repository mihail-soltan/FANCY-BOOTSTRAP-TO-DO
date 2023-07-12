import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
export function AddItemModal({ show, closeModal, addNewTask, categories, tasks }) {

    const [newTask, setNewTask] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewTask((valoareaPrecedenta) => ({ ...valoareaPrecedenta, [name]: value }))
    }



    const onConfirmAddTask = () => {
        console.log(newTask)
        newTask.created_at = new Date()
        newTask.created_by = "Shrek"
        newTask.id = Math.floor(Math.random() * 100000000)
        newTask.deadline = new Date(newTask.deadline) 
        addNewTask([...tasks, newTask])
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
                                categories.map((category) =>
                                    <option key={Math.floor(Math.random()*100000)} value={category}>{category}</option>
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