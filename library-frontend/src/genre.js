class Genre {

  static genreForm = document.getElementById("form-container")
  static genres = []

  constructor(id, name) {
    this.id = id
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
    const genre = new Genre(obj.id, obj.name)
    genre.renderGenre()
  }

  static createForm() {
    console.log(this.genreForm)
  }

  renderGenre() {
    const genreList = document.getElementById("genre-list")

    const delBttn = document.createElement("button")
    delBttn.innerText = "Delete"
    delBttn.className = "delete"
    delBttn.dataset.id = this.id

    const li = document.createElement("li")
    li.innerText = this.name
    li.appendChild(delBttn)

    delBttn.addEventListener("click", this.deleteGenre)

    genreList.appendChild(li)
  }

  deleteGenre() {
    event.preventDefault()
    const id = this.dataset.id

    fetch(`${url}/genres/${id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      }
  })

  console.log(this.parentElement)
  this.parentElement.remove()
}
    

}