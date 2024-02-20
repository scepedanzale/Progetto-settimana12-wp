import React, { useEffect, useState } from 'react';
import { url } from '../config/config';
import { Alert, Spinner } from 'react-bootstrap';

export default function AuthorSinglePostComponent({id}) {

    const [author, setAuthor] = useState([]);
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)

    useEffect(()=>{
        setLoading(true)
        fetch(url + 'users/' + id)
        .then(response => response.json())
        .then(json => {
            setLoading(false)
            setAuthor(json)
        })
        .catch(error => {
            setLoading(false)
            setErrorMsg(true)
            console.error(error)
        })
    }, [])

  return (
    <>
        {loading && <Spinner animation="border" size="sm" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>}
        {errorMsg && <Alert variant="danger">
            Errore nel caricamento del post!!!
            </Alert>}
        {author && <span>{author.name}</span>}
    </>
    
  )
}
