import API from './config';

const {apiKey} = API;

export function getArtists(country) {
  const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${country}&api_key=${apiKey}&format=json`;

  return fetch(URL)
    .then(response => response.json())
    .then(response => {
      const {topartists: {artist}} = response;

      return artist;
    });
}