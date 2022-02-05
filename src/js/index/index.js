//IMPORTS
import "swiper/scss"
import "../../scss/index/index.scss"
import "../../pug/index/index.pug"
importAll(require.context('../../images/index', false, /\.(png|jpe?g)$/));
import Swiper from "swiper";
import {getLocal, setLocal, importAll, commonActions, 
  disableScroll, openRecipe, enableScroll, popularRecipes} from "../shared";

commonActions();


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


//MAIN FUNCTIONS
//send request function


//variables for storing search object
let currentSearch;



//this variable is needed for loading more recipes
//of the same search input if necessary
let lastValue  = "";
function sendRequest(value, offset = 0) {
  lastValue = value;
  return fetch(`https://api.spoonacular.com/recipes/complexSearch` +
  `?apiKey=09588cc412154c64a11984033312e19d&query=${value}&number=5&offset=${offset}&fillIngredients=true`)  
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
function recipeCard(image, title, id, ings) {

  let itemsCount = 0;
  let fridgeItems = getLocal()["fridge"].map(e => e.name);
  ings = ings.map(e => e.name);
  console.log(ings, fridgeItems)
  for (let i of fridgeItems) {
    for (let k of ings) {
      i = i.toLowerCase();
      k = k.toLowerCase();
      if (i == k || k.includes(i)) {
        itemsCount += 1
      }
    }
  }


  return `
  <div class="recipe-article__item swiper-slide swiper-slide-active" data_id="${id}">
    <div class="recipe-article__wrapper">
      <img class="recipe-article__wrapper__background" src="${image}" alt="recipe photo"/>
      <div class="recipe-article__wrapper__header">
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
          <a class="check-fridge ${itemsCount == ings.length ? "check-fridge--green" : "check-fridge--white"}" href="fridge.html">
          <span class="check-fridge__nums">
          <span class="check-fridge__current">${itemsCount}</span>/<span class="check-fridge__whole">${ings.length}</span></span>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.8167 0H10.1834C8.44267 0 7.02657 1.41617 7.02657 
          3.15686V26.8431C7.02657 28.5838 8.44273 30 10.1834 30H19.8166C21.5573 30 22.9734 
          28.5839 22.9734 26.8431V3.15686C22.9735 1.41617 21.5573 0 19.8167 0ZM22.0164 26.8431C22.0164 
          28.0561 21.0296 29.043 19.8167 29.043H10.1834C8.97039 29.043 7.98355 28.0561 7.98355 
          26.8431V12.1994H22.0164V26.8431ZM22.0164 11.2425H7.98361V3.15686C7.98361 1.94388 8.97045 0.957043 
          10.1834 0.957043H19.8166C21.0296 0.957043 22.0164 1.94388 22.0164 3.15686V11.2425Z" fill="black">
          </path><path d="M10.3258 13.5947H9.36874V16.8737H10.3258V13.5947Z" fill="black">
          </path><path d="M10.3258 6.56818H9.36874V9.84722H10.3258V6.56818Z" fill="black">
          </path></svg></a></div>
          <h2 class="recipe-article__wrapper__title">${title}</h2>
          </div>
        </div>
      `
}

//exactly the function that I send 
let realRequest = requestDebounce((bar, field, loader, container, name, btn) => {
  sendRequest(bar.value, 0)  
  .then(data => {
    toggleLoad(false, loader, btn, name);
    //now show all data resived from server
    currentSearch = data;
    console.log(currentSearch);
    container.innerHTML = "";
    if (data.results.length) {
      btn.style.display = "block";
      for(let i of data.results) {
        container.innerHTML += `<a class="${name}__link" href="#"
         index="${data.results.indexOf(i)}" data_id="${i.id}"><p class="${name}__item">${i.title}</p></a>`;
      }
      for (let i of data.results) {
        document.querySelector(`.${name}__link[data_id="${i.id}"]`).addEventListener("click", () => {
          disableScroll();
          openRecipe(i.id, recipe);
        })
      }
    } else {
      btn.style.display = "none"
      container.innerHTML += `<p class="search-field__error">Nothing :(</p>`;
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
function removeAllFields() {
  pages.forEach(e => {
    document.querySelector(`#${e}`).classList.remove("recipe-article--active");
  })
}


//shows recipes block on the page
function showRecipes(arr, element) {
  try {
    document.querySelector(".show-more").remove();
  } catch(err) {
    console.log("There was no element to delete!")
  }
 
  for (let i of arr) {
    element.innerHTML += recipeCard(i.image, i.title, i.id, i.missedIngredients);
    if (i == arr[arr.length - 1]) {
      let last = element.children[element.children.length - 1];
      last.innerHTML += `
      <div class="show-more">
        <div class="show-more__line"></div>
        <div class="show-more__line"></div>
      </div>
      `
    }
  }
}


const searchSwiper = new Swiper(".search-swiper", {slidesPerView: "auto"});
function addElementsToSearch(value = false ) {
  const field = search.querySelector(".swiper-wrapper");
  if (!value) {field.innerHTML = "";}
  showRecipes(currentSearch.results, field);
  searchSwiper.update()
  console.log(currentSearch);
  bindListeners();
}


//function that shows full field input results
function fullRecipes(field, name) {
  if (currentSearch) {
    removeAllFields();
    field.classList.remove(`${name}__results--active`);
    search.classList.add("recipe-article--active");
    addElementsToSearch();
  }
}


function setRecipeToLocal(recipe, data) {
  fetch(`https://api.spoonacular.com/recipes/${recipe.getAttribute("data_id")}/information?includeNutrition=true&apiKey=09588cc412154c64a11984033312e19d`)
    .then(resolve => resolve.json())
    .then(resolve => {
      data["favs"][recipe.getAttribute("data_id")] = resolve;
      setLocal(data);
      console.log(getLocal())
    })
};


function bindListeners() {
  document.querySelectorAll(".recipe-article__item").forEach(e => {
    //check if recipe exists in localStorage
    if (getLocal() && Object.keys(getLocal()["favs"]).indexOf(e.getAttribute("data_id")) != -1) {
      e.querySelector(".add-to-fav").classList.add("add-to-fav--green");
    }


    let currentRequest = requestDebounce(() => {
      sendRequest(lastValue, currentSearch.offset + 5)
      .then(data => {
        currentSearch = data;
        //if argument is true when function adds elements but not delete them
        addElementsToSearch(true);
      })
    }, 2000);

    
    e.addEventListener("click", event =>  {
      if (event.target.closest(".add-to-fav")) {
        const fav = event.target.closest(".add-to-fav");
        if (fav.classList.contains("add-to-fav--green")) {
          fav.classList.add("add-to-fav--white");
          fav.classList.remove("add-to-fav--green");

          //delete recipe from local storage if it exist
          if (getLocal() && Object.keys(getLocal()["favs"]).indexOf(e.getAttribute("data_id")) != -1) {
            let data = getLocal();
            delete data["favs"][e.getAttribute("data_id")]
            setLocal(data);
            console.log(getLocal());
          } 
        } else {
          fav.classList.remove("add-to-fav--white");
          fav.classList.add("add-to-fav--green");

          //I write recipe to localStorage if user saves it 
          //If I had a backend side I'd send it to server as well
          //and if I ever will get backend side I will also make login page 
          //and if user logged in only then he can save recipes
          if (getLocal()) {
            let data = getLocal();
            if (!data["favs"][e.getAttribute("data_id")]) {
              setRecipeToLocal(e, data)
            }
          } else {
            //if person first time on website 
            let data = {
              "favs": {},
              "fridge": []
            }
            setRecipeToLocal(e, data)
          }
          
        }
      } else if (event.target.closest(".check-fridge")) {
        console.log("fridge");
      } else if (event.target.closest(".show-more") && currentSearch) {
        if (currentSearch.offset < currentSearch.totalResults) {
          event.target.closest(".show-more").classList.add("show-more--active")
          currentRequest();
        }
      } else {
        openRecipe(event.target.closest(".recipe-article__item").getAttribute("data_id"), recipe);
        disableScroll();
      }
    })
  })
}


/*
name == class name for elements
container == that's  where the initial links are represented
loader == load button
bar == search bar where user tupes smth
field == wrapper for container

the Problem is I have two different search bars for mobile and desctop 
and I don't exactly understand how I can implement this "one function two bars code"

Really hard to pass arguments through each function
it eventially comes to arguments mass
so easy implementation in react though 
so...I am open for any suggestions in vanilla JS
*/


function searchBarListener(bar, field, loader, container, name, moreBtn) {
  bar.addEventListener("keypress", (e) => {
    console.log(arguments)
    if (e.code == "Enter" && !loader.classList.contains(`${name}__loading--active`)) {
      fullRecipes(field, name);
    } else {
      field.classList.add(`${name}__results--active`);
      container.innerHTML = "";
  
  
      //if true loading animation is showing overwise it's hidden
      toggleLoad(true, loader, moreBtn, name);

      //I send request if user types something
      realRequest(...arguments, moreBtn);
    }
  })
}


function toggleLoad(value, loader, btn, name) {
  console.log(loader, btn)
  btn.style.display = "none"
  if (value) {
    loader.classList.add(`${name}__loading--active`);
  } else {
    loader.classList.remove(`${name}__loading--active`);
  }
}

//API KEY 09588cc412154c64a11984033312e19d
//link https://api.spoonacular.com/recipes/716429/information ?apiKey=09588cc412154c64a11984033312e19d& 


//show input filed if user clicks
const searchMain = document.querySelector(".search-field");
const resultField = document.querySelector(".search-field__results");
const searchField = document.querySelector(".search-field__input");
const searchItems = document.querySelector(".search-field__items");
const showMore = document.querySelector(".search-field__more");
const recipe = document.querySelector(".recipe-desc__wrapper");
const load = document.querySelector(".search-field__loading");
const pages = ["search", "popular"];
const search = document.querySelector(`#search`);

//when page load I show popular recipes
const popularContainer = document.querySelector("#popular .recipe-article__items .swiper-wrapper");


let mainSwiper;

//this function listens for any value in input and sends requests to server
searchBarListener(searchField, resultField, load, searchItems, "search-field", showMore);


//desctop search 
const descSearchBar = document.querySelector(".header-desctop__input"),
descResultField = document.querySelector(".header-desctop"),
descLoader = document.querySelector(".header-desctop__loading"),
descSearchItems = document.querySelector(".header-desctop__items"),
descShowMore = document.querySelector(".header-desctop__more");

searchBarListener(descSearchBar, descResultField, 
  descLoader, descSearchItems, "header-desctop", descShowMore);

descShowMore.addEventListener("click", (e) => {
  fullRecipes(descResultField, "header-desctop");
})



//add listener to show more button on search bar
showMore.addEventListener("click", (e) => {
  fullRecipes(searchField, "search-field");
})




//I wall change this mass later
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



searchField.addEventListener("keydown", (e) => {
  if (e.keyCode == 8) {
    resultField.classList.remove("search-field__results--active");
  }
})



const searchedElements =  document.querySelectorAll("*[searched]");
function desctopAddElements(text) {
  removeAllFields();
  if (text != "Popular") {
    menu.classList.remove("mobile-menu--active");
    enableScroll()
    search.classList.add("recipe-article--active");
    search.querySelector(".recipe-title").innerHTML = text;
    sendRequest(text).then(data => {
      currentSearch = data;
      addElementsToSearch();
    })
    .catch(err => console.log(err))
  } else {
    popular.classList.add("recipe-article--active");
    popularContainer.innerHTML  = "";
    for (let i of popularRecipes) {
      popularContainer.innerHTML += recipeCard(i.image, i.title, i.id, i.missedIngredients);
    }
    mainSwiper = new Swiper(".popular-swiper", {slidesPerView: "auto"});
  }
  bindListeners();
}


searchedElements.forEach(elem => {
  elem.addEventListener("click", event => {
    event.preventDefault();
    desctopAddElements(elem.textContent);
  })
})



window.onload = () => {
  let searchContent = window.location.href.split("=")[1]?.split("%20").join(" ");
  if (searchContent) {
    desctopAddElements(searchContent)
  }
  popularContainer.innerHTML  = "";
  for (let i of popularRecipes) {
    popularContainer.innerHTML += recipeCard(i.image, i.title, i.id, i.missedIngredients);
  }
  mainSwiper = new Swiper(".popular-swiper", {slidesPerView: "auto"});
  bindListeners();

  if (window.innerWidth >= 576) {
    console.log("done")

    if (searchSwiper) searchSwiper.disable();
    mainSwiper.disable();
    console.log(mainSwiper, searchSwiper)
  }
}

window.onresize = function() {

  if (window.innerWidth >= 576) {
    console.log("done")
    if (searchSwiper) searchSwiper.disable();
    mainSwiper.disable();
  } else {
    mainSwiper.enable();
    if (searchSwiper) searchSwiper.enable();
  }
}


