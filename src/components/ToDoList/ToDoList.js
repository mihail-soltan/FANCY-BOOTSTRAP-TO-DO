import './ToDoList.css'
import { ToDoItem } from '../ToDoItem/ToDoItem'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { AddItemModal } from '../AddItemModal/AddItemModal';
import DeleteToast from '../Toast/DeleteToast';

export function ToDoList() {
    const categories = ["school", "work", "sports", "chores"]
    const [showModal, setShowModal] = useState(false)
    const [showDeleteToast, setShowDeleteToast] = useState(true)

    const [tasks, setTasks] = useState([
        {
            id: Math.floor(Math.random() * 100000000),
            title: "Go shopping",
            description: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            category: categories[Math.floor(Math.random() * categories.length)],
            created_at: new Date(),
            created_by: "eu",
            deadline: new Date()
        },
        {
            id: Math.floor(Math.random() * 100000000),
            title: "Do something else",
            description: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            category: categories[Math.floor(Math.random() * categories.length)],
            created_at: new Date(),
            created_by: "eu",
            deadline: new Date()
        },
        {
            id: Math.floor(Math.random() * 100000000),
            title: "Lorem Ipsum",
            description: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            category: categories[Math.floor(Math.random() * categories.length)],
            created_at: new Date(),
            created_by: "eu",
            deadline: new Date()
        },
    ])

    const onAddNewItem = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }
    const toggleToast = () =>{
        setShowDeleteToast(!showDeleteToast)
    }

    return (<div className='to-do-list'>
        <h1 style={{ color: "#fff" }}>To Do List</h1>
        <Button variant="outline-warning" onClick={onAddNewItem}>Add New Item</Button>
        <AddItemModal
            show={showModal}
            closeModal={closeModal}
            addNewTask={setTasks}
            categories={categories}
            tasks={tasks}
        />
       
        {
            tasks.map((item) =>
                <ToDoItem key={item.id} task={item} categories={categories} tasks={tasks} setTasks={setTasks} showDeleteToast={showDeleteToast} setShowDeleteToast={setShowDeleteToast} />
            )
        }
         <DeleteToast
            show={showDeleteToast}
            toggleToast={toggleToast}
        />
    </div>)
}