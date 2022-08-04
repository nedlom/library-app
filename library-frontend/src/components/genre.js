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

  static findById(id) {
    return this.all.find(x => x.id === parseInt(id))
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
      this.genreHeader(), 
      // this.bookFormDiv(),
      this.bookFormDivContainer(),
      this.genreBooksContainer(),
      this.deleteGenreBttnDiv()
      )
    
    return div
  }

  genreHeader() {
    const genreHeader = document.createElement("div")
    genreHeader.className = "genre-header"

    genreHeader.append(this.genreName(), this.bookButtonContainer())
    return genreHeader
  }

  genreName() {
    const genreNameDiv = document.createElement("div")
    // genreNameDiv.className = "genre-header-div-1"

    genreNameDiv.className = "genre-header-div first"

    genreNameDiv.innerHTML = this.name

    // const genName = document.createElement("h3")
    // genName.innerHTML = this.name
    // genreNameDiv.append(genName)

    return genreNameDiv
  }

  bookButtonContainer() {
    const genreAddBookBttnDiv = document.createElement("div")
    // genreAddBookBttnDiv.className = "genre-header-div-2"

    genreAddBookBttnDiv.className = "genre-header-div second"

    genreAddBookBttnDiv.append(this.bookButton())
    return genreAddBookBttnDiv
  }

  bookButton() {
    const bookButton = document.createElement("button")
    // bookButton.innerHTML = `Add Book To ${this.name}`
    bookButton.innerHTML = "+"
    bookButton.addEventListener("click", this.bookFormDisplay.bind(this))
    return bookButton
  }

  bookFormDisplay() {
    // const bookForm = document.querySelector(`[data-id="${this.id}"]`)
    const bookForm = document.getElementById(`book-form-div-container-${this.id}`)
    if (bookForm.className === "no-display") {
      // bookForm.className = "book-form-div"
      bookForm.className = "book-form-div-container"
    } else {
      bookForm.className = "no-display"
    }
  }

  bookFormDivContainer() {
    const bookFormDivContainer = document.createElement("div")
    bookFormDivContainer.id = `book-form-div-container-${this.id}`
    bookFormDivContainer.className = "no-display"
    // bookFormDivContainer.dataset.id = this.id
    // bookFormDivContainer.id = `form-${this.id}`
    // debugger
    bookFormDivContainer.append(this.bookFormDiv())
    return bookFormDivContainer
  }

  bookFormDiv() {
    const bookFormDiv = document.createElement("div")
    bookFormDiv.className = "book-form-div"
    bookFormDiv.dataset.id = this.id
    // bookFormDiv.dataset.id = this.id
    bookFormDiv.append(this.bookForm())
    return bookFormDiv
  }

  bookForm() {
    return Book.createBookForm(this.id)
  }


  // bookFormDiv() {
  //   const bookFormDiv = document.createElement("div")
  //   bookFormDiv.className = "no-display"
  //   bookFormDiv.dataset.id = this.id
  //   bookFormDiv.append(this.bookForm())
  //   return bookFormDiv
  // }

  genreBooksContainer() {
    const bookDivContainer = document.createElement("div")
    bookDivContainer.className = "books"
    // const bookDivs = this.bookDivs()

    // debugger
    
    if (this.hasBooks()) {
      const bookDivs = this.bookDivs()
      bookDivs.forEach(book => bookDivContainer.append(book))
    } else {
      const noBooks = document.createElement("div")
      noBooks.className = "book-div no-books"
      noBooks.innerHTML = `${this.name} genre empty.`
      bookDivContainer.append(noBooks)
    }

    return bookDivContainer
  }

  hasBooks () {
    return this.books.length !== 0
  }

  bookDivs() {
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
    deleteButton.innerHTML = "<i class='fa fa-trash'></i>"
    deleteButton.addEventListener("click", GenreAdapter.deleteGenre.bind(this))
    return deleteButton
  }
}