import React from 'react'
import { Container, Row } from 'react-bootstrap'
import SearchComponent from '../components/SearchComponent'

export default function HomePage() {
  return (
    <Container className='my-3'>
      <Row>
        <h1>Home</h1>
        <SearchComponent/>
      </Row>
    </Container>
  )
}
