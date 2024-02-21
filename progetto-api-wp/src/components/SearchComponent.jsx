import React, { useState } from 'react'
import { InputGroup, Form, Button, Container, Row, Col, Spinner, Alert, ListGroup } from 'react-bootstrap'
import { url } from '../config/config';
import SinglePostComponent from './SinglePostComponent';

export default function SearchComponent() {

    const [loadingPosts, setLoadingPosts] = useState(false)
    const [errorMsgPosts, setErrorMsgPosts] = useState(false)
    
    const [input, setInput] = useState('');
    
    const [postsResult, setPostsResults] = useState([]);
    const [categoriesResult, setCategoriesResults] = useState([]);
    
    const handleChange = (e) => {
        setInput(e.target.value)
    }
    
    const searchPosts = () => {
        setLoadingPosts(true)
        fetch(url + 'posts?search=' + input)
        .then(response => response.json())
        .then(json => {
            setLoadingPosts(false)
            setPostsResults(json)
        })
        .catch(error => {
            setLoadingPosts(false)
            setErrorMsgPosts(true)
            console.error(error)
        })
    }
    
    const [loadingCategories, setLoadingCategories] = useState(false)
    const [errorMsgCategories, setErrorMsgCategories] = useState(false)

    const searchCategories = () => {
        setLoadingCategories(true)
        fetch(url + 'categories?search=' + input)
        .then(response => response.json())
        .then(json => {
            setLoadingCategories(false)
            setCategoriesResults(json)
            console.log(json)
        })
        .catch(error => {
            setLoadingCategories(false)
            setErrorMsgCategories(true)
            console.error(error)
        })
    }
    
    const handleSubmit = () => {
        searchPosts()
        searchCategories()
    }

    
  return (
    <>
        <Form>
            <InputGroup className="mb-3">
                <Form.Control
                placeholder="Cerca..."
                aria-label="cerca"
                aria-describedby="basic-addon1"
                value={input}
                onChange={(e)=>handleChange(e)}
                />
                <Button onClick={()=>handleSubmit()}><i className="bi bi-search"></i></Button>
            </InputGroup>        
        </Form>

        <Container className='my-3'>
            {loadingCategories && <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>}
            {errorMsgCategories && <Alert variant="danger">
            Errore nel caricamento del post!!!
            </Alert>} 
            <Row> 
                {categoriesResult.length>0 && 
                <>
                    <h2 className='text-primary'>Categorie</h2>
                    <Col xs={12} sm={6} md={4} className='my-3'>
                        <ListGroup>
                            {categoriesResult.map(category => (
                                <ListGroup.Item key={category.id}>{category.name}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </>
                }
            </Row>

            {loadingPosts && <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>}
            {errorMsgPosts && <Alert variant="danger">
            Errore nel caricamento del post!!!
            </Alert>} 
            <Row> 
                {postsResult.length>0 && 
                <>
                    <h2 className='text-primary'>Posts</h2>
                    {postsResult.map(post => (
                        <Col xs={12} sm={6} md={4} key={post.id} className='my-3'>
                            <SinglePostComponent post={post}/>
                        </Col>
                    ))}
                </>
                }
            </Row>
        </Container> 
    </>
  )
}
