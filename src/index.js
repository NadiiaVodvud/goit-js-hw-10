import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const INFO_MESSAGE =
  'Too many matches found. Please enter a more specific name.';
const ERROR_MESSAGE = 'Oops, there is no country with that name';

const refs = {
  countryList: document.querySelector('.country-list'),
  infoContainer: document.querySelector('.country-info'),
  searchField: document.getElementById('search-box'),
};

refs.searchField.addEventListener(
  'input',
  debounce(onInputSearch, DEBOUNCE_DELAY)
);

function onInputSearch(e) {
  const name = e.target.value.trim();

  if (!name) {
    cleanMarkup();
  } else {
    fetchCountries(name).then(createCountriesItemsMarcup).catch(onFetchError);
  }
}

function createCountriesItemsMarcup(countries) {
  if (Number(countries.length) > 10) {
    Notify.info(INFO_MESSAGE);
    cleanMarkup();
  } else if (Number(countries.length) !== 1) {
    const markup = countries
      .map(({ name, flags }) => {
        return `<li class="country-item"><img class="country-img" src="${flags.svg}" alt="flag of ${name.common}" width="50" height="100%"><p class="country-title">${name.common}</p></li>`;
      })
      .join('');
    refs.countryList.innerHTML = markup;
    refs.infoContainer.innerHTML = '';
  } else {
    const markup = countries
      .map(({ name, flags, capital, population, languages }) => {
        return `<div class="country-card"><div class="country-card-box"><img class="country-card-svg"  src="${
          flags.svg
        }"  alt="flag of ${
          name.common
        }" width="70" heiht="100%"><p class="country-card-title">${
          name.common
        }</p></div><p class="country-card-text">Capital:<span class="country-card-topic">${capital}</span></p><p class="country-card-text">Population:<span class="country-card-topic">${population}</span></p><p class="country-card-text">Languages:<span class="country-card-topic">${Object.values(
          languages
        )}</span></p></div>`;
      })
      .join('');
    refs.infoContainer.innerHTML = markup;
    refs.countryList.innerHTML = '';
  }
}

function cleanMarkup() {
  refs.countryList.innerHTML = '';
  refs.infoContainer.innerHTML = '';
}

function onFetchError() {
  cleanMarkup();
  Notify.failure(ERROR_MESSAGE);
}

// function createCountriesItemsMarcup(countries) {
//   if (Number(countries.length) > 10) {
//     Notify.info(INFO_MESSAGE);
//     cleanMarkup();
//   } else if (Number(countries.length) !== 1) {
//     renderCountriesList(countries);
//     refs.infoContainer.innerHTML = '';
//   } else {
//     renderCountriesCard(countries);
//     refs.countryList.innerHTML = '';
//   }
// }

// function createCountriesList(country) {
//   return `<li class="country-item"><img class="country-img" src="${flags.svg}" alt="flag of ${name.common}" width="50"><p class="country-title">${name.common}</p></li>`;
// }

// function renderCountriesList(countries) {
//   const markup = countries
//     .map(({ name, flags }) => createCountriesList(country))
//     .join('');
//   refs.countryList.insertAdjacentElement('beforeend', markup);
// }

// function createCountriesCard() {
//   return `<div class="country-card"><div class="country-card-box"><img class="country-card-svg"  src="${
//     flags.svg
//   }"  alt="flag of ${
//     name.common
//   }" width="70" heiht="100%"><p class="country-card-title">${
//     name.common
//   }</p></div><p class="country-card-text">Capital:<span class="country-card-topic">${capital}</span></p><p class="country-card-text">Population:<span class="country-card-topic">${population}</span></p><p class="country-card-text">Languages:<span class="country-card-topic">${Object.values(
//     languages
//   )}</span></p></div>`;
// }

// function renderCountriesCard(countries) {
//   const markup = countries
//     .map(({ name, flags, capital, population, languages }) =>
//       createCountriesCard(country)
//     )
//     .join('');

//   refs.infoContainer.insertAdjacentElement('beforeend', markup);
// }
