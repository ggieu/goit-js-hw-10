import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const breedSelectRef = document.querySelector('.breed-select');
const catInfoRef = document.querySelector('.cat-info');
const loaderRef = document.querySelector('.loader');

breedSelectRef.addEventListener('change', selectCat);

loadBreeds();

function selectCat(event) {
  catInfoRef.innerHTML = '';
  loaderRef.classList.remove('hide');

  fetchCatByBreed(event.target.value)
    .then(({ data }) => {
      let { name, description, temperament } = data[0].breeds[0];
      let { url } = data[0];
      catInfoRef.innerHTML = markupCatCard({
        name,
        description,
        temperament,
        url,
      });
    })
    .catch(() =>
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!',
        {
          position: 'left-top',
        }
      )
    )
    .finally(loaderRef.classList.add('hide'));
}

function loadBreeds() {
  loaderRef.classList.remove('hide');

  return fetchBreeds()
    .then(({ data }) => {
      breedSelectRef.classList.remove('hide');
      breedSelectRef.innerHTML = markupOptions(data);
      new SlimSelect({
        select: breedSelectRef,
        settings: {},
      });
    })
    .catch(() =>
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!',
        {
          position: 'left-top',
        }
      )
    )
    .finally(loaderRef.classList.add('hide'));
}

function markupOptions(data) {
  return data
    .map(({ id, name }) => `<option value=${id}>${name}</option>`)
    .join('');
}

function markupCatCard({ name, description, temperament, url }) {
  return `
    <img src=${url} alt="${name}"/>
    <div class ='infobox'>
    <h2>${name}</h2>
    <p>${description}</p>
    <p><span>Temperament:</span> ${temperament}</p>`;
}