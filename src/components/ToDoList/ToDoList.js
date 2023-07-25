import './ToDoList.css'
import { ToDoItem } from '../ToDoItem/ToDoItem'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { AddItemModal } from '../AddItemModal/AddItemModal';
import DeleteToast from '../Toast/DeleteToast';
import Form from 'react-bootstrap/Form';
import { getTasks, addNewTask, editTask, toggleCompletedTask, deleteTask } from '../../services/task.service';
import { getCategories } from '../../services/category.service';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export function ToDoList() {
    const [showModal, setShowModal] = useState(false)
    const [showDeleteToast, setShowDeleteToast] = useState(false)
    const [categories, setCategories] = useState([])
    const [tasks, setTasks] = useState([])

    const [filter, setFilter] = useState("")
    const [sort, setSort] = useState("")

    const params = useParams()

    const onAddNewItem = () => {
        setShowModal(true)
    }

    async function onGetCategories() {
        const response = await getCategories()
        setCategories(response)
    }
    const closeModal = () => {
        setShowModal(false)
    }
    const toggleToast = () => {
        setShowDeleteToast(!showDeleteToast)
    }

    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    }
    const handleSortChange = (e) => {
        setSort(e.target.value)
    }

    const filteredTasks = tasks.filter(task => {
        return filter === "" || task.category === filter
    })

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sort === 'asc') {
            console.log("asc")
            return new Date(a.deadline) - new Date(b.deadline)
        }
        else if (sort === 'desc') {
            console.log("desc")
            return new Date(b.deadline) - new Date(a.deadline)
        }
        else {
            return 0
        }
    })

    const getAllTasks = async (category) => {
        setTasks([])
        const response = await getTasks(category)
        setTasks(response)
    }

    const addTask = async (body) => {
        const response = await addNewTask(body)
        getAllTasks("all")
        return response
    }

    const editCurrentTask = async (body, taskId) => {
        const response = await editTask(body, taskId)
        getAllTasks("all")
        return response
    }

    const handleFinishedTask = async (taskId) => {
        const response = await toggleCompletedTask(taskId)
        getAllTasks("all")
        return response
    }

    const handleDeleteTask = async (taskId) => {
        const response = await deleteTask(taskId)
        getAllTasks("all")
        return response
    }

    useEffect(() => {
        getAllTasks(params.category)
        onGetCategories()
        console.log(params)
    }, [params])

    return (<div className='to-do-list'>
        <h1 style={{ color: "#fff" }}>To Do List</h1>
        <div>
        <Button className='mx-2' variant="outline-warning" onClick={onAddNewItem}>Add New Item</Button>
        <Link className='mx-2'to="/categories">
            <Button variant="outline-success" >Add New Category</Button>
        </Link>
        </div>
        <AddItemModal
            show={showModal}
            closeModal={closeModal}
            categories={categories}
            tasks={tasks}
            addTask={addTask}
        />
        <div className='flex'>
            {/* <Form.Select style={{ "margin": "1rem" }} aria-label="filter by category" onChange={handleFilterChange}>
                <option value="">Filter by category</option>
                {categories.map((cat, index) =>
                    <option key={index} value={cat}>{cat}</option>
                )}
            </Form.Select> */}
            {categories.length ? categories.map((category) =>
                <Link className='w-100 m-3' to={`/tasks/${category.name}`}>
                    <Button variant="outline-light" key={category._id}>{category.name}</Button></Link>) : <Spinner animation="border" role="status" variant="warning">
                <span className="visually-hidden">Loading...</span>
            </Spinner>}

            <Form.Select style={{ "margin": "1rem" }} aria-label="sort" onChange={handleSortChange}>
                <option>Sort by deadline</option>
                <option value="asc">asc</option>
                <option value="desc">desc</option>
            </Form.Select>
        </div>
        {tasks.length ?
            sortedTasks.map((item) =>
                <ToDoItem
                    key={item._id}
                    task={item}
                    categories={categories}
                    tasks={tasks}
                    editCurrentTask={editCurrentTask}
                    setTasks={setTasks}
                    showDeleteToast={showDeleteToast}
                    setShowDeleteToast={setShowDeleteToast}
                    handleFinishedTask={handleFinishedTask}
                    handleDeleteTask={handleDeleteTask}
                />
            )
            : <Spinner animation="border" role="status" variant="warning">
                <span className="visually-hidden">Loading...</span>
            </Spinner>}
        <DeleteToast
            show={showDeleteToast}
            toggleToast={toggleToast}
        />
    </div>)
}