class Genre {

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
    const genreForm = document.getElementById("form-container")

    const form = document.createElement('form')
    form.id = "genre-form"

    const input = document.createElement('input')
    input.type = "text"
    input.id = "genre-name"

    const submit = document.createElement('input')
    submit.type = "submit"
    submit.id = "submit"
    submit.value = "Create Genre"

    form.appendChild(input)
    form.appendChild(submit)
    genreForm.appendChild(form)

    form.addEventListener("submit", this.newGenre)
  }

  static newGenre() {
  
    event.preventDefault()
    // console.log(this)

    fetch(`${url}/genres`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: document.getElementById('genre-name').value
      })
    })
    .then(resp => resp.json())
    .then(json => {
      const genre = new Genre(json.id, json.name)
      genre.renderGenre()
      // console.log(this)
    })

    // this.reset()
  }

  renderGenre() {
    const genreList = document.getElementById("genre-list")

    const delBttn = document.createElement("button")
    delBttn.innerText = "pretend this is a trashcan"
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