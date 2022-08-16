class Genre {

  static all = []

  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    Genre.all.push(this)
  }

  static newGenreListener() {
    const genreForm = document.getElementById("genre-form")
    genreForm.addEventListener("submit", GenreAdapter.newGenre)
  }

  static toggleNoGenresDiv() {
    if (Genre.all.length === 0) {
      document.querySelector(".empty-genre").classList.remove("no-display")
    } else {
      document.querySelector(".empty-genre").classList.add("no-display")
    }
  }

  static delete(genre) {
    Genre.all.splice(Genre.all.indexOf(genre), 1)
    genre.books().forEach(book => Book.delete(book))
    genre.div().remove()
  }
  
  static renderGenres() {
    this.all.forEach(genre => genre.render())
  }

  render() {
    const genreContainer = document.getElementById("genre-container")
    const genreDiv = this.buildGenre()
    
    if (this.books().length !== 0) {
      genreDiv.querySelector(".empty").classList.add("no-display")
    }
    
    genreContainer.append(genreDiv)
    this.books().forEach(book => book.render())
  }

  buildGenre() {
    const genreDiv = document.createElement("div")
    genreDiv.className = "genre"
    genreDiv.id = this.id

    genreDiv.innerHTML = `
      <div class='header'>
        <div class='header-div'>${this.name}</div>
        <div class='header-div'>
          <button class='close'><i class="fa fa-trash"></i></button>
          <button class='caret'><i class="fa fa-caret-down"></i></button>
        </div>
      </div>

      <div class='block no-display'>
        <div class='add-book'>
          <button class='add-book-button'>Add Book To ${this.name}</button>
        </div>
        <div class='form-container-outer no-display'>
          <div class='form-container-inner'>
            <form class='add-book-form'>
              <input class='field' placeholder='Title'><br>
              <input class='field' placeholder='Author'><br>
              <textarea class='field' placeholder='Description'></textarea><br>
              
              <button type="submit"><i class="fa fa-solid fa-plus"></i></button>
            </form> 
          </div>
        </div>
      </div>

      <div class='block no-display'>
        <div class='books'>
          <div class='card empty'>
            ${this.name} Genre Empty
          </div>
        </div>
      </div>
    `
    this.eventListeners(genreDiv)
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
    const upCaret = genreDiv.querySelector(".caret")
    upCaret.addEventListener("click", this.caretUpDown.bind(this))

    const closeBtn = genreDiv.querySelector(".close")
    closeBtn.addEventListener("click", GenreAdapter.delete.bind(this))

    const addBookBtn = genreDiv.querySelector(".add-book-button")
    addBookBtn.addEventListener("click", this.toggleForm.bind(this))

    const addBookForm = genreDiv.querySelector(".add-book-form")
    addBookForm.addEventListener("submit", BookAdapter.newBook.bind(this))
  }

  caretUpDown() {
    const down =`<i class="fa fa-caret-down"></i>`
    const up = `<i class="fa fa-caret-up"></i>`
    const target = event.currentTarget

    if (target.innerHTML === down) {
      target.innerHTML = up
    } else {
      target.innerHTML = down
    }

    this.div().querySelectorAll(".block").forEach(block => {
      block.classList.toggle("no-display")
    })
  }

  toggleForm() {
    const formCont = this.div().querySelector('.form-container-outer')
    formCont.querySelector("form").reset()
    formCont.classList.toggle("no-display")
  }

  div() {
    return document.getElementById(this.id)
  }
  
  books() {
    return Book.all.filter(book => book.genre_id === this.id)
  }
}