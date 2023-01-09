const api = 'https://restcountries.com/v3.1/all'
const request = new XMLHttpRequest()
let body = document.querySelector('body')
request.addEventListener('readystatechange', () => {
    if (request.readyState != 4) {
        document.querySelector('.overflow').classList.add('active')
        document.querySelector('.lds-roller').classList.add('active')
    } else if (request.status == 200 && request.readyState == 4) {
        uptade(JSON.parse(request.responseText));
        document.querySelector('.overflow').classList.remove('active')
        document.querySelector('.lds-roller').classList.remove('active')
    }
})
let cards = document.querySelector('.cards')
request.open('GET', api)
request.send()
function uptade(data) {
    let count = 0
    data.forEach((country) => {
        count++
        if (country.capital) {
            cards.innerHTML += `
            <a href="#">
            <div class="card">
            <img src="${country.flags.svg}">
            <div class="name"><span>${country.name.common}</span></div>
            <div class="population">Population: <span>${country.population.toLocaleString("en-US")}</span></div>
            <div class="region">Region: <span>${country.region}</span></div>
            <div class="capital">Capital: <span class="capital-span">${country.capital}</span></div>
            </div>
            </a>
            `
        } else {
            cards.innerHTML += `
            <a href="#">
            <div class="card">
            <img src="${country.flags.svg}">
            <div class="name"><span>${country.name.common}</span></div>
            <div class="population">Population: <span>${country.population.toLocaleString("en-US")}</span></div>
            <div class="region">Region: <span>${country.region}</span></div>
            <div class="capital">Capital: <span class="capital-span">No capital</span></div>
            </div>
            </a>
            `
        }
    });
}
let select = document.querySelector('.select')
select.addEventListener('click', () => {
    document.querySelector('.option').classList.toggle('active')
})
if (localStorage.getItem("class")) {
    body.setAttribute("class", localStorage.getItem("class"));
    toggleDark(1)
}
let darkmode = document.querySelector('.dark-mode')
darkmode.addEventListener('click', ()=> {
    toggleDark()
})

function toggleDark(r) {
    const dataTheme = body.getAttribute("class");
    let theme_switch;
    if (dataTheme === "dark") { theme_switch = 1 } else { theme_switch = 0 }
    if (r) { theme_switch = !theme_switch }
    if (theme_switch) {
        body.setAttribute("class", "light");
        localStorage.setItem("class", "light");
    } else {
        body.setAttribute("class", "dark");
        localStorage.setItem("class", "dark");
    }
}