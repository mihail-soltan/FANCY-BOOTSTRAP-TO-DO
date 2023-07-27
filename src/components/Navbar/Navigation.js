import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { logout } from '../../services/auth.service';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Navigation = ({ setShow }) => {
    const username = localStorage.getItem('username')
    const token = localStorage.getItem("token")
    const [welcomeMessage, setWelcomeMessage] = useState('')
    const [signedIn, setSignedIn] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const onLogout = () => {
        logout()
        navigate("signin")
    }

    useEffect(() => {
        if (token && username) {
            setWelcomeMessage(`Signed in as ${username}`)
            setSignedIn(true)
        }
        else {
            setWelcomeMessage(`Please sign in`)
            setSignedIn(false)
        }
    }, [location])
    return (
        // to="/tasks/all"
        <Navbar variant="dark">
            <Container>
                <Link to='/tasks/all'>Fancy Task Manager</Link>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {signedIn && welcomeMessage}
                        {signedIn && <Button variant="link" onClick={onLogout}>Sign out</Button>}
                        {!signedIn && <Link to="/signin">{welcomeMessage}</Link>}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}