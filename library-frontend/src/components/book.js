class Book {

  static all = []

  constructor(id, title, author, description, genre_id) {
    this.id = id 
    this.title = title
    this.author = author
    this.description = description
    this.genre_id = genre_id
    Book.all.push(this)
  }

  static createBookForm(genreId) {
    const form = document.createElement("form")
    form.dataset.id = genreId
    form.className = "no-display"

    form.append(
      this.titleInput(genreId),
      this.linebrk(),
      this.authorInput(genreId),
      this.linebrk(),
      this.descriptionInput(genreId),
      this.linebrk(),
      this.submit()
      )

    form.addEventListener("submit", BookAdapter.newBook)

    return form
  }

  static titleInput(genreId) {
    const titleInput = document.createElement("input")
    titleInput.id = `title-${genreId}`
    titleInput.placeholder = "Title"
    return titleInput
  }

  static authorInput(genreId) {
    const authorInput = document.createElement("input")
    authorInput.id = `author-${genreId}`
    authorInput.placeholder = "Author"
    return authorInput
  }

  static descriptionInput(genreId) {
    const descriptionInput = document.createElement("textarea")
    descriptionInput.id = `description-${genreId}`
    descriptionInput.placeholder = "Description"
    return descriptionInput
  }

  static submit() {
    const submit = document.createElement("input")
    submit.type = "submit"
    submit.value = "Add Book"
    return submit
  }

  static linebrk() {
    return document.createElement("br")
  }

  createBookDiv() {
    const div = document.createElement("div")
    div.className = "book-div"
    div.id = `book-${this.id}`

    div.append(
      this.bookTitle(), 
      this.bookAuthor(), 
      this.bookDescription(), 
      this.deleteButton()
      )

    return div
  }

  bookTitle() {
    const h4 = document.createElement("h4")
    h4.innerHTML = this.title
    return h4
  }

  bookAuthor() {
    const p = document.createElement("p")
    p.innerHTML = `by ${this.author}`
    return p
  }

  bookDescription() {
    const p = document.createElement("p")
    p.innerHTML = this.description
    return p
  }

  deleteButton() {
    const button = document.createElement("button")
    button.innerHTML = `Delete ${this.title}`
    // button.addEventListener("click", this.deleteBook.bind(this))
    button.addEventListener("click", BookAdapter.deleteBook.bind(this))
    return button
  }
    
  renderBook() {
    const bookDiv = this.createBookDiv()
    const genreDiv = document.getElementById(this.genre_id)
    genreDiv.append(bookDiv)
  }
}