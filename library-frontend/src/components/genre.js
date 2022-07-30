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

  static getBooks() {
    this.genres
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
    const div = document.createElement("div")
    div.id = "li-title"
    div.innerText = this.name
    li.appendChild(div)
    // li.innerText = this.name

    const bookDiv = document.createElement("div")
    bookDiv.innerText = "BOOK DIV"
    bookDiv.id = "myDiv"
    bookDiv.style.display = "none"

    const bookBttn = document.createElement("button")
    bookBttn.innerText = "Add Book"
    bookBttn.addEventListener("click", this.myFunction)
    // const bookForm = Book.renderBookForm()
    li.appendChild(bookBttn)
    li.appendChild(bookDiv)

    if (this.books !== []) {
      this.books.forEach(obj => {
        const book = new Book(obj.id, obj.title, obj.author, obj.description)
        const bookDiv = book.createBookDiv()
        li.appendChild(bookDiv)
      })
    }

    li.appendChild(delBttn)

    delBttn.addEventListener("click", this.deleteGenre)

    genreList.appendChild(li)
  }

  myFunction() {

    const myDiv = document.getElementById("myDiv")

    // debugger
    if (myDiv.style.display === "none") {
      myDiv.style.display = "block";
    } else {
      myDiv.style.display = "none";
    }

    myDiv.innerHTML = `<div id="book-form-container">
    <form id="book-form">
      <label>Title</label><br>
      <input type="text" id="title"><br>
      <label>Author</label><br>
      <input type="text" id="author"><br>
      <label>Description</label><br>
      <textarea type="text" id="description"></textarea><br>
      <input type="submit" value="Add Book">
    </form>
  </div>`

  debugger
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
      const genre = new Genre(json.id, json.name, json.books)
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
    .catch(() => console.log("error"))
    this.parentElement.remove()
  }  
    
}