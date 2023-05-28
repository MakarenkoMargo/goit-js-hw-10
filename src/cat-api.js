import Notiflix from 'notiflix';

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';
  const api_key =
    'live_6gsuYNb5V17vwDu9rTGUAkU4wdTd6DIvlRaAJ2pFYHI5vE3Nwi1uTpTytJ86lSXb';

  return fetch(url, {
    headers: {
      'x-api-key': api_key,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
      throw new Error('Failed to fetch breeds');
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  const api_key =
    'live_6gsuYNb5V17vwDu9rTGUAkU4wdTd6DIvlRaAJ2pFYHI5vE3Nwi1uTpTytJ86lSXb';

  return fetch(url, {
    headers: {
      'x-api-key': api_key,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 0) {
        const catData = data[0];
        const breedInfo = catData.breeds[0];
        return {
          image: catData.url,
          breed: breedInfo.name,
          description: breedInfo.description,
          temperament: breedInfo.temperament,
        };
      } else {
        throw new Error('Cat data not found');
      }
    })
    .catch(error => {
      console.log(error);
      throw new Error('Failed to fetch cat data');
    });
}
