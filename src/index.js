import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfoDiv = document.querySelector('.cat-info');
const error = document.querySelector('.error');

function showBreedSelect() {
  breedSelect.classList.remove('hidden');
  breedSelect.classList.add('visible');
}

function hideBreedSelect() {
  breedSelect.classList.remove('visible');
  breedSelect.classList.add('hidden');
}

function hideError() {
  error.classList.remove('visible');
  error.classList.add('hidden');
}

function showLoader() {
  const loaderSpan = document.createElement('span');
  loaderSpan.classList.add('loader-s');
  loader.parentNode.insertBefore(loaderSpan, loader);
  loader.classList.remove('hidden');
  loader.classList.add('visible');
}

function hideLoader() {
  const loaderSpan = document.querySelector('.loader-s');
  if (loaderSpan) {
    loaderSpan.remove();
  }
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

hideBreedSelect();

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
    hideLoader();
    showBreedSelect();
  })
  .catch(error => {
    console.log(error);
    showError();
    hideLoader();
    showBreedSelect();
  });

breedSelect.addEventListener('change', function () {
  const breedId = breedSelect.value;
  hideCatInfo();
  showLoader();
  hideError();
  hideBreedSelect();

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
      showBreedSelect();
    })
    .catch(error => {
      console.log(error);
      showError();
      hideLoader();
      showBreedSelect();
    });
});
