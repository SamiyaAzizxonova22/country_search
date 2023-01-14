const form = document.querySelector(".form");
const country = document.querySelector(".country");
const error = document.querySelector('.value_error')

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getCountry(`https://restcountries.com/v3.1/name/${form.input.value}`)
    .then((data) => {
      showCountry(data[0]);
    })
    .catch((err) => {
      console.log(err,'xatolik mavjud');

    });
});

const getCountry = (resurse) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        const data = JSON.parse(request.responseText);
        resolve(data);
        error.textContent = ''
        country.style.display = 'block'

      }else if(request.readyState === 4 && form.input.value.length === 0){
        error.textContent = "Iltimos kerakli davlat nomini kiriting !!!"
        country.style.display = 'none'
      }
       else if (request.readyState === 4) {
        reject(
          error.textContent = "Iltimos davlat nomini tekshirib qaytadan kiriting !!!"
          );
          country.style.display = 'none'
      }
    });
    request.open("GET", resurse);
    request.send();
  });
};

function showCountry(davlat) {

  console.log(Object.values(davlat))
  const {name, population, flags, currencies, languages } = davlat


  country.innerHTML =
  `<img class="flag" src="${flags.svg}" alt="">
<h1 class="country_name">${name.common}</h1>
</div>
<div>
  <p><b>Capital:</b>${davlat.capital}</p>
  <p><b>Continent:</b>${davlat.continents}</p>
  <p><b>Population:</b>${population}</p>
  <p><b>Currency:</b>${Object.values(currencies)[0].name}</p>
  <p><b>Common Languages:</b>${Object.values(languages)}</p>`;
}

// 'https://restcountries.com/v3.1/all'


// console.log(country.style)