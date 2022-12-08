export function fetchCountries(name) {
  // name = refs.searchField.value;

  const url = 'https://restcountries.com/v3.1/name/';
  const restAPI =
    '?fields=name.official,capital,population,flags.svg,languages';

  return fetch(`${url}${name}${restAPI}`).then(res => {
    if (!res.ok) {
      throw new Error(`it's not ok: ${res.status}`);
    }
    return res.json();
  });
}
