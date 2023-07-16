import axios from "axios";
import {fetchBreeds, fetchCatByBreed} from './cat-api'
const select = document.querySelector(".breed-select")
const div = document.querySelector(".cat-info")
const paragraphLoading = document.querySelector(".loader")
const paragraphError = document.querySelector(".error")
fetchBreeds()
.then(resp => {
    if(!resp.ok){
        throw new Error(resp.statusText)
    }
    return resp.json()
})
.then(data => {
    // console.log(data);
    select.innerHTML = data.map(elem => `<option value="${elem.id}">${elem.name}</option>`).join("");
})
.catch(() => paragraphError.removeAttribute('hidden'))
.finally(() => paragraphLoading.setAttribute("hidden", true))

select.addEventListener("change", onChange)
function onChange (evt) {
    fetchCatByBreed(evt.target.value)
    .then(resp => {
        if(!resp.ok){
            throw new Error(resp.statusText)
        }
        paragraphLoading.removeAttribute('hidden')
        return resp.json()
    })
    .then(data => {
        const img = data.map(elem => 
    `<img src="${elem.url}" alt="cat" width="400" height="400">`
).join("")
div.innerHTML = img
    })
    .catch(() => paragraphError.removeAttribute('hidden'))
    fetchBreeds()
    .then(resp => {
        if(!resp.ok){
            throw new Error(resp.statusText)
        }
        return resp.json()
    })
    .then(data => {
  
        const findCatById = data.find(option => option.id === `${evt.target.value}`)
const markup = `<div class="flex">
<h2>${findCatById.name}</h2>
<p>${findCatById.description}</p>
<h2>Temperament</h2>
<p>${findCatById.temperament}</p>
</div>` 


    div.insertAdjacentHTML("beforeend", markup) 
    })
    .catch(() => paragraphError.removeAttribute('hidden'))
    .finally(() => paragraphLoading.setAttribute("hidden", true))
}

