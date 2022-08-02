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

    div.append(this.nameAndDeleteDiv(), this.bookBtnAndFormDiv())

    const bookDivs = this.bookTags()
    bookDivs.forEach(book => div.append(book))
    
    return div
  }

  nameAndDeleteDiv() {
    const div = document.createElement("div")
    div.className = "parent"
    div.append(this.nameDiv(), this.deleteDiv())
    return div
  }

  nameDiv() {
    const div = document.createElement("div")
    div.className = "child"
    div.innerHTML = this.name
    return div
  }

  deleteDiv() {
    const button = document.createElement("button")
    button.className = "child-right"
    button.innerHTML = `Delete ${this.name}`
    button.addEventListener("click", GenreAdapter.deleteGenre.bind(this))
    return button
  }

  bookBtnAndFormDiv() {
    const buttonFormDiv = document.createElement("div")
    buttonFormDiv.className = "book-button-form"
    
    buttonFormDiv.append(this.bookButton(), this.bookForm())
    return buttonFormDiv
  }

  bookButton() {
    const button = document.createElement("button")
    button.id = `button${this.id}`
    button.innerHTML = `Add Book To ${this.name}` 
    button.addEventListener("click", this.hideBookBtdDisplayForm)
    return button
  }

  bookForm() {
    return Book.createBookForm(this.id)
  }

  hideBookBtdDisplayForm() {
    this.parentElement.children[0].className = "no-display"
    this.parentElement.children[1].className = ""
  }

  bookTags() {
    return this.books.map(book => book.createBookDiv())
  }
}