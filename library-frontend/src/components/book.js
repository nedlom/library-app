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
  }

  // static removeFromDom(book) {
  //   document.getElementById(`b-${book.id}`).remove()
  // }

  static findById(id) {
    return Book.all.find(book => book.id === id)
  }

  static find(book) {
    return Book.all.find(b => b === book)
  }

  genre() {
    return Genre.all.find(genre => this.genre_id === genre.id)
  }

  domElement() {
    return document.getElementById(`b-${this.id}`)
  }

  removeFromDom() {
    this.domElement().remove()
  }

  static initBooks(bookArray) {
    bookArray.forEach(obj => {
      new Book(obj.id, obj.title, obj.author, obj.description, obj.genre_id)
    })
  }

  bookCard() {
    const bookCard = document.createElement("div")
    bookCard.className = "card"
    bookCard.id = `b-${this.id}`

    bookCard.innerHTML = `
      <div class='inner-card'>
        <div class='book-info'>
          <div class="bold title">${this.title}</div>
          <div class="author">by ${this.author}</div>
          <hr>
          <p>${this.description}</p>
        </div>

        <div class='footer'>
          <hr>
          <button class='edit-book' id='edit-${this.id}'>Edit</button>
          <div class='space'></div>
          <button class='delete-book' id='book-${this.id}'>Delete</button>
        </div>
      </div>

      <div class='inner-card no-display'>
        <form class='edit-form' id='edit-book-${this.id}'>
          <input class='book-field' value='${this.title}'><br>
          <input class='book-field' value='${this.author}'><br>
          <textarea class='book-field'>${this.description}</textarea><br>
          <button type="submit" class='update-book'>Update</button>
        </form>
 
        <div class='footer'>
          <hr>
          <button class='cancel'>Go Back</button>
        </div>
      </div>
    `
    this.eventListeners(bookCard) 
    return bookCard
  }

  eventListeners(bookCard) {
    bookCard.querySelector(".delete-book").addEventListener("click", BookAdapter.delete)
    bookCard.querySelector(".edit-book").addEventListener("click", this.toggleEditForm)
    bookCard.querySelector("form").addEventListener("submit", BookAdapter.edit)
    bookCard.querySelector(".cancel").addEventListener("click", this.toggleEditForm)
  }

  toggleEditForm() {
    const container = this.parentElement.parentElement
    const nextSib  = container.nextElementSibling
    const prevSib = container.previousElementSibling
    if (nextSib) {
      nextSib.classList.toggle("no-display")
    } else {
      prevSib.classList.toggle("no-display")
      container.children[0].reset()
    }
    container.classList.toggle("no-display")
  }

  // bookCard() {
    
  //   return `
  //     <div class='card' id='b-${this.id}'>
  //       <div class='inner-card'>
  //         <div class="bold title">${this.title}</div>
  //         <div class="author">by ${this.author}</div>
  //         <hr>
  //         <p>${this.description}</p>
        
  //         <button class='delete-book' id='book-${this.id}'>
  //           <i class='fa fa-trash'></i>
  //         </button>
  //         <button class='edit-book' id='edit-${this.id}'>
  //           Edit
  //         </button>
  //       </div>
  //       <form class='edit-form no-display'>
  //         <input class='book-field' value='${this.title}'><br>
  //         <input class='book-field' value='${this.author}'><br>
  //         <textarea class='book-field'>${this.description}</textarea><br>
  //         <button type="submit" class='update-book'>update</button>
  //       </form>
  //       <button class='cancel'>Cancel</button>
  //     </div>
  //    `
  // }

  

  update() {
    const id = Book.all.indexOf(this)
    Book.all[id] = this
  }

  

  
}