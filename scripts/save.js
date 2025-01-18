// DOM Element
const displaySavedRecipes = document.getElementById("displaySavedRecipes")

// Local localStorage
const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || []

renderSavedRecipes()

function handleViewRecipe(recipeId) {
  window.location.href = `recipe.html?id=${recipeId}`;
}

async function renderSavedRecipes() {
  displaySavedRecipes.innerHTML = `<p class="text-3xl">Loading...</p>`
  try {
    let selectedRecipes = []
    for (let id of savedRecipes) {
      const response = await fetch(`https://dummyjson.com/recipes/${id}`)
      const recipe = await response.json()
      selectedRecipes.push(recipe)
    }
    if (selectedRecipes.length > 0) {
      displaySavedRecipes.innerHTML = ""
      displaySavedRecipes.innerHTML = selectedRecipes.map(recipe =>
        `
        <div class="flex flex-col border-2 border-zinc-500 rounded-md overflow-hidden">
          <img src=${recipe.image} alt=${recipe.name} class="">
          <div class="h-full flex flex-col justify-between">
            <p class="font-semibold text-lg p-2 hover:underline decoration-emerald-500 underline-offset-2">${recipe.name}</p>
            <div class="p-2 flex justify-between items-center">
              <p class="">⭐${recipe.rating}/5</p>
              <p>${recipe.cookTimeMinutes + recipe.prepTimeMinutes} mins</p>
            </div>
          </div>
          <button id=${recipe.id} class="viewRecipe bg-emerald-500 text-white font-semibold py-1 m-1 rounded-md">View Recipe</button>
        </div>
      `
      ).join('')    
      document.querySelectorAll(".viewRecipe").forEach((recipe) => {
        recipe.addEventListener("click", () => {
          handleViewRecipe(recipe.id)
        })
      })
    } else {
      displaySavedRecipes.innerHTML = ""
      displaySavedRecipes.innerHTML = "No Recipe Found"
    }
  } catch (error) {
    displaySavedRecipes.innerHTML = "An error occurred while fetching recipes.";
    console.error('Error fetching recipes:', error);
  }
}