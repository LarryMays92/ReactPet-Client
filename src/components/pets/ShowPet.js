import { useState, useEffect } from "react"
import { getOnePet } from "../../api/pets"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Card } from "react-bootstrap"

//useParams this will allow us to see our parameters
//useNavigate this will allow us navigate to a specific page

import LoadingScreen from "../shared/LoadingScreen"
import messages from '../shared/AutoDismissAlert/messages'

//We need to get the pet's id from the parameters
//Then we need to make a request to the api
//Then we need to display the results in this component
const ShowPet = (props) => {
    const [pet, setPet] = useState(null)
    const { id } = useParams()
    // ^^deconstructuring to get the id value from our route parameters
    const navigate = useNavigate()
    const { msgAlert } = props

    useEffect(() => {
        getOnePet(id)
            .then(res => setPet(res.data.pet))
            .catch(err => {
               msgAlert({heading: 'Error Getting Pets',
                message: messages.getPetsFailure,
                   variant: 'danger',
               })
                navigate('/')
                //navigate back to the homepage if there's an error
            })
    }, [])
    
    if (!pet) {
        return<LoadingScreen/>
    }
    return (
        <Container calssName="fluid">
            <Card>
                <Card.Header>{pet.fullTitle}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div><small>Age:{pet.age}</small></div>
                        <div><small>Type:{pet.type}</small></div>
                        <div><small>Adoptable:{pet.adoptable ? 'yes' : 'no'}</small></div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}
export default ShowPet