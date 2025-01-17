const displayPopularRecipe = document.getElementById("displayPopularRecipe")
const displayRecipeForBeginners = document.getElementById("displayRecipeForBeginners")

renderRecipe(displayPopularRecipe, "popular")
renderRecipe(displayRecipeForBeginners, "easy")

async function renderRecipe(displayElement, type) {
  displayElement.innerHTML += `<p class="text-3xl">Loading...</p>`

  try {
    const response = await fetch('https://dummyjson.com/recipes?limit=0')
    const { recipes } = await response.json()

    if (recipes) {
      let filteredRecipes
      if (type === "popular") {
        // Filter recipes based on rating
        filteredRecipes = recipes.filter((recipe) => recipe.rating > 4.8).slice(0, 8)
      } else if (type === "easy") {
        // Filter recipes based on difficulty
        filteredRecipes = recipes.filter((recipe) => recipe.difficulty === "Easy").slice(0, 8)
      }
      // Render the recipes if available
      if (filteredRecipes.length > 0) {
        displayElement.innerHTML = filteredRecipes.map(recipe => `
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
        `).join('')
      } else {
        displayElement.innerHTML = ""
        displayElement.innerHTML = "No Recipe Found"
      }
    } else {
      displayElement.innerHTML = ""
      displayElement.innerHTML = "No Recipe Found"
    }
  } catch (error) {
    displayElement.innerHTML = "An error occurred while fetching recipes.";
    console.error('Error fetching recipes:', error);
  }
}