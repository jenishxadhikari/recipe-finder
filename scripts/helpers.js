export function handleViewRecipe(recipeId) {
  window.location.href = `recipe.html?id=${recipeId}`
}

export function createRecipesHTML(displayElement, recipes) {
  if (recipes.length > 0) {
    displayElement.innerHTML = recipes
      .map(
        (recipe) => `
      <div class="flex flex-col border-2 border-zinc-500 rounded-md overflow-hidden">
        <img src=${recipe.image} alt=${recipe.name} class="">
        <div class="h-full flex flex-col justify-between">
          <p class="font-semibold text-lg p-2 hover:underline decoration-emerald-500 underline-offset-2">${
            recipe.name
          }</p>
          <div class="p-2 flex justify-between items-center">
            <p class="">⭐${recipe.rating}/5</p>
            <p>${recipe.cookTimeMinutes + recipe.prepTimeMinutes} mins</p>
          </div>
        </div>
        <button id=${
          recipe.id
        } class="viewRecipe bg-emerald-500 text-white font-semibold py-1 m-1 rounded-md">View Recipe</button>
      </div>
    `
      )
      .join('')
    document.querySelectorAll('.viewRecipe').forEach((button) => {
      button.addEventListener('click', () => {
        handleViewRecipe(button.id)
      })
    })
  } else {
    displayElement.innerHTML = ''
    displayElement.innerHTML = 'No Recipe Found'
  }
}
