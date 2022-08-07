import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { removeToy } from '../../api/toys'
import EditToyModal from './EditToyModal'

const ShowToy =(props) => {
    // destructure some props
    const { toy, pet, user, msgAlert, triggerRefresh } = props

    const [editModalShow, setEditModalShow] = useState(false)

    const setBgCondition = (cond) => {
        if (cond === 'new') {
            return({width: '18rem', backgroundColor: '#b5ead7'})
        } else if (cond === 'used') {
            return({width: '18rem', backgroundColor: '#ffdac1'})
        } else if (cond === 'disgusting') {
            return({width: '18rem', backgroundColor: '#ff9aa2'})
        }
    }

    const destroyToy = () => {
        removeToy(user, pet._id, toy._id)
            .then(() => {
                msgAlert({
                    heading: 'Toy Deleted',
                    message: 'Toy was deleted.',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oops...',
                    message: 'There was a problem. Please try again.',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className="m-2" style={setBgCondition(toy.condition)}>
                <Card.Header>{toy.name}</Card.Header>
                <Card.Body>
                    <small>{toy.description}</small><br/>
                    <small>{toy.isSqueaky ? 'squeak squeak' : 'stoic silence'}</small>
                </Card.Body>
                <Card.Footer>
                    <small>Condition: {toy.condition}</small>
                    {
                        user && user._id === pet.owner._id
                        ?
                        <>
                        <br/>
                        <Button onClick={() => setEditModalShow(true)} variant='warning'>Edit Toy</Button>
                        <Button onClick={() => destroyToy()} variant='danger'>Delete Toy</Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditToyModal
                user={user}
                pet={pet}
                toy={toy}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowToy