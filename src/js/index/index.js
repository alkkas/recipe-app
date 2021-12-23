//IMPORTS
import "../../scss/index/index.scss"
import "../../pug/index/index.pug"

function importAll(r) {
  return r.keys().map(r);
}
importAll(require.context('../../images/common', false, /\.(png|jpe?g)$/));


importAll(require.context('../../images/index', false, /\.(png|jpe?g)$/));

//main sliders
import Swiper from "swiper";
import "swiper/scss"




//menu toggle

const menuBtn = document.querySelector(".menu");
const menu = document.querySelector(".mobile-menu");
const closeMenu = document.querySelector(".mobile-menu__close");


menuBtn.addEventListener("click", event => {
  menu.classList.add("mobile-menu--active");
  disableScroll();
})

closeMenu.addEventListener("click", event => {
  menu.classList.remove("mobile-menu--active")
  enableScroll()
})



//search bar implimintation


//MAIN FUNCTIONS

function disableScroll() {
  // Get the current page scroll position
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  // if any scroll is attempted, set this to the previous value
  window.onscroll = function() {
      window.scrollTo(scrollLeft, scrollTop);
  };
}
function enableScroll() {
  window.onscroll = () => {};
}



//send request function

//variable for storing search object
let currentSearch;
function sendRequest(value, offset = 0) {
  return fetch(`https://api.spoonacular.com/recipes/complexSearch` +
  `?apiKey=09588cc412154c64a11984033312e19d&query=${value}&number=5&offset=${offset}`)  
  .then(response => response.json())
}

//debounce function for sendRequest 
function requestDebounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer); 
    timer = setTimeout(() => {
        func.apply(null, args);
    }, delay);
  }
}

//recipe card 
function recipeCard(image, title, id) {
  return `
  <div class="recipe-article__item swiper-slide swiper-slide-active" id="${id}">
    <img class="recipe-article__background" src="${image}" alt="recipe photo"/>
    <div class="recipe-article__header">
      <button class="add-to-fav add-to-fav--white">
      <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.6113 26.0909C13.9845 26.4641 
        14.4861 26.6721 15.0122 26.6721C15.5322 
        26.6721 16.0461 26.458 16.4131 26.0909L27.4062 
        15.0979C29.0763 13.4278 29.9939 11.2072 30 8.85196C30 
        6.49062 29.0824 4.26998 27.4123 2.59992C25.7423 0.929853 
        23.5277 0.0122348 21.1664 0.0122348C18.8479 0.0122348 16.6639 
        0.899266 15.0061 2.51427C13.3422 0.893149 11.1521 0 8.82749 
        0C6.47227 0 4.25775 0.917618 2.58768 2.58157C0.917618 4.25163 0 
        6.47227 0 8.83361C0 11.1888 0.923736 13.4095 2.5938 15.0795L13.6113 
        26.0909ZM3.65212 3.646C5.03467 2.26346 6.87602 1.49878 8.8336 
        1.49878C10.7912 1.49878 12.6387 2.26346 14.0273 3.65212L14.48 
        4.10481C14.6207 4.24551 14.8104 4.32504 15.0122 4.32504C15.208 
        4.32504 15.4038 4.24551 15.5445 4.10481L15.9849 3.66436C17.3736 
        2.27569 19.2149 1.51101 21.1786 1.51101C23.1362 1.51101 24.9776 
        2.27569 26.3601 3.65824C27.7488 5.0469 28.5073 6.88825 28.5073 
        8.84584C28.5073 10.8034 27.7427 12.6448 26.354 14.0334L15.3548 
        25.0326C15.1774 25.21 14.8532 25.21 14.6697 25.0326L3.65824 
        14.0212C2.26958 12.6325 1.50489 10.7912 1.50489 8.83361C1.50489 
        6.87602 2.26958 5.03467 3.65212 3.646Z" fill="black"></path></svg>
        </button>
        <button class="check-fridge check-fridge--white"><span class="check-fridge__nums">
        <span class="check-fridge__current">5</span>/<span class="check-fridge__whole">9</span></span>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.8167 0H10.1834C8.44267 0 7.02657 1.41617 7.02657 
        3.15686V26.8431C7.02657 28.5838 8.44273 30 10.1834 30H19.8166C21.5573 30 22.9734 
        28.5839 22.9734 26.8431V3.15686C22.9735 1.41617 21.5573 0 19.8167 0ZM22.0164 26.8431C22.0164 
        28.0561 21.0296 29.043 19.8167 29.043H10.1834C8.97039 29.043 7.98355 28.0561 7.98355 
        26.8431V12.1994H22.0164V26.8431ZM22.0164 11.2425H7.98361V3.15686C7.98361 1.94388 8.97045 0.957043 
        10.1834 0.957043H19.8166C21.0296 0.957043 22.0164 1.94388 22.0164 3.15686V11.2425Z" fill="black">
        </path><path d="M10.3258 13.5947H9.36874V16.8737H10.3258V13.5947Z" fill="black">
        </path><path d="M10.3258 6.56818H9.36874V9.84722H10.3258V6.56818Z" fill="black">
        </path></svg></button></div>
        <h2 class="recipe-article__title">${title}</h2></div>
      `
}

