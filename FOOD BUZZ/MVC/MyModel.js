//Storing the data / Handling the data
const anotherRecipeObject = {
    recipeObject : {}
}

async function storeRecipeData(){
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
}