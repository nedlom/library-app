class Genre {

  static all = []

  constructor(id, name) {
    this.id = id
    this.name = name
    Genre.all.push(this)
  }

  static findById(id) {
    return Genre.all.find(genre => genre.id === id)
  }

  static find(genre) {
    return Book.all.find(g => g === genre)
  }

  static delete(genre) {
    Genre.all.splice(Genre.all.indexOf(genre), 1)
  }

  static noGenres() {
    if (Genre.all.length === 0) {
      document.querySelector(".empty").classList.remove("no-display")
    } else {
      document.querySelector(".empty").classList.add("no-display")
    }
  }
  
  static renderGenres() {
    this.all.forEach(genre => genre.renderGenre())
  }

  div() {
    return document.getElementById(this.id)
  }

  removeFromDom() {
    this.div().remove()
  }

  books() {
    return Book.all.filter(book => book.genre_id === this.id)
  }

  renderGenre() {
    const genreContainer = document.getElementById("genre-container")
    const genreDiv = this.buildGenreDiv()
    
    if (this.books().length !== 0) {
      genreDiv.querySelector(".empty").classList.add("no-display")
    }
    
    genreContainer.append(genreDiv)
  }

  buildGenreDiv() {
    const genreDiv = document.createElement("div")
    genreDiv.className = "genre-div"
    genreDiv.id = this.id

    genreDiv.innerHTML = `
      <div class='header'>
        <div class='header-div'>${this.name}</div>
        <div class='header-div'>
          <button class='close' id='del-${this.id}'><i class="fa fa-window-close"></i></button>
          <button class='max'><i class="fa fa-window-maximize"></i></button>
          <button class='min'><i class="fa fa-window-minimize"></i></button>
        </div>
      </div>

      <div class='block'>
        <div class='add-book'>
          <button class='add-book-button'>Add Book To ${this.name}</button>
        </div>
        <div class='form-container-outer no-display'>
          <div class='form-container-inner'>
            <form class='add-book-form' id='form-genre-${this.id}'>
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
          <div class='card empty'>
            ${this.name} Genre Empty
          </div>
        </div>
      </div>
    `
    this.eventListeners(genreDiv)
    this.bookCards(genreDiv)
    return genreDiv
  }

  toggleEmptyBookCard() {
    const emptyBookCard = this.div().querySelector(".empty")
    
    if (this.books().length !== 0) {
      emptyBookCard.classList.add("no-display")
    } else {
      emptyBookCard.classList.remove("no-display")
    }
  }

  eventListeners(genreDiv) {
    const minBtn = genreDiv.querySelector(".min")
    minBtn.addEventListener("click", this.minMax.bind(this))

    const maxBtn = genreDiv.querySelector(".max")
    maxBtn.addEventListener("click", this.minMax.bind(this))

    const closeBtn = genreDiv.querySelector(".close")
    closeBtn.addEventListener("click", GenreAdapter.delete)

    const addBookBtn = genreDiv.querySelector(".add-book-button")
    addBookBtn.addEventListener("click", this.toggleForm.bind(this))

    const addBookForm = genreDiv.querySelector(".add-book-form")
    addBookForm.addEventListener("submit", BookAdapter.newBook)
  }

  minMax() {
    const blocks = this.div().querySelectorAll(".block")
    blocks.forEach(block => {
      if (event.currentTarget.className === "min") {
        block.classList.add("no-display")
      } else if (event.currentTarget.className === "max") {
        block.classList.remove("no-display")
      } 
    })
  }

  toggleForm() {
    const formCont = this.div().querySelector('.form-container-outer')
    formCont.classList.toggle("no-display")
  }

  bookDiv() {
    return this.div().querySelector(".books")
  }

  bookCardsDiv() {
    return this.div().querySelector(".books")
  }

  bookCards(genreDiv) {
    const bookCardsDiv = genreDiv.querySelector(".books")
    this.books().forEach(book => bookCardsDiv.append(book.bookCard()))
  }
}