class Genre {

  static all = []

  constructor(id, name, books) {
    this.id = id
    this.name = name
    this.books = this.getBooks(books)
    Genre.all.push(this)
  }

  static getForm() {
    const genreForm = document.getElementById("genre-form")
    genreForm.addEventListener("submit", GenreAdapter.newGenre)
  }

  getBooks(books) {
    if (books) {
      return books.map(book => new Book(
        book.id, 
        book.title, 
        book.author, 
        book.description, 
        book.genre_id
      ))
    } else {
        return []
    }
  }

  static renderGenres() {
    this.all.forEach(genre => genre.renderGenre())
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
    
    div.append(
      this.genreDivHeader(), 
      this.bookFormDiv(),
      this.genresBookDivs(),
      this.deleteGenreBttnDiv()
      )
    
    return div
  }

  genreDivHeader() {
    const genreHeader = document.createElement("div")
    genreHeader.className = "genre-header"

    genreHeader.append(this.genreName(), this.bookButtonContainer())
    return genreHeader
  }

  genreName() {
    const genreNameDiv = document.createElement("div")
    genreNameDiv.className = "genre-header-div-1"
    genreNameDiv.innerHTML = this.name
    return genreNameDiv
  }

  bookButtonContainer() {
    const genreAddBookBttnDiv = document.createElement("div")
    genreAddBookBttnDiv.className = "genre-header-div-2"
    genreAddBookBttnDiv.append(this.bookButton())
    return genreAddBookBttnDiv
  }

  bookButton() {
    const bookButton = document.createElement("button")
    bookButton.innerHTML = `Add Book To ${this.name}`
    bookButton.addEventListener("click", this.bookFormDisplay.bind(this))
    return bookButton
  }

  bookFormDisplay() {
    if (confirm("Press a button!")){
    const bookForm = document.querySelector(`[data-id="${this.id}"]`)
    if (bookForm.className === "no-display") {
      bookForm.className = "book-form-div"
    } else {
      bookForm.className = "no-display"
    }
  }
  }

  bookFormDiv() {
    const bookFormDiv = document.createElement("div")
    bookFormDiv.className = "no-display"
    bookFormDiv.dataset.id = this.id
    bookFormDiv.append(this.bookForm())
    return bookFormDiv
  }

  bookForm() {
    return Book.createBookForm(this.id)
  }

  genresBookDivs() {
    const bookDivContainer = document.createElement("div")
    bookDivContainer.className = "books"
    const bookDivs = this.bookTags()
    bookDivs.forEach(book => bookDivContainer.append(book))
    return bookDivContainer
  }

  bookTags() {
    return this.books.map(book => book.createBookDiv())
  }

  deleteGenreBttnDiv() {
    const delButtonContainer = document.createElement("div")
    delButtonContainer.className = "delete-genre"
    delButtonContainer.append(this.deleteButton())
    return delButtonContainer
  }

  deleteButton() {
    const deleteButton = document.createElement("button")
    deleteButton.innerHTML = `Delete ${this.name} Genre`
    deleteButton.addEventListener("click", GenreAdapter.deleteGenre.bind(this))
    return deleteButton
  }
}