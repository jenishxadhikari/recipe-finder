// DOM Element
const filterDialog = document.querySelector("dialog")
const displayTags = document.getElementById("displayTags")
const displayRecipes = document.getElementById("displayRecipes")
const filter = document.getElementById("filter")
const close = document.getElementById("close")
const form = document.querySelector("form")
const search = document.getElementById("search")
const searchButton = document.getElementById("searchButton")

let selectedTags = []

// Initial Display
renderTags()
renderAllRecipes()

// Event Handlers
function handleOpenDialog() {
  filterDialog.showModal()
}

function handleCloseDialog() {
  form.reset()
  filterDialog.close()
  renderRecipes()
}

function handleSelectedTags(e) {
  selectedTags.push(e.target.value)
}

// Event Listeners
filter.addEventListener("click", handleOpenDialog)
close.addEventListener("click", handleCloseDialog)
searchButton.addEventListener("click", renderSearchedRecipes)

// Helper Functions
async function renderTags() {
  try {
    displayTags.innerHTML = `<p class="text-xl">Loading...</p>`

    const response = await fetch('https://dummyjson.com/recipes/tags')
    const tags = await response.json()

    if (tags.length > 0) {
      displayTags.innerHTML = ""
      displayTags.innerHTML = tags.map(tag => `
        <li class="flex items-center gap-1">
          <input type="checkbox" id="tag" value="${tag}" class="size-4">
          <span class="text-nowrap md:text-lg">${tag}</span>
        </li>
      `).join('');
      document.querySelectorAll("#tag").forEach((tag) => {
        tag.addEventListener("click", handleSelectedTags)
      })
    } else {
      displayTags.innerHTML = ""
      displayTags.innerHTML = "No tags found"
    }
  } catch (error) {
    displayTags.innerHTML = "An error occurred while fetching tags.";
    console.error('Error fetching tags:', error);
  }
}

async function renderAllRecipes() {
  displayRecipes.innerHTML = `<p class="text-3xl">Loading...</p>`
  try {
    const response = await fetch('https://dummyjson.com/recipes?limit=0&sortBy=name&order=asc')
    const { recipes } = await response.json()

    if (recipes.length > 0) {
      displayRecipes.innerHTML = ""
      displayRecipes.innerHTML = recipes.map(recipe =>
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
        </div>
      `
      ).join('')
    } else {
      displayRecipes.innerHTML = ""
      displayRecipes.innerHTML = "No Recipe Found"
    }
  } catch (error) {
    displayRecipes.innerHTML = "An error occurred while fetching recipes.";
    console.error('Error fetching recipes:', error);
  }
}

async function renderRecipes() {
  displayRecipes.innerHTML = ""

  if (selectedTags.length === 0) {
    return await renderAllRecipes()
  }

  displayRecipes.innerHTML += `<p class="text-3xl">Loading...</p>`
  try {
    let selectedRecipes = []
    for (let tag of selectedTags) {
      const response = await fetch(`https://dummyjson.com/recipes/tag/${tag}`)
      const { recipes } = await response.json()
      selectedRecipes = [...selectedRecipes, ...recipes]
    }
    // Remove duplicated recipes
    selectedRecipes = selectedRecipes.filter((item, index, self) =>
      index === self.findIndex((t) => t.id === item.id)
    )
    renderFilteredRecipes(selectedRecipes)
    selectedTags = []
  }
  catch (error) {
    displayRecipes.innerHTML = "An error occurred while fetching recipes.";
    console.error('Error fetching recipes:', error);
  }
}

function renderFilteredRecipes(recipes) {
  if (recipes.length > 0) {
    displayRecipes.innerHTML = ""
    displayRecipes.innerHTML = recipes.map(recipe => `
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
    ).join('')
  } else {
    displayRecipes.innerHTML = ""
    displayRecipes.innerHTML = "No Recipe Found"
  }
}

async function renderSearchedRecipes() {
  displayRecipes.innerHTML = `<p class="text-3xl">Loading...</p>`
  if(search.value === ""){
    return renderAllRecipes()
  }

  try {
    const response = await fetch(`https://dummyjson.com/recipes/search?q=${search.value}`)
    const { recipes } = await response.json()
    if (recipes.length > 0) {
      displayRecipes.innerHTML = ""
      displayRecipes.innerHTML = recipes.map(recipe =>
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
        </div>
      `
      ).join('')
    } else {
      displayRecipes.innerHTML = ""
      displayRecipes.innerHTML = "No Recipe Found"
    }
  } catch (error) {
    displayRecipes.innerHTML = "An error occurred while fetching recipes.";
    console.error('Error fetching recipes:', error);
  }
}