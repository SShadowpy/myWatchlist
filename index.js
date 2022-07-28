const form = document.querySelector('form')
const searchInput = document.getElementById('input-search')
const searchButton = document.getElementById('input-button')
const content = document.querySelector('.content')
let alreadyAdded = false
let idArray = []
let htmlArray = []
let postId = 0
let html = ""
let deleteBtnHtml = ""

function resetValues() {
    idArray = []
    htmlArray = []
    postId = 0
    html = ""
    deleteBtnHtml = ""
    content.innerHTML = ""
}

function disableButton(id) {
    document.getElementById(id).disabled = true
    document.getElementById(id).style.transform = "none"
    document.getElementById(id).style.cursor = "default"
    alreadyAdded = false
}

function searchMovie(e) {
    e.preventDefault()
    resetValues()
    fetch(`https://www.omdbapi.com/?apikey=b7b31b26&s=${searchInput.value}&type=movie`)
        .then(res => res.json())
        .then(data => {
            if (data.Response == 'True') {
                for (let i = 0; i < 3 && i < data.Search.length; i++) {
                    getMovieById(data.Search[i].imdbID)
                }  
                html = ""
            }
            else {
                html = `<div class="empty-list">
                            <h2>Unable to find what you’re looking for. Please try another search.</h2>
                        </div>`
                content.innerHTML = html
                html=""
            }
        })
}
function getMovieById(id) {
    fetch(`https://www.omdbapi.com/?apikey=b7b31b26&i=${id}`)
        .then(res => res.json())
        .then(data => {
            postId = data.imdbID
            console.log(postId)
            html = `<section class="movie-container">
                        <img src="${data.Poster}" class="poster">
                        <div class="movie-data">
                            <p class="title">${data.Title} <span class="rating"> <img src="images/star.png">${data.imdbRating}</span></p>
                            <div class="additional-data">
                                <p class="duration">${data.Runtime}</p>
                                <p class="genre">${data.Genre}</p>
                                <button class="addBtn" id="${postId}"><img src="images/add-movie.png">Watchlist</button>
                            </div>
                            <p class="description">${data.Plot}</p>    
                        </div>           
                    </section>`
            
            deleteBtnHtml = `<section class="movie-container">
                                <img src="${data.Poster}" class="poster">
                                <div class="movie-data">
                                    <p class="title">${data.Title} <span class="rating"> <img src="images/star.png">${data.imdbRating}</span></p>
                                    <div class="additional-data">
                                        <p class="duration">${data.Runtime}</p>
                                        <p class="genre">${data.Genre}</p>
                                        <button class="addBtn" id="${postId}"><img src="images/remove-movie.png">Remove</button>
                                    </div>
                                    <p class="description">${data.Plot}</p>    
                                </div>           
                            </section>`
            idArray.push(postId)
            htmlArray.push(deleteBtnHtml)
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) == postId) {
                    alreadyAdded = true
                    idArray.pop()
                    htmlArray.pop()
                }
            }
            content.innerHTML += html
            if (alreadyAdded)
                disableButton(postId)
            for (let i = 0; i < idArray.length ; i++) {
                document.getElementById(idArray[i]).addEventListener('click', e => {
                    localStorage.setItem(idArray[i], htmlArray[i])
                    disableButton(e.target.id)
                })
            }
        })
    
}

function removeMovie(id) {
    document.getElementById(id).remove()
}


form.addEventListener('submit', searchMovie)