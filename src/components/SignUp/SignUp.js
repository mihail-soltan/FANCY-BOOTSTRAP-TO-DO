import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './SignUp.css';
import { useState } from 'react';
import { passwordsMatch } from '../../helpers/helpers';
import { signUp } from '../../services/auth.service';
import { Link, useNavigate } from 'react-router-dom';

export function SignUp({ setIsGuest }) {

    const [payload, setPayload] = useState({})
    const [repeatedPassword, setRepeatedPassword] = useState("")

    const navigate = useNavigate()


    async function sendData() {
        const isPasswordValid = passwordsMatch(repeatedPassword, payload.password);
        if (!isPasswordValid) {
            alert("Parola gresita")
            return
        }
        const response = await signUp(payload)
        console.log(response)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setPayload((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    //loginAsGuest()
    function loginAsGuest() {
        setIsGuest(true)
        localStorage.setItem("isGuest", true)
        // localStorage.setItem("localTasks", "[]")
        // localStorage.setItem("localCategories", "[]")
        navigate("/tasks/all")
    }


    return (
        <div className='flex h-100'>
            <Form className='sign-up-form'>
                <div className='flex column align-end'>
                    <Form.Control className="w-100 m-3" onChange={handleChange} name="username" type="text" placeholder="User name" />
                    <Form.Control className="w-100 m-3" onChange={handleChange} name="email" type="text" placeholder="email" />
                    <Form.Control className="w-100 m-3" onChange={handleChange} name="password" type="password" placeholder="Password" />
                    <Form.Control className="w-100 m-3" onChange={(e) => setRepeatedPassword(e.target.value)} type="password" placeholder="Repeat Password" />
                    <div className='flex justify-between'>

                        <Link className="w-100 m-3" to="/signin">Already have an account?</Link>
                        <Button className="m-3 w-100" onClick={sendData} variant="success">Sign Up</Button>
                        <Button className="m-3 w-100" onClick={loginAsGuest} variant="primary">Log in as a guest</Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}