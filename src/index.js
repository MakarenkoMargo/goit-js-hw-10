import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfoDiv = document.querySelector('.cat-info');
const error = document.querySelector('.error');

function hideBreedSelector() {
  breedSelect.classList.remove('visible');
  breedSelect.classList.add('hidden');
}

function showBreedSelector() {
  breedSelect.classList.remove('hidden');
  breedSelect.classList.add('visible');
}

function hideError() {
  error.classList.remove('visible');
  error.classList.add('hidden');
}

function showLoader() {
  loader.classList.remove('hidden');
  loader.classList.add('visible');
}

function hideLoader() {
  loader.classList.remove('visible');
  loader.classList.add('hidden');
}

function showCatInfo() {
  catInfoDiv.classList.remove('hidden');
  catInfoDiv.classList.add('visible');
}

function hideCatInfo() {
  catInfoDiv.classList.add('hidden');
  catInfoDiv.classList.remove('visible');
}

function showError() {
  error.classList.add('visible');
  error.classList.remove('hidden');
}

hideError();
hideCatInfo();

showLoader();
hideBreedSelector();

fetchBreeds()
  .then(breeds => {
    const breedOptions = breeds.map(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      return option;
    });
    breedSelect.innerHTML = breedOptions.join('');
    hideLoader();
    breedSelect.classList.remove('hidden');
  })
  .catch(error => {
    console.log(error);
    showError();
    hideLoader();
    showBreedSelector();
  });

breedSelect.addEventListener('change', function () {
  const breedId = breedSelect.value;
  hideBreedSelector();
  showLoader();
  hideCatInfo();
  hideError();

  fetchCatByBreed(breedId)
    .then(catData => {
      const catImageContainer = document.createElement('div');
      const catParagraphsContainer = document.createElement('div');
      const catImage = document.createElement('img');
      const catBreed = document.createElement('p');
      const catDescription = document.createElement('p');
      const catTemperament = document.createElement('p');

      catImage.src = catData.image;
      catImage.width = 500;
      catBreed.style.fontWeight = 'bold';
      catBreed.textContent = `${catData.breed}`;
      catDescription.textContent = `${catData.description}`;
      catTemperament.innerHTML = `<strong>Temperament:</strong> ${catData.temperament}`;

      catImageContainer.appendChild(catImage);
      catParagraphsContainer.appendChild(catBreed);
      catParagraphsContainer.appendChild(catDescription);
      catParagraphsContainer.appendChild(catTemperament);

      catInfoDiv.innerHTML = '';
      catInfoDiv.appendChild(catImageContainer);
      catInfoDiv.appendChild(catParagraphsContainer);

      hideLoader();
      showCatInfo();
      showBreedSelector();
    })
    .catch(error => {
      console.log(error);
      showError();
      hideLoader();
      showBreedSelector();
    });
});
