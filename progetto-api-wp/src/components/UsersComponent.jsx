import React, { useEffect, useState } from 'react'
import { Alert, Col, Container, Row, Spinner, Form } from 'react-bootstrap'
import { url } from '../config/config';
import UserPostsComponent from './UserPostsComponent';
import { Link } from 'react-router-dom';

export default function UsersComponent() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)

    useEffect(()=>{
        setLoading(true)
        fetch(url + 'users')
        .then(response => response.json())
        .then(json=>{
            setLoading(false)
            console.log(json)
            setUsers(json);
        })
        .catch(error => {
            setErrorMsg(true)
            console.error(error)
        })
    }, [])

  return (
    <Container className='my-3'>
      
        <h1>Lista Utenti</h1>
        <p className='text-secondary'>Numero di utenti: {users.length}</p>
        {loading && <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>}
        {errorMsg && <Alert variant="danger">
        Errore nel caricamento degli utenti!!!
        </Alert>}
           {users && 
            users.map(u => (
              <Row className='user-row my-3 py-2 align-items-center rounded-2 bg-body-tertiary'>
                <Col className="text-primary fw-bold">
                  {u.name}
                </Col>
                <Col>
                    <Link to={`/posts/author/${u.id}/${u.name}`} className='text-primary'>Vedi i post dell'utente</Link>
                </Col>
              </Row>
            ))}
    </Container>
  )
}
