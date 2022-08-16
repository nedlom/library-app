class Book {
  
  static all = []

  constructor(obj) {
    this.id = obj.id 
    this.title = obj.title
    this.author = obj.author
    this.description = obj.description
    this.genre_id = obj.genre_id
    Book.all.push(this)
  }

  static initBooks(bookArray) {
    bookArray.forEach(obj => new Book(obj))
  }

  static delete(book) {
    Book.all.splice(Book.all.indexOf(book), 1)
    book.bookCard().remove()
  }

  render() {
    const genreBooks = this.genre().div().querySelector(".books")
    genreBooks.append(this.buildBookCard())
  }
 
  genre() {
    return Genre.all.find(genre => this.genre_id === genre.id)
  }

  bookCard() {
    return document.querySelector(`[data-id="${this.id}"]`)
  }

  update(obj) {
    this.title = obj.title
    this.author = obj.author
    this.description = obj.description
    this.bookCard().innerHTML = ""
    this.bookCard().append(this.editableSection())
  }

  buildBookCard() {
    const bookCard = document.createElement("div")
    bookCard.className = "card"
    bookCard.dataset.id = this.id
    bookCard.append(this.editableSection())
    return bookCard
  }

  editableSection() {
    const editable = document.createElement("div")
    editable.className = "editable"
  
    editable.innerHTML = `
    <div class='inner-card'>
      <div class='book-info'>
        <div class="bold title">${this.title}</div>
        <div class="author">by ${this.author}</div>
        <hr>
        <p>${this.description}</p>
      </div>

      <div class='footer'>
        <hr>
        <button class='edit'>Edit</button>
        <div class='space'></div>
        <button class='delete'>Delete</button>
      </div>
    </div>

    <div class='inner-card no-display'>
      <form class='edit-form'>
        <input class='field' value='${this.title}'><br>
        <input class='field' value='${this.author}'><br>
        <textarea class='field'>${this.description}</textarea><br>
        <button type="submit" class='update-book'>Update</button>
      </form>

      <div class='footer'>
        <hr>
        <button class='back'>Go Back</button>
      </div>
    </div>
  `
  this.eventListeners(editable) 
  return editable
  }

  eventListeners(bookCard) {
    const delBtn = bookCard.querySelector(".delete")
    delBtn.addEventListener("click", BookAdapter.delete.bind(this))

    const editBtn = bookCard.querySelector(".edit")
    editBtn.addEventListener("click", this.toggleEditForm.bind(this))

    const form = bookCard.querySelector("form")
    form.addEventListener("submit", BookAdapter.edit.bind(this))

    const backBtn = bookCard.querySelector(".back")
    backBtn.addEventListener("click", this.toggleEditForm.bind(this))
  }

  toggleEditForm() {
    const innerCards = this.bookCard().querySelectorAll(".inner-card")
    if (event.target.className === "back") {
      innerCards[1].querySelector("form").reset()
    }
    innerCards.forEach(innerCard => innerCard.classList.toggle("no-display"))
  }
}