// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  // console.log(recipes);
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.
  return JSON.parse(localStorage.getItem('recipes') || '[]');
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. Get a reference to the <main> element
  const ref_main = document.querySelector("main");
  // A11. Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>
  recipes.forEach((cur_recipe) => {
    const cur_card = document.createElement("recipe-card");
    cur_card.data = cur_recipe;
    ref_main.appendChild(cur_card);
  });
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  const recipeStrings = JSON.stringify(recipes);
  localStorage.setItem('recipes', recipeStrings);
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {

  // B2. Get a reference to the <form> element
  const cur_form = document.getElementById("new-recipe");
  const cur_main = document.querySelector("main");
  
  // B3. TODO - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  cur_form.addEventListener("submit", () => {
    // Steps B4-B9 will occur inside the event listener from step B3
    // B4. Create a new FormData object from the <form> element reference above
    const save_form = new FormData(cur_form);
    // B5. Create an empty object (I'll refer to this object as recipeObject to
    //            make this easier to read), and then extract the keys and corresponding
    //            values from the FormData object and insert them into recipeObject
    const recipeObject = {};
    for (const [k, v] of save_form.entries()) {
      // Insert each key-value pair into recipeObject
      recipeObject[k] = v;
    }
    // B6. Create a new <recipe-card> element
    const new_card = document.createElement("recipe-card");
    // B7. Add the recipeObject data to <recipe-card> using element.data
    new_card.data = recipeObject;
    // B8. Append this new <recipe-card> to <main>
    cur_main.appendChild(new_card);
    // B9. Get the recipes array from localStorage, add this new recipe to it, and
    //            then save the recipes array back to localStorage
    const recipes_store = getRecipesFromStorage();
    recipes_store.push(recipeObject);
    saveRecipesToStorage(recipes_store);
  });

  // B10. Get a reference to the "Clear Local Storage" button
  const clear_butt = document.getElementsByClassName("danger")[0];

  // B11. TODO - Add a click event listener to clear local storage button
  clear_butt.addEventListener("click", () => {
    // Steps B12 & B13 will occur inside the event listener from step B11
    // B12. Clear the local storage
    localStorage.clear();
    // B13. TODO - Delete the contents of <main>
    cur_main.innerHTML = '';
    location.reload();
  });
}
