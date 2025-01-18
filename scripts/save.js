import { createRecipesHTML } from './helpers.js'

// DOM Element
const displaySavedRecipes = document.getElementById('displaySavedRecipes')

// Local localStorage
const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || []

renderSavedRecipes()

async function renderSavedRecipes() {
  displaySavedRecipes.innerHTML = `<p class="text-3xl">Loading...</p>`
  try {
    let selectedRecipes = []
    for (let id of savedRecipes) {
      const response = await fetch(`https://dummyjson.com/recipes/${id}`)
      const recipe = await response.json()
      selectedRecipes.push(recipe)
    }
    createRecipesHTML(displaySavedRecipes, selectedRecipes)
  } catch (error) {
    displaySavedRecipes.innerHTML = 'An error occurred while fetching recipes.'
    console.error('Error fetching recipes:', error)
  }
}