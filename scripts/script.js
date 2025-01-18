import { createRecipesHTML } from './helpers.js'

// DOM Element
const displayPopularRecipe = document.getElementById('displayPopularRecipe')
const displayRecipeForBeginners = document.getElementById(
  'displayRecipeForBeginners'
)

// Initial Display
renderRecipe(displayPopularRecipe, 'popular')
renderRecipe(displayRecipeForBeginners, 'easy')

async function renderRecipe(displayElement, type) {
  displayElement.innerHTML += `<p class="text-3xl">Loading...</p>`

  try {
    const response = await fetch('https://dummyjson.com/recipes?limit=0')
    const { recipes } = await response.json()

    if (recipes) {
      let filteredRecipes
      if (type === 'popular') {
        // Filter recipes based on rating
        filteredRecipes = recipes
          .filter((recipe) => recipe.rating > 4.8)
          .slice(0, 8)
      } else if (type === 'easy') {
        // Filter recipes based on difficulty
        filteredRecipes = recipes
          .filter((recipe) => recipe.difficulty === 'Easy')
          .slice(0, 8)
      }
      // Render the recipes if available
      createRecipesHTML(displayElement, filteredRecipes)
    } else {
      displayElement.innerHTML = ''
      displayElement.innerHTML = 'No Recipe Found'
    }
  } catch (error) {
    displayElement.innerHTML = 'An error occurred while fetching recipes.'
    console.error('Error fetching recipes:', error)
  }
}