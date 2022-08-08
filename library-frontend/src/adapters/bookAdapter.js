class BookAdapter {

  static url = "http://127.0.0.1:3000/books"

  static newBook() {
    event.preventDefault()


    const book = {
      title: this.bookForm().children[0].value,
      author: this.bookForm().children[2].value,
      description: this.bookForm().children[4].value,
      genre_id: this.id
    }
    
    fetch(BookAdapter.url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        book
      })
    })
    .then(resp => resp.json())
    .then(json => {
      new Book(json.id, json.title, json.author, json.description, json.genre_id)
      // this.booksDiv().innerHTML = ""
      // this.bookCards()
      // this.bookListener()

      BookAdapter.renderBooks(this)
      
      this.bookForm().reset()
      this.toggleForm()
      // this.bookFormDisplay()
    })
  }

  static deleteBook() {
    event.preventDefault()  

    const id = this.dataset.id
    
    fetch(`${BookAdapter.url}/${id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        } 
    })
    .then(() => {
      const book = Book.findById(parseInt(id))
      const genre = book.genre()
      Book.delete(book)
      BookAdapter.renderBooks(genre)
      // genre.booksDiv().innerHTML = ""
      // genre.bookCards()
      // genre.bookListener()
    })
  }  

  static renderBooks(obj) {

    obj.bookDiv().innerHTML = ""
    obj.bookCards()
    obj.bookDelBtnListeners()
  }
}