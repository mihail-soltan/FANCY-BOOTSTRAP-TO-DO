import { useState, useEffect } from 'react'
import { getCategories, addNewCategory } from '../../services/category.service'
import './Category.css'
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { EditOrDeleteCategory } from '../EditOrDeleteCategory/EditOrDeleteCategory';
import { getCategoriesByUser } from '../../services/category.service';

export function Category() {

    const [categories, setCategories] = useState([])
    const [newCategory, setNewCategory] = useState("")
    const [show, setShow] = useState(false)

    async function onGetCategories() {
        const user = JSON.parse(localStorage.getItem("user"))
        const response = await getCategoriesByUser(user._id)
        console.log(response)
        setCategories(response)
    }
    function handleChange(e) {
        setNewCategory(e.target.value)
    }

    async function onAddCategory() {
        const user = JSON.parse(localStorage.getItem("user"))
        const body = { name: newCategory, created_by: user._id }
        const response = await addNewCategory(body)
        setCategories([])
        onGetCategories()
        

        setNewCategory('')
        return response
    }

    const alertClicked = () => {
        alert('You clicked the third ListGroupItem');
    };

    function closeModal () {
        setShow(false)
    }
    
    useEffect(() => {
        onGetCategories()
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
            </InputGroup>
            {/* categories.length? fa asta : fa altceva */}
            <ListGroup defaultActiveKey="#link1">
                {categories.length ? categories.map((category) =>
                    <>
                        <EditOrDeleteCategory show={show} category={category} closeModal={closeModal}/>
                        <ListGroup.Item action onClick={()=> setShow(true)} key={category._id}>
                            {category.name}
                        </ListGroup.Item> </>) : <Spinner animation="border" role="status" variant="warning">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                }
            </ListGroup>
        </div>


    )

}