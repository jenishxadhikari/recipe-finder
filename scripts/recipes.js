import { createRecipesHTML } from './helpers.js'

// DOM Element
const filterDialog = document.querySelector('dialog')
const tagsContainer = document.getElementById('displayTags')
const recipesContainer = document.getElementById('displayRecipes')
const filterButton = document.getElementById('filter')
const closeButton = document.getElementById('close')
const filterForm = document.querySelector('form')
const searchInput = document.getElementById('search')
const searchButton = document.getElementById('searchButton')

let selectedTags = []

// Initial Display
renderTags()
renderAllRecipes()

// Event Handlers
function openFilterDialog() {
  filterDialog.showModal()
}

function closeFilterDialog() {
  filterForm.reset()
  filterDialog.close()
  renderRecipes()
}

function handleTagSelection(event) {
  selectedTags.push(event.target.value)
}

// Event Listeners
filterButton.addEventListener('click', openFilterDialog)
closeButton.addEventListener('click', closeFilterDialog)
searchButton.addEventListener('click', renderSearchedRecipes)

// Helper Functions
async function renderTags() {
  try {
    tagsContainer.innerHTML = `<p class="text-xl">Loading...</p>`

    const response = await fetch('https://dummyjson.com/recipes/tags')
    const tags = await response.json()

    if (tags.length > 0) {
      tagsContainer.innerHTML = ''
      tagsContainer.innerHTML = tags
        .map(
          (tag) => `
        <li class="flex items-center gap-1">
          <input type="checkbox" value="${tag}" class="size-4">
          <span class="text-nowrap md:text-lg">${tag}</span>
        </li>
      `
        )
        .join('')
      document
        .querySelectorAll("input[type='checkbox']")
        .forEach((checkbox) => {
          checkbox.addEventListener('click', handleTagSelection)
        })
    } else {
      tagsContainer.innerHTML = 'No tags found'
    }
  } catch (error) {
    tagsContainer.innerHTML = 'An error occurred while fetching tags.'
    console.error('Error fetching tags:', error)
  }
}

async function renderAllRecipes() {
  recipesContainer.innerHTML = `<p class="text-3xl">Loading...</p>`
  try {
    const response = await fetch(
      'https://dummyjson.com/recipes?limit=0&sortBy=name&order=asc'
    )
    const { recipes } = await response.json()
    createRecipesHTML(recipesContainer, recipes)
  } catch (error) {
    recipesContainer.innerHTML = 'An error occurred while fetching recipes.'
    console.error('Error fetching recipes:', error)
  }
}

async function renderRecipes() {
  recipesContainer.innerHTML = ''

  if (selectedTags.length === 0) {
    return await renderAllRecipes()
  }

  recipesContainer.innerHTML = `<p class="text-3xl">Loading...</p>`
  try {
    let filteredRecipes = []
    for (let tag of selectedTags) {
      const response = await fetch(`https://dummyjson.com/recipes/tag/${tag}`)
      const { recipes } = await response.json()
      filteredRecipes = [...filteredRecipes, ...recipes]
    }
    // Remove duplicate recipes
    filteredRecipes = filteredRecipes.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id)
    )
    createRecipesHTML(recipesContainer, filteredRecipes)
    selectedTags = []
  } catch (error) {
    recipesContainer.innerHTML = 'An error occurred while fetching recipes.'
    console.error('Error fetching recipes:', error)
  }
}

async function renderSearchedRecipes() {
  recipesContainer.innerHTML = `<p class="text-3xl">Loading...</p>`
  if (searchInput.value === '') {
    return renderAllRecipes()
  }

  try {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${searchInput.value}`
    )
    const { recipes } = await response.json()
    createRecipesHTML(recipesContainer, recipes)
  } catch (error) {
    recipesContainer.innerHTML = 'An error occurred while fetching recipes.'
    console.error('Error fetching recipes:', error)
  }
}
