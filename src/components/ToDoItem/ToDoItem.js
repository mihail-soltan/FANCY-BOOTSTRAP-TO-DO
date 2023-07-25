import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import "./ToDoItem.css"
import { EditItemModal } from '../EditItemModal/EditItemModal';
import { DeleteItemModal } from '../DeleteItemModal/DeleteItemModal';
import { isToday } from '../../helpers/helpers';

export function ToDoItem({ task,
    categories,
    tasks,
    setTasks,
    showDeleteToast,
    setShowDeleteToast,
    editCurrentTask,
    handleFinishedTask,
    handleDeleteTask
}) {
    const styles = {
        width: "50%"
    }
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const onEditTask = () => {
        setShowEditModal(true)
    }
    const onDeleteTask = () => {
        setShowDeleteModal(true)
    }
    const closeEditModal = () => {
        setShowEditModal(false)
    }
    const closeDeleteModal = () => {
        setShowDeleteModal(false)
    }

    const handleFinishTask = async (taskId) => {
        const response = handleFinishedTask(taskId)
        return response
    }
    const completed = task.completed ? 'completed' : 'to-do'
    const deadlineIsToday = isToday(task.deadline) ? 'deadline-missed' : ""
    return (
        <>        <EditItemModal
            show={showEditModal}
            closeModal={closeEditModal}
            categories={categories}
            task={task}
            editCurrentTask={editCurrentTask}
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
                handleDeleteTask={handleDeleteTask}
            />
            <div style={styles}>
                <Accordion defaultActiveKey="0">
                    <div className={`${completed} ${deadlineIsToday}`}>
                    </div>
                    <Accordion.Item eventKey={task.id}>
                        <Accordion.Header>{task.title}</Accordion.Header>
                        <Accordion.Body>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Created At: {new Date(task.created_at).toLocaleString()}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Deadline: {new Date(task.deadline).toLocaleString()}</Card.Subtitle>
                                    <Card.Text>
                                        {task.description}
                                    </Card.Text>
                                    <blockquote className="blockquote mb-0">
                                        <p>
                                            {' '}
                                            Category: {task.category}{' '}
                                        </p>
                                        <footer className="blockquote-footer">
                                            Task added by <cite title="Source Title">{task.created_by}</cite>
                                        </footer>
                                    </blockquote>
                                </Card.Body>
                            </Card>
                            <Button style={{ margin: "5px" }} variant="outline-danger" onClick={() => onDeleteTask(task)}>Delete Task</Button>
                            <Button style={{ margin: "5px" }} variant="warning" onClick={() => onEditTask(task)}>Edit Task</Button>
                            <Button style={{ margin: "5px" }} variant={task.completed ? "secondary" : "success"} onClick={() => { handleFinishTask(task._id) }}>{task.completed ? "Undo" : "Finish task"}</Button>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </>
    )
}