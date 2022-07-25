const url = "http://127.0.0.1:3000"

function getGenres() {
  fetch(`${url}/genres`)
  .then(resp => resp.json())
  .then(json => {
    json.forEach(obj => {
      new Genre(obj.name)
    })
    renderGenres()
    console.log(Genre.genres)
  })
}

function renderGenres() {
  const genreContainer = document.getElementById("genre-container")
  const ul = document.createElement("ul")
  genreContainer.appendChild(ul)
  // document.appendChild(ul)
  Genre.genres.forEach(genre => {
    const li = document.createElement("li")
    li.innerText = genre.name
    ul.appendChild(li)
  })
}

class Genre {

  static genres = []

  constructor(name) {
    this.name = name
    Genre.genres.push(this)
  }
}



getGenres()