import './ToDoList.css'
import { ToDoItem } from '../ToDoItem/ToDoItem'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { AddItemModal } from '../AddItemModal/AddItemModal';
import DeleteToast from '../Toast/DeleteToast';
import Form from 'react-bootstrap/Form';
import {
    getTasks,
    addNewTask,
    editTask,
    toggleCompletedTask,
    deleteTask,
    getTasksByUser,
    exportData,
} from '../../services/task.service';
import { getCategories, getCategoriesByUser } from '../../services/category.service';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { MaterialReactTable } from 'material-react-table';

export function ToDoList() {
    const [showModal, setShowModal] = useState(false)
    const [showDeleteToast, setShowDeleteToast] = useState(false)
    const [categories, setCategories] = useState([])
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [filter, setFilter] = useState("")
    const [sort, setSort] = useState("")
    const [user, setUser] = useState({})
    const [importedTasks, setImportedTasks] = useState([])
    const params = useParams()
    const cachedUser = JSON.parse(localStorage.getItem("user"))
    const isGuest = eval(localStorage.getItem("isGuest"))
    const localTasks = JSON.parse(localStorage.getItem("localTasks"))
    const localCategories = JSON.parse(localStorage.getItem("localCategories"))

    const onAddNewItem = () => {
        setShowModal(true)
    }

    async function onGetCategories(userId) {
        setIsLoading(true)
        const response = await getCategoriesByUser(userId)
        setCategories([{ name: "all", _id: Math.floor(Math.random() * 1000000000) }, ...response])
        setIsLoading(false)
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
        if (cachedUser) {
            setIsLoading(true)
            const response = await addNewTask(body)
            getUserTasks(user._id, params.category)
            setIsLoading(false)
            return response
        }
        else {
            setTasks((prev) => ([...prev, body]))
            localStorage.setItem("localTasks", JSON.stringify([...tasks, body]))
        }
    }

    const editCurrentTask = async (body, taskId) => {
        console.log("BODY: ", body)
        console.log("TASK ID: ", taskId)
        if (cachedUser) {
            const response = await editTask(body, taskId)
            getUserTasks(user._id, params.category)
            return response
        }
        else {
            console.log(localTasks)
            let currentTaskIndex = localTasks.findIndex((task) => task._id === taskId)
            if (currentTaskIndex.toString()) {
                localTasks[currentTaskIndex] = { _id: taskId, ...body }
                console.log(localTasks)
            }
            setTasks(localTasks)

            // console.log(currentTask)
            localStorage.setItem("localTasks", JSON.stringify(localTasks))
        }
    }

    const handleFinishedTask = async (taskId) => {
        if (cachedUser) {

            const response = await toggleCompletedTask(taskId)
            getUserTasks(user._id, params.category)
            return response
        } else {
            let currentTaskIndex = localTasks.findIndex((task) => task._id === taskId)
            let currentTask = localTasks.filter((t) => t._id === taskId)
            localTasks[currentTaskIndex] = { ...currentTask[0], completed: true }
            setTasks(localTasks)
            localStorage.setItem("localTasks", JSON.stringify(localTasks))
        }
    }

    const handleDeleteTask = async (taskId) => {
        if (cachedUser) {
            const response = await deleteTask(taskId)
            getUserTasks(user._id, params.category)
            return response
        }
        else {
            let filteredTasks = localTasks.filter((task) => task._id !== taskId)
            setTasks(filteredTasks)
            localStorage.setItem("localTasks", JSON.stringify(filteredTasks))
        }
    }

    const getUserTasks = async (userId, category) => {
        // setTasks([])
        setIsLoading(true)
        const response = await getTasksByUser(userId, category)
        setTasks(response.data)
        setIsLoading(false)
    }

    const onFileUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const jsonString = e.target.result
                    const jsonObject = JSON.parse(jsonString)

                    setImportedTasks(jsonObject)
                } catch (err) {
                    console.log(`Something went wrong: ${err}`)
                }
            }

            reader.onerror = () => {
                console.log(`Something went wrong:`)
            }

            reader.readAsText(file)
        }
        else {
            console.log("No file selected")
        }
    }

    async function addImportTasks() {
        let userId = JSON.parse(localStorage.getItem("user"))._id;
        importedTasks.forEach(async (element) => {
            let body = { ...element, created_by: userId }
            const { _id, ...newBody } = body
            await addNewTask(newBody)
        })
        await getUserTasks(userId, params.category)
    }

    useEffect(() => {
        console.log(tasks)
        if (cachedUser) {

            setUser(cachedUser)
            // getAllTasks(params.category)
            onGetCategories(cachedUser._id)

            getUserTasks(cachedUser._id, params.category)
        }
        if (isGuest) {
            setCategories([{ name: "all", _id: Math.floor(Math.random() * 1000000000) }])
            localTasks ? setTasks(localTasks) : setTasks([])
            localCategories ? setCategories(localCategories) : setCategories([])
            if (params.category === "all") {
                return
            }
            const filteredTasks = localTasks.filter((task) => task.category === params.category)
            setTasks(filteredTasks)
        }

    }, [params])

    return (<div className='to-do-list'>
        <h1 style={{ color: "#fff" }}>To Do List</h1>
        <div>
            <Button className='mx-2' variant="outline-warning" onClick={onAddNewItem}>Add New Item</Button>
            <Link className='mx-2' to="/categories">
                <Button variant="outline-success" >Add New Category</Button>
            </Link>
            <Button className='mx-2' variant="outline-info" onClick={() => exportData(localTasks, "tasks")}>Export Tasks</Button>
            <Button className='mx-2' variant="light" onClick={addImportTasks}>Import Tasks</Button>
            <Form.Control className='mx-2' type="file" onChange={onFileUpload} />
        </div>
        <AddItemModal
            show={showModal}
            closeModal={closeModal}
            categories={categories}
            tasks={tasks}
            addTask={addTask}
            user={user}
        />
        <div className='flex'>
            {/* <Form.Select style={{ "margin": "1rem" }} aria-label="filter by category" onChange={handleFilterChange}>
                <option value="">Filter by category</option>
                {categories.map((cat, index) =>
                    <option key={index} value={cat}>{cat}</option>
                )}
            </Form.Select> */}
            {!isLoading ? categories.map((category) =>
                <Link key={category._id} className='w-100 m-3' to={`/tasks/${category.name}`}>
                    <Button variant="outline-light">{category.name}</Button></Link>) : <Spinner animation="border" role="status" variant="warning">
                <span className="visually-hidden">Loading...</span>
            </Spinner>}

            <Form.Select style={{ "margin": "1rem" }} aria-label="sort" onChange={handleSortChange}>
                <option>Sort by deadline</option>
                <option value="asc">asc</option>
                <option value="desc">desc</option>
            </Form.Select>
        </div>
        {!isLoading ?
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
                    user={user}
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