import React, { useEffect, useState } from 'react'
import { url } from '../config/config';
import { Alert, Spinner } from 'react-bootstrap';

export default function CategoriesSinglePostComponent({id}) {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)

    useEffect(() => {
        const getCategory = async () => {
            const arrayCategories = [];
            
            for(const idCategory of id){
                try{
                    setLoading(true)
                    const response = await fetch(url + 'categories/' + idCategory)
                    if(response.ok){
                        setLoading(false)
                        const json = await response.json()
                        arrayCategories.push(json)
                    }
                }catch(error){
                    console.error(error)
                    setLoading(false)
                    setErrorMsg(true)
                }
            }
            setCategories(arrayCategories)
        }
        getCategory()
    }, [id])

    

  return (
    <>
        {loading && <Spinner animation="border" size="sm" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>}
        {errorMsg && <Alert variant="danger">
            Errore nel caricamento del post!!!
            </Alert>}
        {categories && 
        categories.map((c)=>(
        <p key={c.id} className='my-0 ms-2'>{c.name}</p>
    ))}
    </>
    
  )
}
