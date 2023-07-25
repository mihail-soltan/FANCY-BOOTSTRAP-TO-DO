import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../SignUp/SignUp.css';
import { useState } from 'react';
import { signIn } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

export function SignIn() {

    const [payload, setPayload] = useState({})
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();

    async function login() {
        const response = await signIn(payload)
        if (rememberMe) {
            localStorage.setItem("rememberMe", rememberMe)
            localStorage.setItem("token", response.token);
        }
        if (!response.success) {
            alert(response.error)
            return;
        }
        localStorage.setItem("username", response.username)
        navigate("/tasks/all")
        return response
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setPayload((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    function checkboxValue(e) {
        setRememberMe(e.target.checked)
    }

    return (
        <Form className='sign-up-form'>
            <div className='flex column align-end'>
                <Form.Control className="w-100 m-3" onChange={handleChange} name="email" type="text" placeholder="email" />
                <Form.Control className="w-100 m-3" onChange={handleChange} name="password" type="password" placeholder="password" />
                <div className='flex justify-between'>
                    <Form.Check
                        type="checkbox"
                        id="rememberMe"
                        label="rememberMe"
                        style={{ color: "white" }}
                        onChange={checkboxValue}
                    />

                    <Button className='align-right mx-3' variant="success" onClick={login}>Sign In</Button>
                </div>
            </div>
        </Form>
    )
}