import { useState, useEffect } from 'react'
import { getCategories, addNewCategory, getCategoriesByUser } from '../../services/category.service'
import './Category.css'
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import { exportData } from '../../services/task.service';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { EditOrDeleteCategory } from '../EditOrDeleteCategory/EditOrDeleteCategory';

export function Category() {

    const [categories, setCategories] = useState([])
    const [newCategory, setNewCategory] = useState("")
    const [show, setShow] = useState(false)
    const [importedCategories, setImportedCategories] = useState([])
    const localCategories = JSON.parse(localStorage.getItem("localCategories"))

    async function onGetCategories() {
        const user = JSON.parse(localStorage.getItem("user"))
        const response = await getCategoriesByUser(user._id)
        setCategories(response)
    }
    function handleChange(e) {
        setNewCategory(e.target.value)
    }

    async function onAddCategory() {
        const user = JSON.parse(localStorage.getItem("user"))
        const isGuest = eval(localStorage.getItem("isGuest"))
        if (user) {
            const body = { name: newCategory, created_by: user._id }
            const response = await addNewCategory(body)
            setCategories([])
            onGetCategories()
            setNewCategory('')
            return response
        }
        if (isGuest) {
            const body = { name: newCategory, created_by: 'Guest' }
            setCategories((prev) => ([...prev, body]))
            localCategories ?
                localStorage.setItem("localCategories", JSON.stringify([...localCategories, body])) :
                localStorage.setItem("localCategories", JSON.stringify([body]))
            setNewCategory('')
        }
    }

    function closeModal() {
        setShow(false)
    }
    //JSON.parse(localStorage.getItem("user"))

    async function addImportedCategories() {
        let userId = JSON.parse(localStorage.getItem("user"))._id
        importedCategories.forEach(async (element) => {
            const body = { name: element.name, created_by: userId }
            const response = await addNewCategory(body)
            return response
        })
    }
    const onFileUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const jsonString = e.target.result
                    const jsonObject = JSON.parse(jsonString)

                    setImportedCategories(jsonObject)
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
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        const isGuest = eval(localStorage.getItem("isGuest"))
        if (user) {
            onGetCategories()
        }
        if (isGuest) {
            localCategories ?
                setCategories(localCategories) : setCategories([])
        }
    }, [])


    return (
        <div className='category-container'>

            <InputGroup className="mb-3 w-50">
                <InputGroup.Text id="inputGroup-sizing-default">
                    New Category
                </InputGroup.Text>
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={handleChange}
                    value={newCategory}
                />
                <Button onClick={onAddCategory} variant="success">Add</Button>{' '}
                <Button onClick={() => exportData(localCategories, "localCategories")} variant="outline-info">Export Categories</Button>
                <Button onClick={addImportedCategories} variant="outline-info">Add Imported Categories</Button>
                <Form.Control className='mx-2' type="file" onChange={onFileUpload} />
            </InputGroup>
            {/* categories.length? fa asta : fa altceva */}
            <ListGroup defaultActiveKey="#link1">
                {categories.length ? categories.map((category) =>
                    <>
                        <EditOrDeleteCategory show={show} category={category} closeModal={closeModal} />
                        <ListGroup.Item action onClick={() => setShow(true)} key={category._id}>
                            {category.name}
                        </ListGroup.Item> </>) : <Spinner animation="border" role="status" variant="warning">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                }
            </ListGroup>
        </div>


    )

}