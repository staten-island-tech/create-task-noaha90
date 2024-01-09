import './style.css'

async function APICall(){
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  const data = await response.json(); 
  console.log(data)
  data.categories.forEach(catergory => {
    console.log(catergory.strCategory)
    console.log(document.getElementById("categories"))
    document.getElementById("categories").insertAdjacentHTML("afterbegin",`
    <input type="checkbox"  name="${catergory.strCategory}" value="="${catergory.strCategory}">
    <label for="${catergory.strCategory}">${catergory.strCategory}</label><br>`
    )});
}

APICall()

document.getElementById("call").addEventListener("click", (event) => {
  event.preventDefault()
  console.log("ea")
});

