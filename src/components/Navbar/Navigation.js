import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { logout } from '../../services/auth.service';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Navigation.css'

export const Navigation = ({ setShow }) => {
    const username = localStorage.getItem('username')
    const token = localStorage.getItem("token")
    const isGuest = localStorage.getItem("isGuest")
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
        else if (isGuest) {
            setWelcomeMessage("Signed in as guest")
        }
        else {
            setWelcomeMessage(`Please sign in`)
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
                        {!signedIn && !isGuest && <Link to="/signin">{welcomeMessage}</Link>}
                        {isGuest && <div className='flex column'> {welcomeMessage} <Link to="/signup">Please sign up, if you'd like</Link> </div>}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}