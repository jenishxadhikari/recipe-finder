// DOM Element
const displayRecipeInfo = document.getElementById('displayRecipeInfo')
const shareButton = document.getElementById('share-button')

// Get recipe ID
const urlParams = new URLSearchParams(window.location.search)
const url = window.location.href

const id = Number(urlParams.get('id'))

// Local Data Storage
const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || []

// Render the recipe
renderRecipe(id)

function updateLocalStorage() {
  localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes))
}

async function renderRecipe(id) {
  if (!id) {
    displayRecipeInfo.innerHTML = 'No Recipe Found'
    return
  }

  displayRecipeInfo.innerHTML = `<p class="text-3xl">Loading...</p>`

  try {
    const response = await fetch(`https://dummyjson.com/recipes/${id}`)
    const recipe = await response.json()

    if (!recipe.message) {
      displayRecipeInfo.innerHTML = `
        <img src="${recipe.image}" alt="${
        recipe.name
      }" class="h-[200px] mx-auto rounded-md">
        <div class="py-3 space-y-3">
          <h1 class="font-bold text-2xl">${recipe.name}</h1>
          <div class="flex justify-between items-center">
            <ul class="space-y-1 px-4 py-2">
              <li>⭐ ${recipe.rating}/5</li>
              <li class="text-xs text-emerald-800">${
                recipe.reviewCount
              } <span class="text-zinc-500">Reviews</span></li>
            </ul>
            <ul class="bg-emerald-100 text-emerald-800 rounded-md text-xs p-2 font-medium space-y-0.5 tracking-wide">
              <li>Preparation Time - ${recipe.prepTimeMinutes} Mins</li>
              <li>Cooking Time - ${recipe.cookTimeMinutes} Mins</li>
              <li>Servings - ${recipe.servings}</li>
              <li>Difficulty - ${recipe.difficulty}</li>
              <li>Calories Per Serving - ${recipe.caloriesPerServing}</li>
            </ul>
            <div class="flex flex-col items-center gap-1 px-4 py-2 rounded-md">
              ${renderSaveButton(recipe)}
            </div>
          </div>
          <div class="p-2">
            <h2 class="font-medium underline decoration-emerald-500 underline-offset-2">Ingredients</h2>
            <ul class="mt-2 list-disc pl-8 space-y-2 tracking-wide text-pretty/7">
              ${recipe.ingredients
                .map((ingredient) => `<li>${ingredient}</li>`)
                .join('')}
            </ul>
          </div>
          <div class="p-2">
            <h2 class="font-medium underline decoration-emerald-500 underline-offset-2">Instructions</h2>
            <ul class="list-decimal px-8 mt-2 space-y-2 tracking-wide text-pretty/7 max-w-prose">
              ${recipe.instructions
                .map((instruction) => `<li>${instruction}</li>`)
                .join('')}
            </ul>
          </div>
        </div>`

      document.getElementById('save-button').addEventListener('click', () => {
        const saved = savedRecipes.includes(recipe.id)
        if (!saved) {
          savedRecipes.push(recipe.id)
        } else {
          const index = savedRecipes.findIndex((item) => item === recipe.id)
          savedRecipes.splice(index, 1)
        }
        updateLocalStorage()
        document.getElementById('save-button').parentElement.innerHTML =
          renderSaveButton(recipe)
        attachSaveButtonListener(recipe)
      })
    } else {
      displayRecipeInfo.innerHTML = ''
      displayRecipeInfo.innerHTML = 'No Recipe Found'
    }
  } catch (error) {
    displayRecipeInfo.innerHTML = 'An error occurred while fetching recipe info'
    console.error('Error fetching recipe info:', error)
  }
}

function renderSaveButton(recipe) {
  const saved = savedRecipes.includes(recipe.id)
  return `
    <span>${saved ? `Saved` : `Save`}</span>
    <button id="save-button">
      <img src="${
        saved ? `/images/heart-red.svg` : `/images/heart.svg`
      }" alt="">
    </button>`
}

function attachSaveButtonListener(recipe) {
  document.getElementById('save-button').addEventListener('click', () => {
    const saved = savedRecipes.includes(recipe.id)
    if (!saved) {
      savedRecipes.push(recipe.id)
    } else {
      const index = savedRecipes.findIndex((item) => item === recipe.id)
      savedRecipes.splice(index, 1)
    }
    updateLocalStorage()
    document.getElementById('save-button').parentElement.innerHTML =
      renderSaveButton(recipe)
    attachSaveButtonListener(recipe) // Re-attach listener after re-rendering
  })
}


shareButton.addEventListener("click", () => {
  navigator.clipboard.writeText(url)
  alert("Link Copied")
})