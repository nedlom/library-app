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

  static initBooks(array) {
    array.forEach(obj => {
      new Book(obj.id, obj.title, obj.author, obj.description, obj.genre_id)
    })
  }

  bookCard() {

    
    return `
      <div class='card'>
        <div class='inner-card'>
          <div class="bold title">${this.title}</div>
          <div class="author">${this.author}</div>
          <hr>
          <p>${this.description}</p>
        
          <button class='delete-book' id='book-${this.id}'>
            <i class='fa fa-trash'></i>
          </button>
          <button class='edit-book' id='edit-${this.id}'>
            edit
          </button>
        </div>
        <form class='no-display'>
          <input class='book-field' value='${this.title}'><br>
          <input class='book-field' value='${this.author}'><br>
          <textarea class='book-field'>${this.desc}</textarea><br>
          <button type="submit" class='update-book'>update</button>
        </form>

      </div>
     `
  }

  static findById(id) {
    return Book.all.find(book => book.id === id)
  }

  genre() {
    return Genre.all.find(genre => this.genre_id === genre.id)
  }

  static delete(book) {
    // Book.all = Book.all.filter(b => b.id !== book.id )
    Book.all.splice(Book.all.indexOf(book), 1)
  }
}