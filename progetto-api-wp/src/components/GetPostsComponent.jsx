import React, { useEffect, useState } from 'react'
import { url } from '../config/config'
import SinglePostComponent from '../components/SinglePostComponent';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';

export default function GetPostsComponent() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)

    useEffect(()=>{
        setLoading(true)
        fetch(url + 'posts')
        .then(response => response.json())
        .then(json=>{
            setLoading(false)
            setPosts(json);
        })
        .catch(error => {
            setErrorMsg(true)
            console.error(error)
        })
    }, [])

  return (
    <>
        <Container className='my-3'>
            <Row>
                <h1>Lista Post</h1>
                <p className='text-secondary'>Numero di post: {posts.length}</p>
                {loading && <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
                {errorMsg && <Alert variant="danger">
                Errore nel caricamento dei post!!!
                </Alert>}
                {posts && 
                posts.map(post => (
                    <Col xs={12} sm={6} md={4} key={post.id} className='my-3'>
                        <SinglePostComponent post={post}/>
                    </Col>
                ))}
            </Row>
        </Container>
    </>
  )
}
