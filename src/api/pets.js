import apiUrl from '../apiConfig'
import axios from 'axios'
export const getAllPets = () => {
    // remember that all types of fetches return a PROMISE
    return axios(`${apiUrl}/pets`)
}
export const getOnePet = (id) => {
    return axios(`${apiUrl}/pets/${id}`)
}
export const createPet = (user, newPet) => {
    // build an object in createpet form
    // when passed into the api createPet function, it will look like an existing pet in the database
    // this new data is referred to above as newPet
    // console.log('create route was hit')
    // console.log('this is user', user)
    // console.log('this is newPet', newPet)
	return axios({
		url: apiUrl + '/pets',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			pet: newPet
		},
	})
}
export const updatePet = (user, updatedPet) => {
    console.log('this is the updatedPet', updatedPet)
	return axios({
		url: `${apiUrl}/pets/${updatedPet.id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			pet: updatedPet
		},
	})
}

export const removePet = (user, petId) => {
    return axios({
		url: `${apiUrl}/pets/${petId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}