class Genre {

  static all = []

  constructor(id, name, books) {
    this.id = id
    this.name = name
    Genre.all.push(this)
  }

  static findById(id) {
    return Genre.all.find(genre => genre.id === id)
  }

  static deleteGenre(genre) {
    Genre.all.splice(Genre.all.indexOf(genre), 1)
  }

  static noGenres() {
    if (Genre.all.length === 0) {
      document.querySelector(".empty").classList.remove("no-display")
    } else {
      document.querySelector(".empty").classList.add("no-display")
    }
  }

  static removeFromDom(genre) {
    document.getElementById(genre.id).remove()
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
          <button class='window-1' id='del-${this.id}'><i class="fa fa-window-close"></i></button>
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
            <form class='add-book' id='form-genre-${this.id}'>
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

  div() {
    return document.getElementById(this.id)
  }
  
  blocks() {
    return this.div().querySelectorAll(".block")
  }
  formOuterContainer() {
    return this.div().querySelector('.form-container-outer')
  }

  bookForm() {
    return this.div().querySelector('form.add-book')
  }

  test() {

    // const buttons = this.div().querySelector(".header").children[1].querySelectorAll("button")
    // buttons.forEach(button => button.addEventListener("click", this.minMaxClose))
    

    const minBtn = this.div().querySelector(".window-3")
    minBtn.addEventListener("click", this.minimize.bind(this))

    const maxBtn = this.div().querySelector(".window-2")
    maxBtn.addEventListener("click", this.maximize.bind(this))

    const closeBtn = this.div().querySelector(".window-1")
    closeBtn.addEventListener("click", GenreAdapter.delete)

    const addBookBtn = this.div().querySelector(".add-book-button")
    addBookBtn.addEventListener("click", this.toggleForm.bind(this))

    const addBookForm = this.div().querySelector("form.add-book")
    addBookForm.addEventListener("submit", BookAdapter.newBook)

    this.bookTest()
  }

  // minMaxClose() {
  //   debugger
  //   if (this.className === "window-3") {

  //   } else if (this.class === "window-2") {

  //   } else {
      
  //   }
  // }

  minimize() {
    this.blocks().forEach(block => block.classList.add("no-display"))
  }
  maximize() {
    this.blocks().forEach(block => block.classList.remove("no-display"))
  }
  toggleForm() {
    this.formOuterContainer().classList.toggle("no-display")
  }


  bookTest() {
    // const bookDelBtns = this.div().querySelectorAll(".delete-book")
    // bookDelBtns.forEach(button => button.addEventListener("click", BookAdapter.delete))

    // const editBookBtns = this.bookDiv().querySelectorAll(".edit-book")
    // editBookBtns.forEach(button => button.addEventListener("click", this.toggleEditForm))

    // const editBookForms = this.bookDiv().querySelectorAll(".edit-form")
    // editBookForms.forEach(form => form.addEventListener("submit", BookAdapter.edit))

    // const cancelEditBtns = this.bookDiv().querySelectorAll(".cancel") 
    // cancelEditBtns.forEach(button => button.addEventListener("click", this.toggle2))
  }

  toggleEditForm() {
    this.parentElement.classList.toggle("no-display")
    this.parentElement.nextElementSibling.classList.toggle("no-display")
  }

  toggle2() {
    const form = this.previousElementSibling
    const innerCard = form.previousElementSibling
    form.classList.toggle('no-display')
    innerCard.classList.toggle("no-display")
  }

  
  eventListeners() {
    this.test()
  }
  
  bookCards() {
    if (this.hasBooks()) {
      this.books().forEach(book => this.bookDiv().append(book.bookCard()))
    } else {
      this.bookDiv().innerHTML = this.noBooks()
    }

    // if (this.hasBooks()) {
    //   this.books().forEach(book => this.bookDiv().innerHTML += book.bookCard())
    // } else {
    //   this.bookDiv().innerHTML = this.noBooks()
    // }
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
}