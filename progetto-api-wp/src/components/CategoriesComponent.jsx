import React, { useEffect, useState } from 'react'
import { url } from '../config/config';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CategoriesComponent() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)

    useEffect(()=>{
        setLoading(true)
        fetch(url + 'categories')
        .then(response => response.json())
        .then(json=>{
            setLoading(false)
            setCategories(json);
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
                <h1>Categorie</h1>
                <p className='text-secondary'>Numero di categorie: {categories.length}</p>
                {loading && <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
                {errorMsg && <Alert variant="danger">
                Errore nel caricamento dei post!!!
                </Alert>}
                {categories && 
                categories.map(c => (
                    <Col xs={12} sm={6} md={4} key={c.id} className='my-3'>
                        <Link to={`/posts/category/${c.id}/${c.name}`}>{c.name}</Link>
                    </Col>
                ))}
            </Row>
        </Container>
    </>
  )
}
