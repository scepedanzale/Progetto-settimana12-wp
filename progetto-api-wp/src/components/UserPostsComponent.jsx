import React, { useEffect, useState } from 'react'
import { url } from '../config/config';
import { Link, useParams } from 'react-router-dom';
import { Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import SinglePostComponent from './SinglePostComponent';

export default function UserPostsComponent() {

    const { id } = useParams()
    const { name } = useParams()

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)

    useEffect(()=>{
        setLoading(true)
        fetch(url + 'posts?author=' + id)
        .then(response => response.json())
        .then(json=>{
            console.log(json)
            setPosts(json);
            setLoading(false)
        })
        .catch(error => {
            console.error(error)
            setLoading(false)
            setErrorMsg(true)
        })
    }, [])
    console.log(posts)
  return (
    <Container className='my-3'>
        <Row>
            <h1>Posts di {name}</h1>
            {loading && <Spinner size='sm' animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>}
            {errorMsg && <Alert variant="danger">
            Errore nel caricamento dei post!!!
            </Alert>}
            {posts &&
            posts.map((p)=>(
                <Col xs={12} sm={6} md={4} key={p.id} className='my-3'>
                    <SinglePostComponent post={p}/>
                </Col>
            ))}
        </Row>
    </Container>
  )
}
