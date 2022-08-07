import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const ToyForm = (props) => {
    const {toy, handleChange, handleSubmit, heading} = props

    return (
        <Container className='justify-content-center'>
            <h1>{heading}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor='name'>Toy Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='name'
                        id="name"
                        value={toy.name}
                        placeholder='Enter toy name'
                        onChange={handleChange}
                    />
                    <Form.Label htmlFor='description'>Description</Form.Label>
                    <Form.Control
                        required
                        name='description'
                        id="description"
                        value={toy.description}
                        type='text'
                        placeholder='Enter toy description'
                        onChange={handleChange}
                    />
                    <Form.Label htmlFor='squeaky'>Is it squeaky?</Form.Label>
                    <Form.Check
                        name='isSqueaky'
                        type='checkbox'
                        defaultChecked={toy.isSqueaky}
                        // placeholder='Enter age'
                        onChange={handleChange}
                    />
                    <Form.Select
                        aria-label="toy condition"
                        name="condition"
                        defaultValue={toy.condition}
                        onChange={handleChange}
                    >
                        <option>Open this select menu</option>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                        <option value="disgusting">Disgusting</option>
                    </Form.Select>
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        </Container>
    )

}


export default ToyForm