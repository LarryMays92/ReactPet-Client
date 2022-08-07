import apiUrl from '../apiConfig'
import axios from 'axios'

export const createToy = (user, petId, newToy) => {
    console.log('this is the user in createToy', user)
    console.log('this is the newToy in createToy', newToy)
	return axios({
		url: `${apiUrl}/toys/${petId}`,
		method: 'POST',
		data: {
			toy: newToy
		},
	})
}

export const updateToy = (user, petId, updatedToy) => {
    console.log('this is the updatedToy', updatedToy)
	return axios({
		url: `${apiUrl}/toys/${petId}/${updatedToy._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			toy: updatedToy
		},
	})
}

export const removeToy = (user, petId, toyId) => {
    return axios({
		url: `${apiUrl}/toys/${petId}/${toyId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}