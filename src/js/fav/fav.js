import "../../pug/fav/fav.pug";

import "../../scss/fav/fav.scss";




importAll(require.context('../../images/fridge', false, /\.(png|jpe?g)$/));

import {getLocal, setLocal, importAll, commonActions, 
  disableScroll, openRecipe} from "../shared";

commonActions();


//make button active in header
document.querySelectorAll(".header__item").forEach(e => {
    e.classList.remove("header__item--active");
})
document.querySelector(`.header__item[href="fav.html"]`).classList.add("header__item--active");


//MAIN VARIABLES
const recipe = document.querySelector(".recipe-desc__wrapper");
const field = document.querySelector(".fav__items");
//MAIN FUNCTIONS

  


function getFav(item) {
  let itemsCount = 0;
  let fridgeItems = getLocal()["fridge"].map(e => e.name);
  let ings = item.extendedIngredients.map(e => e.name);
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
    <article class="fav__item" data_id="${item.id}"> 
    <img class="fav__img" src="${item.image}" alt="">
    <button class="fav__heart fav__heart--green"> 
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
    <h3 class="fav-item__title">${item.title.length > 14 ? item.title.slice(0, 14) + "..." : item.title}</h3>
    <a class="fav__fridge" href="fridge.html"> 
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.8167 0H10.1834C8.44267 0 7.02657 1.41617 7.02657 
    3.15686V26.8431C7.02657 28.5838 8.44273 30 10.1834 30H19.8166C21.5573 
    30 22.9734 28.5839 22.9734 26.8431V3.15686C22.9735 1.41617 21.5573 0 19.8167 
    0ZM22.0164 26.8431C22.0164 28.0561 21.0296 29.043 19.8167 29.043H10.1834C8.97039 
    29.043 7.98355 28.0561 7.98355 26.8431V12.1994H22.0164V26.8431ZM22.0164 
    11.2425H7.98361V3.15686C7.98361 1.94388 8.97045 0.957043 10.1834 0.957043H19.8166C21.0296 
    0.957043 22.0164 1.94388 22.0164 3.15686V11.2425Z" fill="black"></path><path d="M10.3258 
    13.5947H9.36874V16.8737H10.3258V13.5947Z" fill="black"></path><path d="M10.3258 
    6.56818H9.36874V9.84722H10.3258V6.56818Z" fill="black"></path></svg><span class="fav-fridge__nums">
    <span class="fav-fridge__real">${itemsCount}</span>/<span class="fav-fridge__all">${item.extendedIngredients.length}</span></span></a></article>
    `
}


//a little changed bindListeners function
function bindListeners() {
    document.querySelectorAll(".fav__item").forEach(e => {
      //check if recipe exists in localStorage
      e.addEventListener("click", event =>  {
        if (event.target.closest(".fav__heart")) {
          const fav = event.target.closest(".fav__heart");
          if (fav.classList.contains("fav__heart--green")) {
            fav.classList.remove("fav__heart--green");
            //delete recipe from local storage
            let data = getLocal();
            delete data["favs"][e.getAttribute("data_id")]
            setLocal(data);
            e.remove();
            console.log(Object.keys(getLocal()["favs"]).length)
            if (!Object.keys(getLocal()["favs"]).length) {
                
                field.innerHTML += `
                <h2 class="fav__error">You haven't liked anything yet (((</h2>
                `
            }
            console.log(getLocal());
          }
        } else if (event.target.closest(".fav__fridge")) {
          console.log("fridge");
        } else {
          openRecipe(event.target.closest(".fav__item").getAttribute("data_id"), recipe);
          disableScroll();
        }
      })
    })
}

window.onload = () => {
    let data = getLocal()["favs"];
    field.innerHTML = "";
    if (Object.keys(data).length) {
        for (let i of Object.keys(data)) {
            field.innerHTML += getFav(data[i]);
        }
    } else {
        field.innerHTML += `
        <h2 class="fav__error">You haven't liked anything yet (((</h2>
        `
    }

    bindListeners();
}
console.log(getLocal())