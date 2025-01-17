// DOM Element
const filterDialog = document.querySelector("dialog")
const displayTags = document.getElementById("displayTags")
const displayRecipes = document.getElementById("displayRecipes")
const filter = document.getElementById("filter")
const close = document.getElementById("close")

async function renderTags() {
  try {
    displayTags.innerHTML += `<p class="text-3xl">Loading...</p>`

    const response = await fetch('https://dummyjson.com/recipes/tags')
    const tags =  await response.json()
    
    if (tags.length > 0) {
      displayTags.innerHTML = ""
      {tags.forEach(tag => {
        displayTags.innerHTML += `
          <li class="flex items-center gap-1">
            <input type="checkbox" id=${tag} class="size-4">
            <span class="text-nowrap md:text-lg">${tag}</span>
          </li>
        `
      });}
      
    } else {
      displayTags.innerHTML = ""
      displayTags.innerHTML += "No tags found"
    }
  } catch (error) {
    displayRecommendedRecipe.innerHTML = "An error occurred while fetching recipes.";
    console.error('Error fetching recipes:', error);
  }
}

async function renderRecipes() {
  try {
    displayRecipes.innerHTML += `<p class="text-3xl">Loading...</p>`

    const response = await fetch('https://dummyjson.com/recipes?limit=0&sortBy=name&order=asc')
    const body = await response.json()
    
    if (body && body.recipes) {
      const recipes = body.recipes
      displayRecipes.innerHTML = ""
      {
        recipes.forEach((recipe) => {
          displayRecipes.innerHTML += `
        <div class="flex flex-col border-2 border-zinc-500 rounded-md overflow-hidden">
          <img src=${recipe.image} alt=${recipe.name} class="">
          <div class="h-full flex flex-col justify-between">
            <p class="font-semibold text-lg p-2 hover:underline decoration-emerald-500 underline-offset-2">${recipe.name}</p>
            <div class="p-2 flex justify-between items-center">
              <p class="">⭐${recipe.rating}/5</p>
              <p>${recipe.cookTimeMinutes + recipe.prepTimeMinutes} mins</p>
            </div>
          </div>
        </div>
      `
        })
      }
    } else {
      displayRecipes.innerHTML += "No Recipe Found"
    }
  } catch (error) {
    displayRecipes.innerHTML = "An error occurred while fetching recipes.";
    console.error('Error fetching recipes:', error);
  }
}

// Event Handlers
function handleOpenDialog(){
  filterDialog.showModal()
}

function handleCloseDialog(){
  filterDialog.close()
}

renderTags()
renderRecipes()

filter.addEventListener("click", handleOpenDialog)
close.addEventListener("click", handleCloseDialog)