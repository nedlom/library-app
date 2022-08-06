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

  static renderGenres() {
    this.all.forEach(genre => genre.renderGenre())
  }

  renderGenre() {
    const genreContainer = document.getElementById("genre-container")
    const genreDiv = document.createElement("div")
    genreDiv.className = "genre-div"
    genreDiv.id = this.id
    genreDiv.innerHTML = this.genreElements()
    genreContainer.append(genreDiv)
    this.bookCards()
    this.eventListeners()
  }

  genreElements() {
    return `
      <div class='header'>
        <div class='header-div'>${this.name}</div>
        <div class='header-div'>
          <button class='show-form'>+</button>
        </div>
      </div>

      <div class='block'>
        <div class='form-container-outer no-display'>
          <div class='form-container-inner'>
            <form>
              <input class='book-field' placeholder='Title'><br>
              <input class='book-field' placeholder='Author'><br>
              <textarea class='book-field' placeholder='Description'></textarea><br>
              <input class='book-field' type='submit' value='Add Book'>
            </form> 
          </div>
        </div>
      </div>

      <div class='block'>
        <div class='books'>
        </div>
      </div>

      <div class='footer'>
        <button><i class='fa fa-trash'></i></button>
      </div>
    `
  }

  bookCards() {
    if (this.hasBooks()) {
      this.books().forEach(book => this.booksDiv().innerHTML += book.bookCard())
    } else {
      this.booksDiv().innerHTML = this.noBooks()
    }
  }

  hasBooks() {
    return this.books().length !== 0
  }

  booksDiv() {
    return this.div().querySelector(".books")
  }

  noBooks() {
    return `<div class='card'>${this.name} Genre Empty</di>`
  }

  books() {
    return Book.all.filter(book => book.genre_id === this.id)
  }

  eventListeners() {
    this.showFormBttn().addEventListener("click", this.bookFormDisplay.bind(this))
    this.bookForm().addEventListener("submit", BookAdapter.newBook.bind(this))
    this.deleteBookListener()
    this.genreDelBttn().addEventListener("click", GenreAdapter.delete.bind(this))
  }

  div() {
    return document.getElementById(this.id)
  }

  showFormBttn() {
    return this.div().querySelector(`.show-form`)
  }

  bookFormDisplay() {    
    this.formContainer().classList.toggle("no-display")
  }
  
  formContainer() {
    return this.div().querySelector(".form-container-outer")
  }

  bookForm() {
    return this.div().querySelector('form')
  }

  bookDelBtns() {
    return this.booksDiv().querySelectorAll("button")
  }

  deleteBookListener() {
    this.bookDelBtns().forEach(button => {
      button.addEventListener("click", BookAdapter.deleteBook)
    })
  }

  genreDelBttn() {
    return this.div().querySelector(".footer button")
  }
}