class Genre {

  static all = []

  constructor(id, name, books) {
    this.id = id
    this.name = name
    Genre.all.push(this)
  }

  static getForm() {
    const genreForm = document.getElementById("genre-form")
    genreForm.addEventListener("submit", GenreAdapter.newGenre)
  }

  static findById(id) {
    return this.all.find(x => x.id === parseInt(id))
  }

  static renderGenres() {
    this.all.forEach(genre => genre.renderGenre())
  }

  books() {
    return Book.all.filter(book => book.genre_id === this.id)
  }

  renderGenre() {
    const genreContainer = document.getElementById("genre-container")
    const genreDiv = this.createGenreDiv()
    genreContainer.append(genreDiv)
  }

  createGenreDiv() {
    const div = document.createElement("div")
    div.className = "genre-div"
    div.id = this.id
    
    this.appendChildren(div)
    
    return div
  }

  appendChildren(parent) {
    parent.append(
      this.genreHeader(), 
      this.bookFormDivContainer(),
      this.genreBooksContainer(),
      this.deleteGenreBttnDiv()
      )
  }

  genreHeader() {
    const genreHeader = document.createElement("div")
    genreHeader.className = "genre-header"

    genreHeader.append(this.genreName(), this.bookButtonContainer())
    return genreHeader
  }

  genreName() {
    const genreNameDiv = document.createElement("div")
    genreNameDiv.className = "genre-header-div first"
    genreNameDiv.innerHTML = this.name
    return genreNameDiv
  }

  bookButtonContainer() {
    const genreAddBookBttnDiv = document.createElement("div")
    genreAddBookBttnDiv.className = "genre-header-div second"
    genreAddBookBttnDiv.append(this.bookButton())
    return genreAddBookBttnDiv
  }

  bookButton() {
    const bookButton = document.createElement("button")
    bookButton.innerHTML = "+"
    bookButton.addEventListener("click", this.bookFormDisplay.bind(this))
    return bookButton
  }

  bookFormDisplay() {
    const bookForm = document.getElementById(`book-form-div-container-${this.id}`)
    if (bookForm.className === "no-display") {
      bookForm.className = "book-form-div-container"
    } else {
      bookForm.className = "no-display"
    }
  }

  bookFormDivContainer() {
    const bookFormDivContainer = document.createElement("div")
    bookFormDivContainer.id = `book-form-div-container-${this.id}`
    bookFormDivContainer.className = "no-display"
    bookFormDivContainer.append(this.bookFormDiv())
    return bookFormDivContainer
  }

  bookFormDiv() {
    const bookFormDiv = document.createElement("div")
    bookFormDiv.className = "book-form-div"
    bookFormDiv.dataset.id = this.id
    bookFormDiv.append(this.bookForm())
    // bookFormDiv.innerHTML = this.bookForm()
    return bookFormDiv
  }

  bookForm() {
    // return Book.createBookForm.call(this)
    return Book.createBookForm()
    // debugger
    // const x = `<form><input type='text' value='hi'></form>`
    // return x
  }

  genreBooksContainer() {
    const bookDivContainer = document.createElement("div")
    bookDivContainer.className = "books"
    if (this.checkForBooks()) {
      this.genreHasBooks(bookDivContainer)
    } else {
      this.genreHasNoBooks(bookDivContainer)
    }
    return bookDivContainer
  }

  checkForBooks() {
    return this.books().length !== 0
  }

  genreHasBooks(container) {
    this.books().forEach(book => {
      const bookDiv = book.createBookDiv()
      container.append(bookDiv)
    })
  }

  genreHasNoBooks(container) {
    const noBooks = document.createElement("div")
    noBooks.className = "book-div no-books"
    noBooks.innerHTML = `${this.name} genre empty.`
    container.append(noBooks)
  }

  deleteGenreBttnDiv() {
    const delButtonContainer = document.createElement("div")
    delButtonContainer.className = "delete-genre"
    delButtonContainer.append(this.deleteButton())
    return delButtonContainer
  }

  deleteButton() {
    const deleteButton = document.createElement("button")
    deleteButton.innerHTML = "<i class='fa fa-trash'></i>"
    deleteButton.addEventListener("click", GenreAdapter.deleteGenre.bind(this))
    return deleteButton
  }
}