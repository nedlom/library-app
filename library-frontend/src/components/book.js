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

  static delete(book) {
    // Book.all = Book.all.filter(b => b.id !== book.id )
    Book.all.splice(Book.all.indexOf(book), 1)
    book.domElement().remove()
  }

  // static findById(id) {
  //   return Book.all.find(book => book.id === id)
  // }

  addDom() {
    const genreDiv = this.genre().bookCardsDiv()
    const bookCard = this.bookCard()
    genreDiv.append(bookCard)

    // debugger
  }
 
  genre() {
    return Genre.all.find(genre => this.genre_id === genre.id)
  }

  // change to bookCard
  domElement() {
    return document.querySelector(`[data-id="${this.id}"]`)
    // return document.getElementById(`b-${this.id}`)
  }

  // removeFromDom() {
  //   this.domElement().remove()
  // }

  update(obj) {
    this.title = obj.title
    this.author = obj.author
    this.description = obj.description
    this.domElement().innerHTML = ""
    this.domElement().append(this.innerCard())
  }

  static initBooks(bookArray) {
    bookArray.forEach(obj => {
      new Book(obj.id, obj.title, obj.author, obj.description, obj.genre_id)
    })
  }

  bookCard() {
    const bookCard = document.createElement("div")
    bookCard.className = "card"
    // bookCard.id = `b-${this.id}`
    bookCard.dataset.id = this.id
    bookCard.append(this.innerCard())
    return(bookCard)
  }

  innerCard() {
    const innerCard = document.createElement("div")
    innerCard.className = "inner-card"

    innerCard.innerHTML = `
    <div class='inner-cards'>
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

    <div class='inner-cards no-display'>
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
  
  this.eventListeners(innerCard) 
  return innerCard
  }

  eventListeners(bookCard) {
   
    bookCard.querySelector(".delete").addEventListener("click", BookAdapter.delete.bind(this))
    bookCard.querySelector(".edit").addEventListener("click", this.toggleEditForm.bind(this))
    bookCard.querySelector("form").addEventListener("submit", BookAdapter.edit.bind(this))
    bookCard.querySelector(".back").addEventListener("click", this.toggleEditForm.bind(this))
  }

  toggleEditForm() {
    const innerCards = this.domElement().children[0].querySelectorAll(".inner-cards")
    innerCards[0].classList.toggle("no-display")
    innerCards[1].classList.toggle("no-display")
    
    if (event && event.target.className === "back") {
      innerCards[1].querySelector("form").reset()
    }
  }
}