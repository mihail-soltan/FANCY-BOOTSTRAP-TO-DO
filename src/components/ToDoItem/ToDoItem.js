import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import "./ToDoItem.css"
export function ToDoItem({ task }) {
    const styles = {
        width: "50%"
    }
    return (
        <div style={styles}>
            <Accordion defaultActiveKey="0" variant="secondary">
                <Accordion.Item eventKey={task.id}>
                    <Accordion.Header>{task.title}</Accordion.Header>
                    <Accordion.Body>
                        <Card>
                            <Card.Body>
                                <Card.Title>Created At: {task.created_at.toLocaleString()}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Deadline: {task.deadline.toLocaleString()}</Card.Subtitle>
                                <Card.Text>
                                    {task.description}
                                </Card.Text>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>{task.category}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}