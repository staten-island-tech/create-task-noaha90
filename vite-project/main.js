import './style.css'

let viewed = []

async function mainCall(){
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  const data = await response.json(); 
  data.categories.forEach(catergory => {
    document.getElementById("options").insertAdjacentHTML("afterbegin",`
    <input type="checkbox" class="box" value="${catergory.strCategory}">
    <label for="${catergory.strCategory}">${catergory.strCategory}</label><br>`
    )});
    document.getElementById("call").addEventListener("click", (event) => {
      event.preventDefault()
      document.getElementById("selection").innerHTML = ""
      document.querySelectorAll(".box").forEach(box => {
        if(box.checked){
           APICall(box.value)  
        }
        })
    }); 
  }


async function APICall(input){
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${input}`)
  console.log(response.url)
  const data = await response.json(); 
  console.log(data)
  document.getElementById("selection").insertAdjacentHTML("beforeend",`<h2>${input}</h2>`)
  data.meals.forEach(dish => {document.getElementById("selection").insertAdjacentHTML("beforeend",`<p>${dish.strMeal}</p><img class="${input}" id="${dish.idMeal}"src="${dish.strMealThumb}">`)})
  document.querySelectorAll(`.${input}`).forEach(img => {
    img.addEventListener("click", (event) => {
      document.getElementById("info").innerHTML = ""
      displayMain(img.id)
      if(viewed.includes(img.id) === false){
        console.log(viewed.length)
        if(viewed.length > 4){
          viewed.shift();
        }
          viewed.push(img.id)
}
    });
  })
}


async function displayMain(id){
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  const data = await response.json(); 
  console.log(data)
  document.getElementById("info").insertAdjacentHTML("afterbegin",`<div class="infobox"><h1>${data.meals[0].strMeal}</h1><div class="foodInfo"><p>Type: ${data.meals[0].strCategory}          </p><p>Region: ${data.meals[0].strArea}</p></div><img id="${id}"src="${data.meals[0].strMealThumb}"><p>${data.meals[0].strInstructions}</p></div>`)
}
mainCall()


document.getElementById("history").addEventListener("click", (event) => {
  event.preventDefault()
  console.log(viewed)
  document.getElementById("info").innerHTML = ""
  viewed.forEach(dish =>displayMain(dish))
})