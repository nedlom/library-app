class Genre {

  static genres = []

  constructor(id, name, books) {
    this.id = id
    this.name = name
    this.books = books
    Genre.genres.push(this)
  }

  static getGenres() {
    fetch(`${url}/genres`)
    .then(resp => resp.json())
    .then(json => {
      json.forEach(obj => {
        const genre = new Genre(obj.id, obj.name, obj.books)
      })
      this.renderGenres()  
    })
  }

  static renderGenres() {
    this.genres.forEach(genre => genre.renderGenre())
  }

  renderGenre() {
    const genreList = document.getElementById("genre-list")

    const delBttn = document.createElement("button")
    delBttn.innerText = "pretend this is a trashcan"
    delBttn.className = "delete"
    delBttn.dataset.id = this.id

    const li = document.createElement("li")
    li.innerText = this.name

    // if (this.books !== []) {
    //   let x = this.books[0].description
    //   let p = document.createElement("p")
    //   p.innerText = x
    //   li.append(p)
    //   // debugger
    // }

    li.appendChild(delBttn)

    delBttn.addEventListener("click", this.deleteGenre)

    genreList.appendChild(li)
  }

  static newGenre() {
    event.preventDefault()
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
     
    })
    this.reset()
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
    this.parentElement.remove()
  }  
    
}