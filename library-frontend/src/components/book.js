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

    form.append(
      this.titleInput(genreId),
      this.authorInput(genreId),
      this.descriptionInput(genreId),
      this.submit()
      )

    form.addEventListener("submit", BookAdapter.newBook)

    return form
  }

  static titleInput(genreId) {
    const div = document.createElement("div")
    div.className = "form-input"
    const titleInput = document.createElement("input")
    titleInput.id = `title-${genreId}`
    titleInput.placeholder = "Title"
    div.append(titleInput)
    return div
  }

  static authorInput(genreId) {
    const div = document.createElement("div")
    div.className = "form-input"
    const authorInput = document.createElement("input")
    authorInput.id = `author-${genreId}`
    authorInput.placeholder = "Author"
    div.append(authorInput)
    return div
  }

  static descriptionInput(genreId) {
    const div = document.createElement("div")
    div.className = "form-input"
    const descriptionInput = document.createElement("textarea")
    descriptionInput.id = `description-${genreId}`
    descriptionInput.placeholder = "Description"
    div.append(descriptionInput)
    return div
  }

  static submit() {
    const div = document.createElement("div")
    div.className = "form-input"
    const submit = document.createElement("input")
    submit.type = "submit"
    submit.value = "Add Book"
    div.append(submit)
    return div
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
    // debugger
    const bookDiv = this.createBookDiv()
    const genreDiv = document.getElementById(this.genre_id)
    const genreBooksDiv = genreDiv.querySelector(".books")
    genreBooksDiv.append(bookDiv)
  }
}