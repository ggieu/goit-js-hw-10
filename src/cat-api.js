import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] =
  'live_evgPDaBUnGY4OupuhPvyn2qppi3TVHfCVm9GE8LCi7qAajC9M2JcrcB70qlE60a9';

export function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`);
}

export function fetchCatByBreed(breedId) {
  return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`);
}




