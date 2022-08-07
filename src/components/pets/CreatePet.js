import { useState } from 'react'
import { createPet } from '../../api/pets'
import { useNavigate } from 'react-router-dom'
import { createPetSuccess, createPetFailure } from '../shared/AutoDismissAlert/messages'
import PetForm from '../shared/PetForm'

const CreatePet = (props) => {
    console.log('these are the props in createPet\n', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [pet, setPet] = useState({
        name: '',
        type: '',
        age: '',
        adoptable: false
    })

    console.log('this is pet in createPet', pet)

    const handleChange = (e) => {
        setPet(prevPet => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }

            // this handles the checkbox, changing on to true etc
            if (updatedName === "adoptable" && e.target.checked) {
                updatedValue = true
            } else if (updatedName === "adoptable" && !e.target.checked) {
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

    // We'll add a handleSubmit here that makes an api request, then handles the response
    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        createPet(user, pet)
            // if we're successful, navigate to the show page for the new pet
            .then(res => { navigate(`/pets/${res.data.pet.id}`)})
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createPetSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: createPetFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <PetForm 
            pet={ pet } 
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading="Add a new pet!"
        />
    )
}

export default CreatePet