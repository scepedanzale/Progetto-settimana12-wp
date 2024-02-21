import React, { useState } from 'react'
import { InputGroup, Form, Button, Container, Row, Col, Spinner, Alert, ListGroup } from 'react-bootstrap'
import { url } from '../config/config';
import SinglePostComponent from './SinglePostComponent';
import { Link } from 'react-router-dom';

export default function SearchComponent() {

    
    const [input, setInput] = useState('');
    
    const [postsResult, setPostsResults] = useState([]);
    const [categoriesResult, setCategoriesResults] = useState([]);
    const [usersResult, setUsersResults] = useState([]);
    
    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const [loadingPosts, setLoadingPosts] = useState(false)
    const [errorMsgPosts, setErrorMsgPosts] = useState(false)
    const [checkPosts, setCheckPosts] = useState(false)
    
    const searchPosts = () => {
        setLoadingPosts(true)
        fetch(url + 'posts?search=' + input)
        .then(response => response.json())
        .then(json => {
            if(json.length===0){
                setCheckPosts(true)
            }
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
    const [checkCategories, setCheckCategories] = useState(false)

    const searchCategories = () => {
        setLoadingCategories(true)
        fetch(url + 'categories?search=' + input)
        .then(response => response.json())
        .then(json => {
            if(json.length===0){
                setCheckCategories(true)
            }
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

    const [loadingUsers, setLoadingUsers] = useState(false)
    const [errorMsgUsers, setErrorMsgUsers] = useState(false)
    const [checkUsers, setCheckUsers] = useState(false)

    const searchUsers = () => {
        setLoadingUsers(true)
        fetch(url + 'users?search=' + input)
        .then(response => response.json())
        .then(json => {
            if(json.length===0){
                setCheckUsers(true)
            }
            setLoadingUsers(false)
            setUsersResults(json)
            console.log(json)
        })
        .catch(error => {
            setLoadingUsers(false)
            setErrorMsgUsers(true)
            console.error(error)
        })
    }
    
    const handleSubmit = () => {
        searchPosts()
        searchCategories()
        searchUsers()
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
            <Row>
                <div className='d-flex align-items-center'>
                    <h2 className='text-primary me-3'>Categorie</h2>
                    {loadingCategories && <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                </div>
                {errorMsgCategories && <Alert variant="danger">
                Errore nel caricamento del post!!!
                </Alert>} 
                {categoriesResult.length>0 ? 
                    (<Col xs={12} sm={6} md={4} className='my-3'>
                        <p className='text-secondary'>Numero di categorie trovate: {categoriesResult.length}</p>
                        <ListGroup>
                            {categoriesResult.map(category => (
                                <ListGroup.Item key={category.id}>
                                    <Link to={`/posts/category/${category.id}/${category.name}`}>{category.name}</Link>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>)
                    :
                    (checkCategories && <p>Non risultano categorie dalla tua ricerca</p>)
                }
            </Row>
            
            <Row className='my-3'>
                <div className='d-flex align-items-center'>
                    <h2 className='text-primary me-3'>Utenti</h2>
                    {loadingUsers && <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                </div>
                {errorMsgUsers && <Alert variant="danger">
                Errore nel caricamento degli utenti!!!
                </Alert>} 
                {usersResult.length>0 ? 
                (<Col xs={12} sm={6} md={4} className='my-3'>
                    <p className='text-secondary'>Numero di utenti trovati: {usersResult.length}</p>
                    <ListGroup>
                        {usersResult.map(user => (
                            <ListGroup.Item key={user.id}>
                                <Link to={`/posts/author/${user.id}/${user.name}`} className='text-primary'>{user.name}</Link>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>)
                :
                (checkUsers && <p>Non risultano utenti dalla tua ricerca</p>)
                }
            </Row>

            <Row>
                <div className='d-flex align-items-center'>
                    <h2 className='text-primary me-3'>Posts</h2>
                    {loadingPosts && <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                </div>
                {errorMsgPosts && <Alert variant="danger">
                Errore nel caricamento del post!!!
                </Alert>} 
                {postsResult.length>0 ? 
                (   
                    <>
                        <p className='text-secondary'>Numero di post trovati: {postsResult.length}</p>
                        {postsResult.map(post => (
                            <Col xs={12} sm={6} md={4} key={post.id} className='my-3'>
                                <SinglePostComponent post={post}/>
                            </Col>
                        ))}
                    </>
                )
                :
                (checkPosts && <p>Non risultano post dalla tua ricerca</p>)
                }
            </Row>
        </Container> 
    </>
  )
}
