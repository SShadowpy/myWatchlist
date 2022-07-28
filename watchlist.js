const content = document.querySelector('.content')
let length = localStorage.length
function emptyList() {
    content.innerHTML = `<div class="empty-list">
                        <h2>Your watchlist is looking a little empty...</h2>
                        <div class="addmovies">
                            <a href="index.html"><img src="images/add-movie.png"></a>
                            <a href="index.html">Let's add some movies!</a>
                        </div>
                    </div>`
}

function showMovies() {
    content.innerHTML = ""
    for (let i = 0; i < localStorage.length; i++) {
        content.innerHTML += localStorage.getItem(localStorage.key(i))
    }
}

function deleteMovie() {
    for (let i = 0; i < localStorage.length; i++) {
        document.getElementById(localStorage.key(i)).addEventListener('click', (e) => {
            console.log('pressed')
            console.log(e.target.id)
            localStorage.removeItem(e.target.id)
            if (localStorage.length > 0) {
                showMovies()
                deleteMovie()
            }
            else
                emptyList()
        })
    }
}
emptyList()

if (length > 0) {
    showMovies()
}

deleteMovie()



