import axios from 'axios';
import { BASE_URL } from '../app.config';

export async function getCountries() {
	try {
		const response = await axios.get(`${BASE_URL}/locations/countries`);
		return response?.data || [];
	} catch (error) {
		return [];
	}
}

export async function getStates(id) {
	try {
		const response = await axios.get(`${BASE_URL}/locations/states/${id}`);
		return response?.data || [];
	} catch (error) {
		return [];
	}
}

export async function getCities(countryId, stateId) {
	try {
		const response = await axios.get(`${BASE_URL}/locations/cities/${countryId}/${stateId}`);
		return response?.data || [];
	} catch (error) {
		return [];
	}
}
