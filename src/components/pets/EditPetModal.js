import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PetForm from '../shared/PetForm'
import { updatePetSuccess, updatePetFailure } from '../shared/AutoDismissAlert/messages'

const EditPetModal = (props) => {
    const { 
        user, show, handleClose, 
        updatePet, msgAlert, triggerRefresh
    } = props

    const [pet, setPet] = useState(props.pet)

    const handleChange = (e) => {
        setPet(prevPet => {
            let updatedValue = e.target.value
            const updatedName = e.target.name
            console.log('this is the input type', e.target.type)
            // this condition handles age and converting it to a number
            if (e.target.type === 'number') {
                // this looks at the input type of the field and changing it from default (string) to a number
                updatedValue = parseInt(e.target.value)
            }
            // this condition handles the checkbox and changing it to true/false
            if (updatedName === 'adoptable' && e.target.checked) {
                updatedValue = true
            } else if (updatedName ==='adoptable' && !e.target.checked) {
                updatedValue = false
            }
            const updatedPet = {
                [updatedName]: updatedValue
            }
            return {
                ...prevPet,
                ...updatedPet
            }
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        updatePet(user, pet)
            // if creation is successful, navigate to the show page and send a message to the user
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success!',
                    message: messages.updatePetSuccess,
                    variant: 'success'
                })
            })
            .then(() => {
                // this triggers a "refresh" of the component by updating the 'updated' hook on the show page to true
                // this triggers a new API call to 'refresh' the page without actually refreshing and signing the user out
                // updated is in the ShowPet component's useEffect dependency array so it will run again
                triggerRefresh()
            })
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.updatePetFailure,
                    variant: 'danger'
                })
            })
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <PetForm pet={pet} heading="Update Pet" handleChange={handleChange} handleSubmit={handleSubmit}/>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default EditPetModal





