import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { url } from '../config/config';
import { Col, Container, Row, Spinner, Alert } from 'react-bootstrap';
import AuthorSinglePostComponent from '../components/AuthorSinglePostComponent';
import CategoriesSinglePostComponent from '../components/CategoriesSinglePostComponent';

export default function PostDetailPage() {

    const {id} = useParams();

    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)

    useEffect(()=>{
        setLoading(true)
        fetch(url + '/posts/' +id)
        .then(response => response.json())
        .then(json => {
            setLoading(false)
            setPost(json);
        })
        .catch(err=>{
            console.log(err)
            setLoading(false)
            setErrorMsg(true)
        })
    }, [id])

  return (
    <>
        {loading && <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>}
        {errorMsg && <Alert variant="danger">
            Errore nel caricamento del post!!!
            </Alert>}
        {post.content &&
        <Container className='my-3'>
            <Row className='w-100'>
                <Col xs={12} className='text-secondary py-2'>
                    <div className='m-0'><span className='fw-bold'>Autore: </span><AuthorSinglePostComponent id={post.author}/></div>
                    <div className='m-0'><span className='fw-bold'>Data: </span>{post.date.slice(0, 10)}</div>
                    <div className='m-0'><span className='fw-bold'>Categorie: </span><CategoriesSinglePostComponent id={post.categories}/></div>
                </Col>
                <Col xs={12} className='w-100 my-3' dangerouslySetInnerHTML={{ __html: post.content.rendered }}></Col>
            </Row>
        </Container>}
    </>
  )
}
