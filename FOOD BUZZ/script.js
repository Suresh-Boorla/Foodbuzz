//https://forkify-api.herokuapp.com/v2

const searchBtn = document.getElementById("search")
const searchInput = document.getElementById("searchinput")

const leftContainer = document.getElementById("left-container")
const rightContainer = document.getElementById("right-container")
const Text = document.getElementById("text")


searchBtn.addEventListener("click", () => {
    getRecipeData()
})

async function getRecipeData() {
    try {
        const searchItem = searchInput.value
        const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchItem}&key=d0876efa-41ea-4ca8-86d1-b86b707f2206`)
        const recipeData = await response.json()
        const recipeArray = recipeData.data.recipes
        recipeArray.map(function (i) {
            // console.log(i)
            const myPublisher = i.publisher
            const myTitle = i.title
            const myImageUrl = i.image_url
            const myId = i.id
            // console.log(myId)

            return leftContainer.insertAdjacentHTML("afterbegin", `
                <a href="#${myId}">
                <div class="left-food-container">
            <img src="${myImageUrl}" id="myimage"/>
            <h2 id="mypublisher">${myPublisher}</h2>
            <h3 id="mytitle">${myTitle}</h3>
        </div>
        </a>
        
    `)
        })
    }

    catch (e) {
        alert(e)
    }
}

async function loadParticularRecipe() {
    //Logic to collect the hash id
    const hashID = window.location.hash.slice(1)
    // console.log(hashID);

    const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${hashID}`)
    const recipeData = await response.json()
    // console.log(recipeData.data.recipe);
    const recipeObject = {
        publisher: recipeData.data.recipe.publisher,
        title: recipeData.data.recipe.title,
        imageUrl: recipeData.data.recipe.image_url,
        servings: recipeData.data.recipe.servings,
        cookingTime: recipeData.data.recipe.cooking_time,
        ingredients: recipeData.data.recipe.ingredients,
    }
    // console.log(recipeObject);
    rightContainer.innerText = ""

    const rightData = `<div class="right-food-container">
            <img class="right-image" src="${recipeObject.imageUrl}"/>
            <h2 class="right-title">Item : ${recipeObject.title}</h2>
            <h3 class="right-publisher">Publisher : ${recipeObject.publisher}</h3>
            <h3 class="right-servings">Servings : ${recipeObject.servings}</h3>
            <h3 class="right-cookingTime">cooking Time : ${recipeObject.cookingTime}</h3>
            
            <div class="ingredients">
            ${recipeObject.ingredients.map(function (i) {
        // console.log(i)
        return `<div>
                <span>${i.description}</span> --
                <span>${i.quantity}</span>
                <span>${i.unit}</span>
                </div>`
    }).join('')}
            </div>

        </div>`

    rightContainer.insertAdjacentHTML("afterbegin", rightData)
}
loadParticularRecipe()

window.addEventListener("hashchange", loadParticularRecipe)

// https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e8807