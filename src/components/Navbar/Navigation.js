import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export const Navigation = ({setShow}) => {
    const username = localStorage.getItem('username')
    return (
        <Navbar variant="dark">
            <Container>
                <Navbar.Brand>Fancy Task Manager</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text onClick={()=>setShow(true)} style={{cursor: "pointer"}}>
                        Signed in as: {username ? username : "Guest"}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}