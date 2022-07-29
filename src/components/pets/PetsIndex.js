import {
    useState,
    useEffect
} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllPets } from '../../api/pets'
import messages from '../shared/AutoDismissAlert/messages'

// PetsIndex should make a request to the api
// To get all pets
// Then display them when it gets them

// style for our card container
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const PetsIndex = (props) => {
    const [pets, setPets] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    console.log('Props in PetsIndex', props)

    useEffect(() => {
        console.log(props)
        getAllPets()
            .then(res => setPets(res.data.pets))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Pets',
                    message: messages.getPetsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    // If pets haven't been loaded yet, show a loading message
    if (!pets) {
        return <LoadingScreen />
    } else if (pets.length === 0) {
        return <p>No pets yet. Better add some.</p>
    }

    const petCards = pets.map(pet => (
        <Card style={{ width: '30%', margin: 5 }} key={pet.id}>
            <Card.Header>{pet.fullTitle}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/pets/${pet.id}`}>View {pet.name}</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div style={cardContainerStyle}>
            {petCards}
        </div>
    )
}

export default PetsIndex