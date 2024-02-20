import React from 'react'
import AuthorSinglePostComponent from './AuthorSinglePostComponent';
import {Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function SinglePostComponent({post}) {
    
  return (
    <Card>
      <Card.Body>
        <Card.Title>{post.title.rendered}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
            <span>{post.date.slice(0, 10)}</span>
        </Card.Subtitle>
        <Card.Text dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></Card.Text>
        <Card.Text>
            <Link to={`/posts/${post.id}`} className='text-primary'>Continua a leggere...</Link>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
