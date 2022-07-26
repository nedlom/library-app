class Genre {

  static genres = []

  constructor(name) {
    this.name = name
    Genre.genres.push(this)
  }

  static getGenres() {
    fetch(`${url}/genres`)
    .then(resp => resp.json())
    .then(json => {
      json.forEach(obj => this.createGenre(obj))
    })
  }

  static createGenre(obj) {
    const genre = new Genre(obj.name)
    console.log(genre)
    genre.renderGenre()
  }

  renderGenre() {
    const genreList = document.getElementById("genre-list")
    const li = document.createElement("li")
    li.innerText = this.name
    genreList.appendChild(li)
  }

}