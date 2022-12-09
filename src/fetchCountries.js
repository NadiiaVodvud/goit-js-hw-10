const url = 'https://restcountries.com/v3.1/name/';
const restAPI = '?fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${url}${name}${restAPI}`).then(res => {
    if (!res.ok) {
      throw new Error(`it's not ok: ${res.status}`);
    }
    return res.json();
  });
}
