// GLOBAL CONSTANTS

const MY_API_KEY = 'RNtYFS9Q4vYDV1E5LLJsw58nQdlOZReC';
const LIMIT = 9; 
const RATING = 'g';

let form = document.querySelector("form")
let photoArea = document.querySelector("#photo-area")

let userInput = document.querySelector("#searchtext")

let showMoreBtn = document.querySelector("#showmore")


let pageNum = 0
let offset = 0
let searchKey = ""
let backupSearchKey = ""
let loadMore = false

form.addEventListener("submit", (event) => {
    event.preventDefault()
    handleFormSubmission()
})

showMoreBtn.addEventListener("click", showMore)

async function getResults(evt) {

    if (loadMore) {
        searchKey = backupSearchKey
    } else {
        searchKey = userInput.value
    }

    let url = `http://api.giphy.com/v1/gifs/search?api_key=${MY_API_KEY}&q=${searchKey}&limit=${LIMIT}&rating=${RATING}&offset=${offset}`
    let response = await fetch(url)
    let responseData = await response.json()

    displayResults(responseData)

    if (showMoreBtn.classList.contains('hidden')) {
        showMoreBtn.classList.remove('hidden')
    }

  }

function displayResults(photoData) {

    data = photoData

    data.data.forEach(photo => {
        photoArea.innerHTML += `<img src=${photo.images.original.url} width="250" height="250">`
    });

    backupSearchKey = searchKey
    userInput.value = ""

    pageNum = pageNum + 1
  }

function showMore() {
    offset = pageNum * LIMIT
    loadMore = true
    getResults()
}

function handleFormSubmission(evt) {
    pageNum = 0
    photoArea.innerHTML = ``
    loadMore = false
    showMoreBtn.classList.add('hidden')
    getResults(evt);
  }