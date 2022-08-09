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
          <button class='window-1' id='genre-${this.id}'><i class="fa fa-window-close"></i></button>
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
            <form class='add-book'>
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
    return this.div().querySelector('form.add-book')
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
    this.closeBtn().addEventListener("click", GenreAdapter.delete)
    this.addBookBtn().addEventListener("click", this.toggleForm.bind(this))
    this.bookForm().addEventListener("submit", BookAdapter.newBook.bind(this))
    this.bookDelBtnListeners()


    this.bookEditBtnListeners()
    this.bookUpdateBtnsListeners()
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
    return this.bookDiv().querySelectorAll(".delete-book")
  }

  bookDelBtnListeners() {
    this.bookDelBtns().forEach(button => {
      button.addEventListener("click", BookAdapter.deleteBook)
    })
  }

  bookEditBtns() {
    return this.bookDiv().querySelectorAll(".edit-book")
  }

  bookEditBtnListeners() {
    this.bookEditBtns().forEach(button => {
      button.addEventListener("click", this.check)
    })
  }

  bookUpdateBtns() {
    return this.bookDiv().querySelectorAll(".update-book")
  }

  bookUpdateBtnsListeners() {
    debugger
  }

  check() {
    debugger
    this.parentElement.classList.toggle("no-display")
    this.parentElement.nextElementSibling.classList.toggle("no-display")
    // const x = this.parentElement
    // const title = x.querySelector(".title").innerHTML
    // const author = x.querySelector(".author").innerHTML
    // const desc = x.querySelector("p").innerHTML
    
    // x.innerHTML = ""
    // x.innerHTML = ` `
  }
  
  bookEditBtnListeners1() {
    debugger
  }


  // --------------------------------------------------------


  bookEditListeners() {
    const x = this.bookDiv().querySelectorAll(".inner-card")
    x.forEach(y => y.addEventListener("dblclick", this.tester))
  }
  
  // testing() {
  //   const x = this.div().querySelector(".inner-card")
    // const y = x.querySelector(".title")
  //   x.addEventListener("dblclick", this.tester)
  // }

  tester(e) {
    // debugger
    const target = e.target
    target.contentEditable = true
    target.focus()
  }

  bluring(e) {
    const target = e.target
    target.contentEditable = false
    const title = e.target.parentElement.querySelector(".title").innerHTML
    const author = e.target.parentElement.querySelector(".author").innerHTML
    const desc = e.target.parentElement.querySelector("p").innerHTML
    const id = e.target.parentElement.parentElement.querySelector("button").id.split("-")[1]
    debugger
   
  }

}