//exactly the function that I send 
let realRequest = requestDebounce(() => {
  sendRequest(searchField.value, 0)  
  .then(data => {
    toggleLoad(false);
    //now show all data resived from server
    currentSearch = data;
    console.log(currentSearch)
    searchItems.innerHTML = "";
    if (data.results.length) {
      showMore.style.display = "block"
      for(let i of data.results) {
        searchItems.innerHTML += `<a class="search-field__link" href="#" index="${data.results.indexOf(i)}"><p class="search-field__item">${i.title}</p></a>`;
      }
    } else {
      showMore.style.display = "none"
      searchItems.innerHTML += `<p class="search-field__error">Nothing :(</p>`;
    }
  })
  .catch(err => {
    toggleLoad(false);
    showMore.style.display = "none"
    console.log(err)
    searchItems.innerHTML = `<p class="search-field__error">Ooops... Error occured!</p>`
  });
}, 2000);

//function that toggle loading animation when data is receiving 
function toggleLoad(value) {
  showMore.style.display = "none"
  const load = document.querySelector(".search-field__loading");
  if (value) {
    load.style.display = "block";
  } else {{
    load.style.display = "none";
  }}
}


//function that shows full field input results
function fullRecipes() {
  if(currentSearch) {
    pages.forEach(e => {
      document.querySelector(`#${e}`).classList.remove("recipe-article--active");
    })
    resultField.classList.remove("search-field__results--active");
    search.classList.add("recipe-article--active");
    const field = search.querySelector(".swiper-wrapper");
    field.innerHTML = "";
    searchSwiper = new Swiper(".search-swiper", {slidesPerView: "auto"})
    for (let i of currentSearch.results) {
      field.innerHTML += recipeCard(i.image, i.title, i.id);
    }
  }
}
//API KEY 09588cc412154c64a11984033312e19d
//link https://api.spoonacular.com/recipes/716429/information ?apiKey=09588cc412154c64a11984033312e19d& 


//show input filed if user clicks
const searchMain = document.querySelector(".search-field");
const resultField = document.querySelector(".search-field__results");
const searchField = document.querySelector(".search-field__input");
const searchItems = document.querySelector(".search-field__items");
const showMore = document.querySelector(".search-field__more")


//ALL PAGES

const pages = ["search", "popular", "breakfast"];
const search = document.querySelector(`#search`);
// In real project I'd ask the server for popular recipes 
// but as long as I make this project alone without any support
// I can't buy unlimited acces to spoontocular API 
// Hence I just assume that I received recipes from server


//add listener to show more button on search bar
showMore.addEventListener("click", (e) => {
  fullRecipes()
})


const popularRecipes = [
    {
        "id": 654959,
        "title": "Pasta With Tuna",
        "image": "https://spoonacular.com/recipeImages/654959-312x231.jpg",
        "imageType": "jpg"
    },
    {
        "id": 511728,
        "title": "Pasta Margherita",
        "image": "https://spoonacular.com/recipeImages/511728-312x231.jpg",
        "imageType": "jpg"
    },
    {
        "id": 654812,
        "title": "Pasta and Seafood",
        "image": "https://spoonacular.com/recipeImages/654812-312x231.jpg",
        "imageType": "jpg"
    },
    {
        "id": 654857,
        "title": "Pasta On The Border",
        "image": "https://spoonacular.com/recipeImages/654857-312x231.jpg",
        "imageType": "jpg"
    },
    {
        "id": 654883,
        "title": "Pasta Vegetable Soup",
        "image": "https://spoonacular.com/recipeImages/654883-312x231.jpg",
        "imageType": "jpg"
    }
]
//when page load I show popular recipes
const popularContainer = document.querySelector("#popular .recipe-article__items .swiper-wrapper");


let mainSwiper;
let searchSwiper;
window.onload = () => {
  popularContainer.innerHTML  = "";
  for( let i of popularRecipes) {
    popularContainer.innerHTML += recipeCard(i.image, i.title, i.id)
  }
  mainSwiper = new Swiper(".popular-swiper", {slidesPerView: "auto"});
}



//search bar function
document.addEventListener("click", (e) => {
  if (e.target.className == "search-field__more") {
    resultField.classList.remove("search-field__results--active");
  } else if (!e.target.closest(".search-field")) {
    resultField.classList.remove("search-field__results--active");
    searchMain.classList.remove("search-field--active");
  } else if (e.target.closest(".search-field").querySelector(".search-field__item")) {
    resultField.classList.add("search-field__results--active");
    searchMain.classList.add("search-field--active");
  } else {
    searchMain.classList.add("search-field--active");
  }
})



searchField.addEventListener("keypress", (e) => {
  if (e.code == "Enter") {
    fullRecipes()
  } else {
    resultField.classList.add("search-field__results--active");
    searchItems.innerHTML = "";
    //if true loading animation is showing overwise it's hidden
    toggleLoad(true);
    //I send request if user types something 
    realRequest(searchField.value)
  }

})

