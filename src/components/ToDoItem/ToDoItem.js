import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import "./ToDoItem.css"
import { EditItemModal } from '../EditItemModal/EditItemModal';
import { DeleteItemModal } from '../DeleteItemModal/DeleteItemModal';
import { DeleteToast } from '../Toast/DeleteToast';
export function ToDoItem({ task, categories, tasks, setTasks, showDeleteToast, setShowDeleteToast }) {
    const styles = {
        width: "50%"
    }
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const onEditTask = (task) => {
        setShowEditModal(true)
    }
    const onDeleteTask = (task) =>{
        setShowDeleteModal(true)
    }
    const closeEditModal = () => {
        setShowEditModal(false)
    }
    const closeDeleteModal = () => {
        setShowDeleteModal(false)
    }

    const toggleToast = () =>{
        setShowToast(!showToast)
    }

    const editTask = () => {
        console.log("hello")
    }
    return (
        <>        <EditItemModal
            show={showEditModal}
            closeModal={closeEditModal}
            categories={categories}
            task={task}
            editTask={editTask}
            tasks={tasks}
            setTasks={setTasks} 
        />
        <DeleteItemModal 
        show={showDeleteModal}
        closeModal={closeDeleteModal}
        task={task}
        tasks={tasks}
        setTasks={setTasks}
        setShowToast={setShowToast}
        setShowDeleteToast={setShowDeleteToast}
        />

        <DeleteToast 
        show={showToast}
        toggleToast={toggleToast}
        />
            <div style={styles}>
                <Accordion defaultActiveKey="0" variant="secondary">
                    <Accordion.Item eventKey={task.id}>
                        <Accordion.Header>{task.title}</Accordion.Header>
                        <Accordion.Body>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Created At: {task.created_at.toLocaleString()}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Deadline: {task.deadline.toLocaleString()}</Card.Subtitle>
                                    <Card.Text>
                                        {task.description}
                                    </Card.Text>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>{task.category}</ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                            <Button style={{ margin: "5px" }} variant="outline-danger" onClick={() => onDeleteTask(task)}>Delete Task</Button>
                            <Button style={{ margin: "5px" }} variant="warning" onClick={() => onEditTask(task)}>Edit Task</Button>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </>
    )
}