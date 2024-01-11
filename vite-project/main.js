import './style.css'

async function mainCall(){
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  const data = await response.json(); 
  data.categories.forEach(catergory => {
    document.getElementById("categories").insertAdjacentHTML("afterbegin",`
    <input type="checkbox" class="box" value="${catergory.strCategory}">
    <label for="${catergory.strCategory}">${catergory.strCategory}</label><br>`
    )});
    document.getElementById("call").addEventListener("click", (event) => {
      event.preventDefault()
      document.getElementById("gal").innerHTML = ""
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
  document.getElementById("gal").insertAdjacentHTML("beforeend",`<h2>${input}</h2>`)
  data.meals.forEach(dish => {document.getElementById("gal").insertAdjacentHTML("beforeend",`<p>${dish.strMeal}</p><img class="${input}" id="${dish.idMeal}"src="${dish.strMealThumb}">`)})
  document.querySelectorAll(`.${input}`).forEach(img => {
    img.addEventListener("click", (event) => {getInfo(img.id)});
  })
}


async function getInfo(id){
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  const data = await response.json(); 
  console.log(id)
  document.getElementById("info").innerHTML = ""
  console.log(document.getElementById("info").innerHTML)
  console.log(data.meals[0].strInstructions)
  document.getElementById("info").insertAdjacentHTML("beforebegin",data.meals[0].strInstructions)
}
mainCall()