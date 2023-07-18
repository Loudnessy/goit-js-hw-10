import axios from "axios";
import {fetchBreeds, fetchCatByBreed} from './cat-api'
const select = document.querySelector(".breed-select")
const div = document.querySelector(".cat-info")
const paragraphLoading = document.querySelector(".loader")
const paragraphError = document.querySelector(".error")
fetchBreeds()
.then(data => {
    // console.log(data);
    select.innerHTML = data.map(elem => `<option value="${elem.id}">${elem.name}</option>`).join("");
})
.catch(() => {
    paragraphError.removeAttribute('hidden')    
    select.setAttribute("hidden", true)
    div.setAttribute("hidden", true)
   }
  )
.finally(() => paragraphLoading.setAttribute("hidden", true))

select.addEventListener("change", onChange)





function onChange (evt) {
            paragraphLoading.removeAttribute("hidden")
    fetchCatByBreed(evt.target.value)
    .then(data => {
        if (data.length === 0) {
        throw new Error(resp.statusText)
        }
        const img = data.map(elem => 
    `<img src="${elem.url}" alt="cat" width="400" height="400">`
).join("")
div.innerHTML = img
data.map(elem => {
    elem.breeds.forEach(cat => {
  const array = [cat]
        const findCatById = array.find(option => option.id === `${evt.target.value}`)
        const markup = `<div class="flex">
        <h2>${findCatById.name}</h2>
        <p>${findCatById.description}</p>
        <h2>Temperament</h2>
        <p>${findCatById.temperament}</p>
        </div>` 
            div.insertAdjacentHTML("beforeend", markup) 
    });
})
    })
    .catch(() => {
     paragraphError.removeAttribute('hidden')    
     select.setAttribute("hidden", true) 
div.style.display = 'none'
    }
   )
    .finally(() => paragraphLoading.setAttribute("hidden", true))
}

