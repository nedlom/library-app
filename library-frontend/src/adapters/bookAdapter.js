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

    const bookId = this.id.split("-")[1]
    // debugger
  
    
    fetch(`${BookAdapter.url}/${bookId}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        } 
    })
    .then(resp => {
      if (resp.ok) {
        const book = Book.findById(parseInt(bookId))
        const genre = book.genre()
        Book.delete(book)
        BookAdapter.renderBooks(genre)
      // // genre.booksDiv().innerHTML = ""
      // // genre.bookCards()
      // // genre.bookListener()
      }
    })
  }  

  static editBook(title, author, desc, id) {
    
    const book = {
      title: title,
      author: author,
      description: desc,
    }

    debugger
    
    return fetch(`${BookAdapter.url}/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ book }),
    }).then(res => res.json())
    // .then(json => console.log(json))
    // debugger
    debugger

  }

  static renderBooks(obj) {
    obj.bookDiv().innerHTML = ""
    obj.bookCards()
    obj.bookDelBtnListeners()

    obj.bookEditListeners()

    // obj.bookEditBtnListeners()
  }
}