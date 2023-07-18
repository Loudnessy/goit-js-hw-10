const options = {
    headers: {
        'x-api-key': 'live_XXlm7tWMwAcyP2o8jsdCaP8wnMrZ1UkTXmAUkCQOdXQ1drSXjtVI1dsCAB2Rgi9N' 
    }

}
export const fetchBreeds = function () {
    return fetch("https://api.thecatapi.com/v1/breeds", options)
    .then(resp => {
        if(!resp.ok){
            throw new Error(resp.statusText)
        }
        return resp.json()
    })
}
export const fetchCatByBreed = function (breedId) {
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, options)
    .then(resp => {
        if(!resp.ok){
            throw new Error(resp.statusText)
        }
        return resp.json()
    })
}



