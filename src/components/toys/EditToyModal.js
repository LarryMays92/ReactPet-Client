import React, {useState} from 'react'
import { Modal } from 'react-bootstrap'
import ToyForm from '../shared/ToyForm'
import { updateToy } from '../../api/toys'

const EditToyModal = (props) => {
    const {msgAlert, pet, user, show, handleClose, triggerRefresh} = props

    const [toy, setToy] = useState(props.toy)

    const handleChange = (e) => {
        setToy(prevToy => {
            let value = e.target.value
            const name = e.target.name

            // console.log('this is the input type', e.target.type)

            // this condition handles the checkbox and changing it to true/false
            if (name === 'isSqueaky' && e.target.checked) {
                value = true
            } else if (name ==='isSqueaky' && !e.target.checked) {
                value = false
            }

            const updatedToy = {
                [name]: value
            }
            return {
                ...prevToy,
                ...updatedToy
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateToy(user, pet._id, toy)
            // if creation is successful, navigate to the show page and send a message to the user
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success!',
                    message: 'Toy was updated.',
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
                    message: 'Something went wrong, please try again.',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <ToyForm toy={toy} heading="Update Toy" handleChange={handleChange} handleSubmit={handleSubmit}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditToyModal 