import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

export function DeleteToast({ show, toggleToast }) {

    return (
        <Row>
            
                <Toast show={show} onClose={toggleToast}>
                    <Toast.Header>
                        <small>now</small>
                    </Toast.Header>
                    <Toast.Body>Task deleted successfully</Toast.Body>
                </Toast>

        </Row>
    );
}

export default DeleteToast;