function getLocal() {
    return JSON.parse(localStorage.getItem("data"));
}
  
function setLocal(data) {
    localStorage.setItem("data", JSON.stringify(data));
}

function importAll(r) {
    return r.keys().map(r);
}

function commonActions() {

    importAll(require.context('../images/common', false, /\.(png|jpe?g)$/));
        if (!getLocal()) {
            setLocal({});
        }
    let data = getLocal()
    if (!("favs" in data)) {
        data["favs"] = {}
        setLocal(data)
    } 
    if (!("fridge" in data)) {
        data["fridge"] = []
        setLocal(data)
    }
    if (!("offset" in data)) {
        data["offset"] = {}
        setLocal(data)
    }
}


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

function openRecipe(id, recipe) {
    recipe.classList.add("recipe-desc__wrapper--active");
    fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=09588cc412154c64a11984033312e19d`)
    .then(resolve => resolve.json())
    .then(data => {
     
      recipe.querySelector(".recipe-desc__header").innerHTML = "";
      recipe.querySelector(".recipe-desc__header").innerHTML += `
        <img class="recipe-desc__back" src="assets/images/common/back.png" alt="hide pop up">
        <img class="recipe-desc__background" src="${data.image}" alt="dish">
        <h1 class="recipe-desc__title">${data.title}</h1>
        <ul class="recipe-desc__nutr-items"> 
          <li class="recipe-desc__nutr">Calories: <span id="cal">${data.nutrition.nutrients[0].amount}</span><span class="recipe-desc__small">Kcal</span></li>
          <li class="recipe-desc__nutr" id="prot">Proteins: <span id="cal">${data.nutrition.nutrients[8].amount}</span><span class="recipe-desc__small">g</span></li>
          <li class="recipe-desc__nutr" id="fat">Fat: <span id="cal">${data.nutrition.nutrients[1].amount}</span><span class="recipe-desc__small">g</span></li>
        </ul>
      `
      console.log(data)
      if((data.instructions.match(/<li>/g) || []).length == 1) {
        recipe.querySelector(".recipe-desc-ins__wrapper").innerHTML = data.instructions.replace("<ol><li>", "").replace("</li></ol>", "");
      } else {
        recipe.querySelector(".recipe-desc-ins__wrapper").innerHTML = data.instructions
      }
  
      //now add ingredients
      const ingr = recipe.querySelector(".recipe-desc-ing__container");
      ingr.innerHTML  = "";
      for (let i of data.extendedIngredients) {
        ingr.innerHTML += `
        <li class="recipe-desc-ing__item">${i.original}</li>
        `
      }
      return data
    }).then(data => {
      document.querySelector(".recipe-desc__back").addEventListener("click", () => {
        recipe.classList.remove("recipe-desc__wrapper--active");
        enableScroll();
      })
      
    })
  
}
const popularRecipes = [
    {
        "id": 654959,
        "usedIngredientCount": 0,
        "missedIngredientCount": 9,
        "missedIngredients": [
            {
                "id": 11291,
                "amount": 1,
                "unit": "cup",
                "unitLong": "cup",
                "unitShort": "cup",
                "aisle": "Produce",
                "name": "green onions",
                "original": "cup Green Onions, chopped",
                "originalString": "cup Green Onions, chopped",
                "originalName": "Green Onions, chopped",
                "metaInformation": [
                    "chopped"
                ],
                "meta": [
                    "chopped"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/spring-onions.jpg"
            },
            {
                "id": 1085,
                "amount": 1.25,
                "unit": "cups",
                "unitLong": "cups",
                "unitShort": "cup",
                "aisle": "Milk, Eggs, Other Dairy",
                "name": "non-fat milk",
                "original": "1 1/4 cups Non-Fat Milk",
                "originalString": "1 1/4 cups Non-Fat Milk",
                "originalName": "Non-Fat Milk",
                "metaInformation": [],
                "meta": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/milk.jpg"
            },
            {
                "id": 11282,
                "amount": 2,
                "unit": "tablespoons",
                "unitLong": "tablespoons",
                "unitShort": "Tbsp",
                "aisle": "Produce",
                "name": "onion",
                "original": "2 tablespoons Onion, minced",
                "originalString": "2 tablespoons Onion, minced",
                "originalName": "Onion, minced",
                "metaInformation": [
                    "minced"
                ],
                "meta": [
                    "minced"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/brown-onion.png"
            },
            {
                "id": 1033,
                "amount": 0.25,
                "unit": "cup",
                "unitLong": "cups",
                "unitShort": "cup",
                "aisle": "Cheese",
                "name": "parmesan cheese",
                "original": "1/4 cup Parmesan Cheese, grated",
                "originalString": "1/4 cup Parmesan Cheese, grated",
                "originalName": "Parmesan Cheese, grated",
                "metaInformation": [
                    "grated"
                ],
                "meta": [
                    "grated"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/parmesan.jpg"
            },
            {
                "id": 11297,
                "amount": 1,
                "unit": "cup",
                "unitLong": "cup",
                "unitShort": "cup",
                "aisle": "Produce;Spices and Seasonings",
                "name": "parsley",
                "original": "cup Fresh Parsley or Basil, chopped",
                "originalString": "cup Fresh Parsley or Basil, chopped",
                "originalName": "Fresh Parsley or Basil, chopped",
                "metaInformation": [
                    "fresh",
                    "chopped"
                ],
                "meta": [
                    "fresh",
                    "chopped"
                ],
                "extendedName": "fresh parsley",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/parsley.jpg"
            },
            {
                "id": 20420,
                "amount": 8,
                "unit": "ounces",
                "unitLong": "ounces",
                "unitShort": "oz",
                "aisle": "Pasta and Rice",
                "name": "pasta",
                "original": "8 ounces Tubular Pasta",
                "originalString": "8 ounces Tubular Pasta",
                "originalName": "Tubular Pasta",
                "metaInformation": [],
                "meta": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/fusilli.jpg"
            },
            {
                "id": 11304,
                "amount": 1,
                "unit": "cup",
                "unitLong": "cup",
                "unitShort": "cup",
                "aisle": "Produce",
                "name": "peas",
                "original": "1 cup Frozen Peas, thawed",
                "originalString": "1 cup Frozen Peas, thawed",
                "originalName": "Frozen Peas, thawed",
                "metaInformation": [
                    "frozen",
                    "thawed"
                ],
                "meta": [
                    "frozen",
                    "thawed"
                ],
                "extendedName": "frozen peas",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/peas.jpg"
            },
            {
                "id": 6168,
                "amount": 1,
                "unit": "",
                "unitLong": "",
                "unitShort": "",
                "aisle": "Condiments",
                "name": "pepper sauce",
                "original": "1 dsh Hot Pepper Sauce",
                "originalString": "1 dsh Hot Pepper Sauce",
                "originalName": "dsh Hot Pepper Sauce",
                "metaInformation": [
                    "hot"
                ],
                "meta": [
                    "hot"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/hot-sauce-or-tabasco.png"
            },
            {
                "id": 15121,
                "amount": 6.5,
                "unit": "ounces",
                "unitLong": "ounces",
                "unitShort": "oz",
                "aisle": "Canned and Jarred",
                "name": "water-packed tuna",
                "original": "6 1/2 ounces Can Water-Packed Tuna, drained",
                "originalString": "6 1/2 ounces Can Water-Packed Tuna, drained",
                "originalName": "Water-Packed Tuna, drained",
                "metaInformation": [
                    "drained"
                ],
                "meta": [
                    "drained"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/canned-tuna.png"
            }
        ],
        "likes": 0,
        "usedIngredients": [],
        "unusedIngredients": [],
        "title": "Pasta With Tuna",
        "image": "https://spoonacular.com/recipeImages/654959-312x231.jpg",
        "imageType": "jpg"
    },
    {
        "id": 511728,
        "usedIngredientCount": 0,
        "missedIngredientCount": 5,
        "missedIngredients": [
            {
                "id": 2044,
                "amount": 0.25,
                "unit": "cup",
                "unitLong": "cups",
                "unitShort": "cup",
                "aisle": "Produce;Spices and Seasonings",
                "name": "fresh basil",
                "original": "¼ cup fresh basil, thinly sliced",
                "originalString": "¼ cup fresh basil, thinly sliced",
                "originalName": "fresh basil, thinly sliced",
                "metaInformation": [
                    "fresh",
                    "thinly sliced"
                ],
                "meta": [
                    "fresh",
                    "thinly sliced"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/basil.jpg"
            },
            {
                "id": 1026,
                "amount": 12,
                "unit": "ounces",
                "unitLong": "ounces",
                "unitShort": "oz",
                "aisle": "Cheese",
                "name": "fresh mozzarella cheese",
                "original": "12 ounces fresh mozzarella cheese, cut into ½-inch cubes",
                "originalString": "12 ounces fresh mozzarella cheese, cut into ½-inch cubes",
                "originalName": "fresh mozzarella cheese, cut into ½-inch cubes",
                "metaInformation": [
                    "fresh",
                    "cut into ½-inch cubes"
                ],
                "meta": [
                    "fresh",
                    "cut into ½-inch cubes"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/mozzarella.png"
            },
            {
                "id": 11215,
                "amount": 1,
                "unit": "",
                "unitLong": "",
                "unitShort": "",
                "aisle": "Produce",
                "name": "garlic clove",
                "original": "1 garlic clove, pressed",
                "originalString": "1 garlic clove, pressed",
                "originalName": "garlic clove, pressed",
                "metaInformation": [
                    "pressed"
                ],
                "meta": [
                    "pressed"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/garlic.png"
            },
            {
                "id": 10111529,
                "amount": 10,
                "unit": "oz",
                "unitLong": "ounces",
                "unitShort": "oz",
                "aisle": "Produce",
                "name": "grape tomatoes",
                "original": "10 oz grape tomatoes, cut in half lengthwise",
                "originalString": "10 oz grape tomatoes, cut in half lengthwise",
                "originalName": "grape tomatoes, cut in half lengthwise",
                "metaInformation": [
                    "cut in half lengthwise"
                ],
                "meta": [
                    "cut in half lengthwise"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/cherry-tomatoes.png"
            },
            {
                "id": 20420,
                "amount": 1,
                "unit": "pound",
                "unitLong": "pound",
                "unitShort": "lb",
                "aisle": "Pasta and Rice",
                "name": "pasta",
                "original": "1 pound linguine pasta",
                "originalString": "1 pound linguine pasta",
                "originalName": "linguine pasta",
                "metaInformation": [],
                "meta": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/fusilli.jpg"
            }
        ],
        "likes": 0,
        "usedIngredients": [],
        "unusedIngredients": [],
        "title": "Pasta Margherita",
        "image": "https://spoonacular.com/recipeImages/511728-312x231.jpg",
        "imageType": "jpg"
    },
    {
        "id": 654812,
        "usedIngredientCount": 0,
        "missedIngredientCount": 6,
        "missedIngredients": [
            {
                "id": 10211821,
                "amount": 2,
                "unit": "servings",
                "unitLong": "servings",
                "unitShort": "servings",
                "aisle": "Produce",
                "name": "bell pepper",
                "original": "Freshly-ground black pepper to taste",
                "originalString": "Freshly-ground black pepper to taste",
                "originalName": "Freshly-ground black pepper to taste",
                "metaInformation": [
                    "black",
                    "freshly-ground",
                    "to taste"
                ],
                "meta": [
                    "black",
                    "freshly-ground",
                    "to taste"
                ],
                "extendedName": "black bell pepper",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/yellow-bell-pepper.jpg"
            },
            {
                "id": 11215,
                "amount": 1,
                "unit": "",
                "unitLong": "",
                "unitShort": "",
                "aisle": "Produce",
                "name": "garlic clove",
                "original": "1 Garlic clove",
                "originalString": "1 Garlic clove",
                "originalName": "Garlic clove",
                "metaInformation": [],
                "meta": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/garlic.png"
            },
            {
                "id": 11297,
                "amount": 0.25,
                "unit": "cup",
                "unitLong": "cups",
                "unitShort": "cup",
                "aisle": "Produce;Spices and Seasonings",
                "name": "parsley",
                "original": "1/4 cup Chopped fresh Italian parsley",
                "originalString": "1/4 cup Chopped fresh Italian parsley",
                "originalName": "Chopped fresh Italian parsley",
                "metaInformation": [
                    "fresh",
                    "italian",
                    "chopped"
                ],
                "meta": [
                    "fresh",
                    "italian",
                    "chopped"
                ],
                "extendedName": "italian fresh parsley",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/parsley.jpg"
            },
            {
                "id": 10411529,
                "amount": 2,
                "unit": "cups",
                "unitLong": "cups",
                "unitShort": "cup",
                "aisle": "Produce",
                "name": "plum tomatoes",
                "original": "2 cups Canned plum tomatoes drained, and",
                "originalString": "2 cups Canned plum tomatoes drained, and",
                "originalName": "Canned plum tomatoes drained, and",
                "metaInformation": [
                    "canned",
                    "drained"
                ],
                "meta": [
                    "canned",
                    "drained"
                ],
                "extendedName": "canned plum tomatoes",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/plum-tomatoes.png"
            },
            {
                "id": 15270,
                "amount": 0.5,
                "unit": "pound",
                "unitLong": "pounds",
                "unitShort": "lb",
                "aisle": "Seafood",
                "name": "shrimp",
                "original": "1/2 pound Shrimp, shelled and deveined",
                "originalString": "1/2 pound Shrimp, shelled and deveined",
                "originalName": "Shrimp, shelled and deveined",
                "metaInformation": [
                    "shelled",
                    "deveined"
                ],
                "meta": [
                    "shelled",
                    "deveined"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/shrimp.png"
            },
            {
                "id": 99074,
                "amount": 0.5,
                "unit": "pound",
                "unitLong": "pounds",
                "unitShort": "lb",
                "aisle": "Gourmet",
                "name": "squid ink pasta",
                "original": "1/2 pound Dried squid ink linguine or 1/4 cup Extra-virgin olive oil",
                "originalString": "1/2 pound Dried squid ink linguine or 1/4 cup Extra-virgin olive oil",
                "originalName": "Dried squid ink linguine or 1/4 cup Extra-virgin olive oil",
                "metaInformation": [
                    "dried",
                    "extra-virgin"
                ],
                "meta": [
                    "dried",
                    "extra-virgin"
                ],
                "extendedName": "dried squid ink pasta",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/squid-ink-pasta.jpg"
            }
        ],
        "likes": 0,
        "usedIngredients": [],
        "unusedIngredients": [],
        "title": "Pasta and Seafood",
        "image": "https://spoonacular.com/recipeImages/654812-312x231.jpg",
        "imageType": "jpg"
    },
    {
        "id": 654857,
        "usedIngredientCount": 0,
        "missedIngredientCount": 12,
        "missedIngredients": [
            {
                "id": 10218364,
                "amount": 4,
                "unit": "",
                "unitLong": "",
                "unitShort": "",
                "aisle": "Bakery/Bread;Pasta and Rice;Ethnic Foods",
                "name": "flour tortilla",
                "original": "4 Large Low-Fat Flour Tortilla",
                "originalString": "4 Large Low-Fat Flour Tortilla",
                "originalName": "Large Low-Fat Flour Tortilla",
                "metaInformation": [
                    "low-fat"
                ],
                "meta": [
                    "low-fat"
                ],
                "extendedName": "low fat flour tortilla",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/flour-tortilla.jpg"
            },
            {
                "id": 23657,
                "amount": 0.5,
                "unit": "pound",
                "unitLong": "pounds",
                "unitShort": "lb",
                "aisle": "Meat",
                "name": "flank steak",
                "original": "1/2 pound Flank Steak, sliced into thin strips",
                "originalString": "1/2 pound Flank Steak, sliced into thin strips",
                "originalName": "Flank Steak, sliced into thin strips",
                "metaInformation": [
                    "sliced into thin strips"
                ],
                "meta": [
                    "sliced into thin strips"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/flank-steak.jpg"
            },
            {
                "id": 11821,
                "amount": 1,
                "unit": "",
                "unitLong": "",
                "unitShort": "",
                "aisle": "Produce",
                "name": "red bell pepper",
                "original": "1 Red Bell Pepper (or any color combination), julienned",
                "originalString": "1 Red Bell Pepper (or any color combination), julienned",
                "originalName": "Red Bell Pepper (or any color combination), julienned",
                "metaInformation": [
                    "red",
                    "or any color combination), julienned"
                ],
                "meta": [
                    "red",
                    "or any color combination), julienned"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/red-pepper.jpg"
            },
            {
                "id": 11282,
                "amount": 1,
                "unit": "",
                "unitLong": "",
                "unitShort": "",
                "aisle": "Produce",
                "name": "onion",
                "original": "1 Onion, julienned",
                "originalString": "1 Onion, julienned",
                "originalName": "Onion, julienned",
                "metaInformation": [
                    "julienned"
                ],
                "meta": [
                    "julienned"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/brown-onion.png"
            },
            {
                "id": 16015,
                "amount": 1,
                "unit": "cup",
                "unitLong": "cup",
                "unitShort": "cup",
                "aisle": "Pasta and Rice;Canned and Jarred",
                "name": "black beans",
                "original": "1 cup Unsalted Black Beans, drained",
                "originalString": "1 cup Unsalted Black Beans, drained",
                "originalName": "Unsalted Black Beans, drained",
                "metaInformation": [
                    "unsalted",
                    "drained"
                ],
                "meta": [
                    "unsalted",
                    "drained"
                ],
                "extendedName": "unsalted black beans",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/black-beans.jpg"
            },
            {
                "id": 6599,
                "amount": 1.5,
                "unit": "cups",
                "unitLong": "cups",
                "unitShort": "cup",
                "aisle": "Pasta and Rice;Ethnic Foods",
                "name": "enchilada sauce",
                "original": "1 1/2 cups Chipotlé Enchilada Sauce",
                "originalString": "1 1/2 cups Chipotlé Enchilada Sauce",
                "originalName": "Chipotlé Enchilada Sauce",
                "metaInformation": [],
                "meta": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/harissa.jpg"
            },
            {
                "id": 27027,
                "amount": 1,
                "unit": "cup",
                "unitLong": "cup",
                "unitShort": "cup",
                "aisle": "Canned and Jarred;Ethnic Foods",
                "name": "pico de gallo",
                "original": "1 cup Pico de Gallo",
                "originalString": "1 cup Pico de Gallo",
                "originalName": "Pico de Gallo",
                "metaInformation": [],
                "meta": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/pico-de-gallo.png"
            },
            {
                "id": 11215,
                "amount": 4,
                "unit": "",
                "unitLong": "",
                "unitShort": "",
                "aisle": "Produce",
                "name": "garlic cloves",
                "original": "4 Garlic Cloves, 2 smashed, 2 finely minced",
                "originalString": "4 Garlic Cloves, 2 smashed, 2 finely minced",
                "originalName": "Garlic Cloves, 2 smashed, 2 finely minced",
                "metaInformation": [
                    "finely minced",
                    "smashed"
                ],
                "meta": [
                    "finely minced",
                    "smashed"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/garlic.png"
            },
            {
                "id": 11165,
                "amount": 8,
                "unit": "tablespoons",
                "unitLong": "tablespoons",
                "unitShort": "Tbsp",
                "aisle": "Produce;Spices and Seasonings",
                "name": "cilantro",
                "original": "8 tablespoons Chopped Cilantro",
                "originalString": "8 tablespoons Chopped Cilantro",
                "originalName": "Chopped Cilantro",
                "metaInformation": [
                    "chopped"
                ],
                "meta": [
                    "chopped"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/cilantro.png"
            },
            {
                "id": 1042027,
                "amount": 1,
                "unit": "serving",
                "unitLong": "serving",
                "unitShort": "serving",
                "aisle": null,
                "name": "seasoning",
                "original": "Mexican Dried Herb Seasoning",
                "originalString": "Mexican Dried Herb Seasoning",
                "originalName": "Mexican Dried Herb Seasoning",
                "metaInformation": [
                    "dried"
                ],
                "meta": [
                    "dried"
                ],
                "extendedName": "dried seasoning",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/seasoning.png"
            },
            {
                "id": 9159,
                "amount": 2,
                "unit": "",
                "unitLong": "",
                "unitShort": "",
                "aisle": "Produce",
                "name": "limes",
                "original": "2 Limes (or lemons), sliced into wedges",
                "originalString": "2 Limes (or lemons), sliced into wedges",
                "originalName": "Limes (or lemons), sliced into wedges",
                "metaInformation": [
                    "sliced into wedges",
                    "(or lemons)"
                ],
                "meta": [
                    "sliced into wedges",
                    "(or lemons)"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/lime.jpg"
            },
            {
                "id": 11979,
                "amount": 4,
                "unit": "",
                "unitLong": "",
                "unitShort": "",
                "aisle": "Canned and Jarred;Produce;Ethnic Foods",
                "name": "jalapeno peppers",
                "original": "4 Jalapeno Peppers (optional)",
                "originalString": "4 Jalapeno Peppers (optional)",
                "originalName": "Jalapeno Peppers (optional)",
                "metaInformation": [],
                "meta": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/jalapeno-pepper.png"
            }
        ],
        "likes": 0,
        "usedIngredients": [],
        "unusedIngredients": [],
        "title": "Pasta On The Border",
        "image": "https://spoonacular.com/recipeImages/654857-312x231.jpg",
        "imageType": "jpg"
    },
    {
        "id": 654883,
        "usedIngredientCount": 0,
        "missedIngredientCount": 14,
        "missedIngredients": [
            {
                "id": 2044,
                "amount": 1.5,
                "unit": "teaspoons",
                "unitLong": "teaspoons",
                "unitShort": "tsp",
                "aisle": "Produce;Spices and Seasonings",
                "name": "basil",
                "original": "1 1/2 teaspoons Basil, crumbled",
                "originalString": "1 1/2 teaspoons Basil, crumbled",
                "originalName": "Basil, crumbled",
                "metaInformation": [
                    "crumbled"
                ],
                "meta": [
                    "crumbled"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/basil.jpg"
            },
            {
                "id": 10011693,
                "amount": 28,
                "unit": "oz",
                "unitLong": "ounces",
                "unitShort": "oz",
                "aisle": "Canned and Jarred",
                "name": "canned tomatoes",
                "original": "1 28 oz can whole tomatoes, undrained/crushed",
                "originalString": "1 28 oz can whole tomatoes, undrained/crushed",
                "originalName": "whole tomatoes, undrained/crushed",
                "metaInformation": [
                    "whole",
                    "canned"
                ],
                "meta": [
                    "whole",
                    "canned"
                ],
                "extendedName": "whole canned tomatoes",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/tomatoes-canned.png"
            },
            {
                "id": 11124,
                "amount": 1,
                "unit": "cup",
                "unitLong": "cup",
                "unitShort": "cup",
                "aisle": "Produce",
                "name": "carrot",
                "original": "1 cup carrot, sliced",
                "originalString": "1 cup carrot, sliced",
                "originalName": "carrot, sliced",
                "metaInformation": [
                    "sliced"
                ],
                "meta": [
                    "sliced"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/sliced-carrot.png"
            },
            {
                "id": 11143,
                "amount": 1,
                "unit": "cup",
                "unitLong": "cup",
                "unitShort": "cup",
                "aisle": "Produce",
                "name": "celery",
                "original": "1 cup celery, sliced",
                "originalString": "1 cup celery, sliced",
                "originalName": "celery, sliced",
                "metaInformation": [
                    "sliced"
                ],
                "meta": [
                    "sliced"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/celery.jpg"
            },
            {
                "id": 6194,
                "amount": 3,
                "unit": "",
                "unitLong": "",
                "unitShort": "",
                "aisle": "Canned and Jarred",
                "name": "chicken broth",
                "original": "3 chicken broth,",
                "originalString": "3 chicken broth,",
                "originalName": "chicken broth",
                "metaInformation": [],
                "meta": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/chicken-broth.png"
            },
            {
                "id": 11215,
                "amount": 1,
                "unit": "Clove",
                "unitLong": "Clove",
                "unitShort": "Clove",
                "aisle": "Produce",
                "name": "garlic",
                "original": "1 Clove (large) garlic, minced",
                "originalString": "1 Clove (large) garlic, minced",
                "originalName": "(large) garlic, minced",
                "metaInformation": [
                    "minced",
                    "(large)"
                ],
                "meta": [
                    "minced",
                    "(large)"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/garlic.png"
            },
            {
                "id": 11052,
                "amount": 9,
                "unit": "oz",
                "unitLong": "ounces",
                "unitShort": "oz",
                "aisle": "Produce",
                "name": "green beans",
                "original": "1 9 oz pkg green beans, frozen",
                "originalString": "1 9 oz pkg green beans, frozen",
                "originalName": "pkg green beans, frozen",
                "metaInformation": [
                    "frozen"
                ],
                "meta": [
                    "frozen"
                ],
                "extendedName": "frozen green beans",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/green-beans-or-string-beans.jpg"
            },
            {
                "id": 20499,
                "amount": 1,
                "unit": "cup",
                "unitLong": "cup",
                "unitShort": "cup",
                "aisle": "Pasta and Rice",
                "name": "macaroni",
                "original": "1 cup macaroni, uncooked",
                "originalString": "1 cup macaroni, uncooked",
                "originalName": "macaroni, uncooked",
                "metaInformation": [
                    "uncooked"
                ],
                "meta": [
                    "uncooked"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/elbow.jpg"
            },
            {
                "id": 2023,
                "amount": 0.5,
                "unit": "teaspoon",
                "unitLong": "teaspoons",
                "unitShort": "tsp",
                "aisle": "Produce;Spices and Seasonings",
                "name": "marjoram",
                "original": "1/2 teaspoon marjoram",
                "originalString": "1/2 teaspoon marjoram",
                "originalName": "marjoram",
                "metaInformation": [],
                "meta": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/marjoram.jpg"
            },
            {
                "id": 11282,
                "amount": 1,
                "unit": "medium",
                "unitLong": "medium",
                "unitShort": "medium",
                "aisle": "Produce",
                "name": "onion",
                "original": "1 medium Onion, chopped",
                "originalString": "1 medium Onion, chopped",
                "originalName": "Onion, chopped",
                "metaInformation": [
                    "chopped"
                ],
                "meta": [
                    "chopped"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/brown-onion.png"
            },
            {
                "id": 2027,
                "amount": 1.5,
                "unit": "teaspoons",
                "unitLong": "teaspoons",
                "unitShort": "tsp",
                "aisle": "Produce;Spices and Seasonings",
                "name": "oregano",
                "original": "1 1/2 teaspoons Oregano, crumbled",
                "originalString": "1 1/2 teaspoons Oregano, crumbled",
                "originalName": "Oregano, crumbled",
                "metaInformation": [
                    "crumbled"
                ],
                "meta": [
                    "crumbled"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/oregano.jpg"
            },
            {
                "id": 1033,
                "amount": 1,
                "unit": "cup",
                "unitLong": "cup",
                "unitShort": "cup",
                "aisle": "Cheese",
                "name": "parmesan cheese",
                "original": "1 cup Grated Parmesan cheese",
                "originalString": "1 cup Grated Parmesan cheese",
                "originalName": "Grated Parmesan cheese",
                "metaInformation": [
                    "grated"
                ],
                "meta": [
                    "grated"
                ],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/parmesan.jpg"
            },
            {
                "id": 2049,
                "amount": 0.5,
                "unit": "teaspoon",
                "unitLong": "teaspoons",
                "unitShort": "tsp",
                "aisle": "Produce;Spices and Seasonings",
                "name": "thyme",
                "original": "1/2 teaspoon thyme",
                "originalString": "1/2 teaspoon thyme",
                "originalName": "thyme",
                "metaInformation": [],
                "meta": [],
                "image": "https://spoonacular.com/cdn/ingredients_100x100/thyme.jpg"
            },
            {
                "id": 11887,
                "amount": 6,
                "unit": "oz",
                "unitLong": "ounces",
                "unitShort": "oz",
                "aisle": "Pasta and Rice",
                "name": "tomato paste",
                "original": "1 6 oz can tomato paste",
                "originalString": "1 6 oz can tomato paste",
                "originalName": "tomato paste",
                "metaInformation": [
                    "canned"
                ],
                "meta": [
                    "canned"
                ],
                "extendedName": "canned tomato paste",
                "image": "https://spoonacular.com/cdn/ingredients_100x100/tomato-paste.jpg"
            }
        ],
        "likes": 0,
        "usedIngredients": [],
        "unusedIngredients": [],
        "title": "Pasta Vegetable Soup",
        "image": "https://spoonacular.com/recipeImages/654883-312x231.jpg",
        "imageType": "jpg"
    }
  ]


export {getLocal, setLocal, importAll, commonActions, 
    disableScroll, enableScroll, openRecipe, popularRecipes}