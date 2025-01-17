const displayRecommendedRecipe = document.getElementById("displayRecommendedRecipe")
const displayRecipeForBeginners = document.getElementById("displayRecipeForBeginners")

async function renderRecommendedRecipe() {
  try {
    displayRecommendedRecipe.innerHTML += `<p class="text-3xl">Loading...</p>`

    const response = await fetch('https://dummyjson.com/recipes?limit=0')
    const body = await response.json()
    
    if (body && body.recipes) {
      const recipes = body.recipes.filter((recipe) => recipe.rating > 4.8).slice(0, 8)
      displayRecommendedRecipe.innerHTML = ""
      {
        recipes.forEach((recipe) => {
          displayRecommendedRecipe.innerHTML += `
        <div class="flex flex-col border-2 border-zinc-500 rounded-md overflow-hidden">
          <img src=${recipe.image} alt=${recipe.name} class="">
          <div class="h-full flex flex-col justify-between">
            <p class="font-semibold text-lg p-2 hover:underline decoration-emerald-500 underline-offset-2">${recipe.name}</p>
            <div class="p-2 flex justify-between items-center">
              <p class="">⭐${recipe.rating}/5</p>
              <p>${recipe.cookTimeMinutes} mins</p>
            </div>
          </div>
        </div>
      `
        })
      }
    } else {
      displayRecommendedRecipe.innerHTML += "No Recipe Found"
    }
  } catch (error) {
    displayRecommendedRecipe.innerHTML = "An error occurred while fetching recipes.";
    console.error('Error fetching recipes:', error);
  }
}

async function renderRecipeForBeginners() {
  try {
    displayRecipeForBeginners.innerHTML += `<p class="text-3xl">Loading...</p>`

    const response = await fetch('https://dummyjson.com/recipes?limit=0')
    const body = await response.json()
    
    if (body && body.recipes) {
      const recipes = body.recipes.filter((recipe) => recipe.difficulty === "Easy").slice(0, 8)
      displayRecipeForBeginners.innerHTML = ""
      {
        recipes.forEach((recipe) => {
          displayRecipeForBeginners.innerHTML += `
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
      displayRecipeForBeginners.innerHTML += "No Recipe Found"
    }
  } catch (error) {
    displayRecipeForBeginners.innerHTML = "An error occurred while fetching recipes.";
    console.error('Error fetching recipes:', error);
  }
}

renderRecommendedRecipe()
renderRecipeForBeginners()