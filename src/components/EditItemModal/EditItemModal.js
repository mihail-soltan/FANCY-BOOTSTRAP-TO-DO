import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

export const EditItemModal = ({ task, closeModal, show, categories, tasks, editCurrentTask, setTasks }) => {

    const [currentTask, setCurrentTask] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target
        setCurrentTask((valoareaPrecedenta) => ({ ...valoareaPrecedenta, [name]: value }))
    }

    // const convertDate = (date) => {
    //     if (!date) {
    //         return ''
    //     }
    //     const deadline = date.getDate()
    //     const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
    //     const year = date.getFullYear()
    //     const convertedDate = `${year}-${month}-${deadline}`
    //     return convertedDate
    // }

    const handleEditTask = async (taskId, editedTask) => {
        currentTask.deadline = new Date(currentTask.deadline)
        delete currentTask._id
        editCurrentTask(editedTask, taskId)
        closeModal()

    }


    useEffect(() => {
        setCurrentTask(task)
    }, [task])
    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} centered={true}>
                <Modal.Header>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Edit task </p>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Title..." name="title" onChange={handleChange} value={currentTask.title} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" onChange={handleChange} value={currentTask.description} />
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
                    <Button variant="success" onClick={()=>{handleEditTask(task._id, currentTask)}}>Edit Task</Button>
                </Modal.Footer>
            </Modal>
        </div>)
}