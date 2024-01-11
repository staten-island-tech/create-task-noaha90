import './style.css'


let viewed = []
async function mainCall(){
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  const data = await response.json(); 
  let categoriesList = []
  data.categories.forEach(catergory => {categoriesList.push(catergory)})
  console.log(categoriesList)
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
      console.log(img)
      getInfo(img.id,img)
    });
  })
}


async function getInfo(id,img){
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  const data = await response.json(); 
  document.getElementById("favorites").cloneNode(img)
  document.getElementById("info").innerHTML = ""
  document.getElementById("info").insertAdjacentHTML("afterbegin",`<p>${data.meals[0].strInstructions}</p>`)
}
mainCall()