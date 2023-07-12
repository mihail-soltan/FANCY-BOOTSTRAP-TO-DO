import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

export const DeleteItemModal = ({show, closeModal, task, tasks, setTasks, setShowDeleteToast}) =>{


    const handleDeleteTask = (item) => {
        console.log(`Deleting task with id ${item.id}`)
        const updatedTasks = tasks.filter((task) => task.id !== item.id)
        closeModal()
        setShowDeleteToast(true)
        setTasks(updatedTasks)
    }

  return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} centered={true}>
                <Modal.Header>
                    <Modal.Title>Delete Task</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                   <h2>Are you sure you want to delete this task?</h2>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-danger" onClick={closeModal}>No</Button>
                    <Button variant="success" onClick={()=>{handleDeleteTask(task)}}>Yes, pls</Button>
                </Modal.Footer>
            </Modal>
        </div>)
}