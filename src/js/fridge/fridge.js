import "../../pug/fridge/fridge.pug"

import "../../scss/fridge/fridge.scss"

  
//importing pictures from specific folder 
importAll(require.context('../../images/fridge', false, /\.(png|jpe?g)$/));
  
import {getLocal, setLocal, importAll, commonActions} from "../shared";
commonActions();


//make button active in header
document.querySelectorAll(".header__item").forEach(e => {
    e.classList.remove("header__item--active");
})
document.querySelector(`.header__item[href="fridge.html"]`).classList.add("header__item--active");



//fix placeholder
document.querySelector(".search-field__input").setAttribute("placeholder", "add ingredients...")


//MAIN FUNCTIONS
function toggleLoad(value) {
    value 
      ? load.classList.add("search-field__loading--active")
      : load.classList.remove("search-field__loading--active");
}

function sendRequest(value, offset = 0) {
    return fetch(`https://api.spoonacular.com/food/ingredients/search`+ 
    `?apiKey=09588cc412154c64a11984033312e19d&query=${value}&number=10&offset=${offset}`)  
    .then(response => response.json())
}


function getFridgeItem(name, id) {
  return `
  <article class="fridge__item" data_id="${id}"> 
    <h3 class="fridge__name">${name}</h3>
    <button class="fridge__del" data_id="${id}"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M7 6H6V12H7V6Z" fill="white"></path><path d="M10 6H9V12H10V6Z" fill="white"></path>
        <path d="M2 3V4H3V14C3 14.2652 3.10536 14.5196 3.29289 14.7071C3.48043 14.8946 
        3.73478 15 4 15H12C12.2652 15 12.5196 14.8946 12.7071 14.7071C12.8946 14.5196 13 
        14.2652 13 14V4H14V3H2ZM4 14V4H12V14H4Z" fill="white"></path><path d="M10 1H6V2H10V1Z" fill="white">
        </path>
      </svg>
    </button>
  </article>

  `
}

function deleteElement(e) {
  let id = e.target.closest(".fridge__del").getAttribute("data_id");
  let data = getLocal();
  data["fridge"] = data["fridge"].filter(e => e.id != id);
  setLocal(data);
  document.querySelector(`.fridge__item[data_id='${id}']`).remove();
}

function addToSearch(name, id) {
  resultField.classList.remove("search-field__results--active");
  let localS = getLocal();
  if (!localS) {
    localS = {
      favs: {},
      fridge: []
    }
  }
  let fridgeNames = localS.fridge.map(i => i.name);
  if (fridgeNames.indexOf(name) == -1) {
    localS.fridge.push({
      name: name,
      id: id
    });
    setLocal(localS);
    fridgeItems.innerHTML += getFridgeItem(name, id);
    document.querySelector(`.fridge__del[data_id="${id}"]`).addEventListener("click", deleteElement)
  }
}


let realRequest = requestDebounce(() => {
    sendRequest(searchField.value, 0) 
    .then(data => {
      toggleLoad(false);
      //now show all data resived from server
      currentSearch = data;
      console.log(currentSearch);
      searchMain.innerHTML = "";
      if (data.results.length) {
        for(let i of data.results) {
          searchMain.innerHTML += `<a class="search-field__link" href="#"
           index="${data.results.indexOf(i)}" data_id="${i.id}"><p class="search-field__item">${i.name.toLowerCase()}</p></a>`;
        }
        for (let i of data.results) {
          //adding cliked items to localStorage and to the page
          document.querySelector(`.search-field__link[data_id="${i.id}"]`).addEventListener("click", (e) => {
            addToSearch(e.target.closest(".search-field__link").textContent, 
            e.target.closest(".search-field__link").getAttribute("data_id"));
          })
        }
        addToFridge.addEventListener("click", (item) => {
          if (currentSearch && currentSearch.results.map(i => i.name).indexOf(searchField.value) != -1) {
            addToSearch(searchField.value, currentSearch.results.find(i => i.name == searchField.value).id);
            searchField.value = "";
          }
        })
      }
    })
    .catch(err => {
      toggleLoad(false);
      console.log(err)
    });
}, 2000);


function requestDebounce(func, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer); 
      timer = setTimeout(() => {
          func.apply(null, args);
      }, delay);
    }
}

//MAIN VARIABLES
const searchField = document.querySelector(".search-field__input");
const load = document.querySelector(".search-field__loading");
const resultField = document.querySelector(".search-field__results");
const searchMain = document.querySelector(".search-field__items");
const fridgeItems = document.querySelector(".fridge__items");
const addToFridge = document.querySelector(".fridge__add");
let currentSearch;

searchField.addEventListener("keypress", (e) => {
    if (e.code == "Enter" && !load.classList.contains("search-field__loading--active")) {
      console.log("do smth")
    } else {
      resultField.classList.add("search-field__results--active");
  
  
      //if true loading animation is showing overwise it's hidden
      toggleLoad(true);
      //I send request if user types something 
      realRequest(searchField.value);
    }
  })


document.addEventListener("click", (e) => {
    if ((e.target.closest(".search-field") && 
    e.target.closest(".search-field").querySelector(".search-field__item") && !e.target.closest(".search-field__link"))
     || load.classList.contains("search-field__loading--active")) {
        resultField.classList.add("search-field__results--active");
    } else {
        resultField.classList.remove("search-field__results--active");
    }
})

window.onload = () => {
  let localS = getLocal();
  fridgeItems.innerHTML = "";

  for (let i of localS.fridge) {
    console.log(localS)
    fridgeItems.innerHTML += getFridgeItem(i.name, i.id);
  }
  document.querySelectorAll(".fridge__del").forEach(elem => {
    elem.addEventListener("click", deleteElement)
  })
}