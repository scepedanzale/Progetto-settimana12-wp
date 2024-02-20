import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { url } from '../config/config';

export default function UsersPage() {

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
     {/*  <Row>
        <h1>Lista Utenti</h1>
        {loading && <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>}
        {errorMsg && <Alert variant="danger">
        Errore nel caricamento del post!!!
        </Alert>}
           {posts && 
        posts.map(post => (
            <Col xs={12} sm={6} md={4} key={post.id} className='my-3'>
                <SinglePostComponent post={post}/>
               </Col>
        ))}
      </Row> */}
    </Container>
  )
}
