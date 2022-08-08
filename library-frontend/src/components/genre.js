class Genre {

  static all = []

  constructor(id, name, books) {
    this.id = id
    this.name = name
    Genre.all.push(this)
  }

  static noGenres() {
    return Genre.all.length === 0
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
          <button class='window-1'><i class="fa fa-window-close"></i></button>
          <button class='window-2'><i class="fa fa-window-maximize"></i></button>
          <button class='window-3'><i class="fa fa-window-minimize"></i></button>
        </div>
      </div>

      <div class='block'>
        <div class='add-book'>
          <button class='add-book-button'>Add Book To ${this.name}</button>
        </div>
        <div class='form-container-outer no-display'>
          <div class='form-container-inner'>
            <form>
              <input class='book-field' placeholder='Title'><br>
              <input class='book-field' placeholder='Author'><br>
              <textarea class='book-field' placeholder='Description'></textarea><br>
              
              <button type="submit"><i class="fa fa-solid fa-plus"></i></button>
            </form> 
          </div>
        </div>
      </div>

      <div class='block'>
        <div class='books'>
        </div>
      </div>
    `
  }

  // ---------
  div() {
    return document.getElementById(this.id)
  }
  minBtn() {
    return this.div().querySelector(".window-3")
  }
  maxBtn() {
    return this.div().querySelector(".window-2")
  }
  closeBtn() {
    return this.div().querySelector(".window-1")
  }
  blocks() {
    return this.div().querySelectorAll(".block")
  }
  formOuterContainer() {
    return this.div().querySelector('.form-container-outer')
  }
  addBookDiv() {
    return this.div().querySelector(".add-book")
  }
  addBookBtn() {
    return this.addBookDiv().querySelector("button")
  }
  bookForm() {
    return this.div().querySelector('form')
  }

  // -------

  minimize() {
    this.blocks().forEach(block => block.classList.add("no-display"))
  }
  maximize() {
    this.blocks().forEach(block => block.classList.remove("no-display"))
  }
  toggleForm() {
    this.formOuterContainer().classList.toggle("no-display")
  }
  // -------------
  eventListeners() {
    this.minBtn().addEventListener("click", this.minimize.bind(this))
    this.maxBtn().addEventListener("click", this.maximize.bind(this))
    this.closeBtn().addEventListener("click", GenreAdapter.delete.bind(this))
    this.addBookBtn().addEventListener("click", this.toggleForm.bind(this))
    this.bookForm().addEventListener("submit", BookAdapter.newBook.bind(this))
    this.bookDelBtnListeners()
  }
  
  bookCards() {
    if (this.hasBooks()) {
      this.books().forEach(book => this.bookDiv().innerHTML += book.bookCard())
    } else {
      this.bookDiv().innerHTML = this.noBooks()
    }
  }

  hasBooks() {
    return this.books().length !== 0
  }

  bookDiv() {
    return this.div().querySelector(".books")
  }

  noBooks() {
    return `<div class='card'>${this.name} Genre Empty</di>`
  }

  books() {
    return Book.all.filter(book => book.genre_id === this.id)
  }
  
  bookDelBtns() {
    return this.bookDiv().querySelectorAll("button")
  }

  bookDelBtnListeners() {
    this.bookDelBtns().forEach(button => {
      button.addEventListener("click", BookAdapter.deleteBook)
    })
  }
}