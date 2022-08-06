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
        <div class='bold'>
        ${this.title}
        <br>
        by ${this.author}
        </div>
        <p>${this.description}</p>
        <button class='delete-book' data-id='${this.id}'>
          <i class='fa fa-trash'></i>
        </button>
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