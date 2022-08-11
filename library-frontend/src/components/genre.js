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

  bookDiv() {
    return this.div().querySelector(".books")
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

  test() {
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

  // eventListeners() {
    
  //   const minBtn = this.div().querySelector(".window-3")
  //   minBtn.addEventListener("click", this.minimize.bind(this))

  //   const maxBtn = this.div().querySelector(".window-2")
  //   maxBtn.addEventListener("click", this.maximize.bind(this))

  //   const closeBtn = this.div().querySelector(".window-1")
  //   closeBtn.addEventListener("click", GenreAdapter.delete)

  //   const addBookBtn = this.div().querySelector(".add-book-button")
  //   addBookBtn.addEventListener("click", this.toggleForm.bind(this))

  //   const addBookForm = this.div().querySelector("form.add-book")
  //   addBookForm.addEventListener("submit", BookAdapter.newBook)
  // }

  minMax() {
    const blocks = this.div().querySelectorAll(".block")
    blocks.forEach(block => {
      if (event.currentTarget.className === "min") {
        block.classList.add("no-display")
      } else if (event.currentTarget.className === "max") {
        block.classList.remove("no-display")
      } 
      // else {
      //   GenreAdapter.delete.call(this)
      // }
    })
  }

  // minimize() {
  //   debugger
  //   this.blocks().forEach(block => block.classList.add("no-display"))
  // }
  // maximize() {
  //   debugger
  //   this.blocks().forEach(block => block.classList.remove("no-display"))
  // }

  toggleForm() {
    const formCont = this.div().querySelector('.form-container-outer')
    formCont.classList.toggle("no-display")
  }

  // bookCards() {
  //   debugger
  //   if (this.hasBooks()) {
  //     this.books().forEach(book => this.bookDiv().append(book.bookCard()))
  //   } else {
  //     this.bookDiv().innerHTML = this.noBooks()
  //   }
  // }
  bookCardsDiv() {
    return this.div().querySelector(".books")
  }

  bookCards(genreDiv) {
    const bookCardsDiv = genreDiv.querySelector(".books")
    this.books().forEach(book => bookCardsDiv.append(book.bookCard()))
    // if (this.books().length !== 0) {
    //   this.books().forEach(book => bookCardsDiv.append(book.bookCard()))
    // } else {
    //   const emptyGenre = document.createElement("div")
    //   emptyGenre.className = 'card empty'
    //   emptyGenre.innerHTML = `${this.name} Genre Empty`
    //   genreDiv.querySelector(".books").append(emptyGenre)
    //   genreDiv.append = emptyGenre
    // }
  }


  empty() {




    const bookCardsDiv = this.div().querySelector(".books")
      if (this.books().length === 0){
      const emptyGenre = document.createElement("div")
      emptyGenre.className = 'card'
      emptyGenre.innerHTML = `${this.name} Genre Empty`
      bookCardsDiv.append(emptyGenre)
      }
  }
  // hasBooks() {
  //   return this.books().length !== 0
  // }

  

  // noBooks() {
  //   return `<div class='card'>${this.name} Genre Empty</di>`
  // }

  
}