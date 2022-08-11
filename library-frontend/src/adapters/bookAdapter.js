class BookAdapter {

  static url = "http://127.0.0.1:3000/books"

  static newBook() {
    event.preventDefault()
    const book = {
      title: this.children[0].value,
      author: this.children[2].value,
      description: this.children[4].value,
      genre_id: this.id.split("-")[2]
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
      
      debugger
      const book = new Book(json.id, json.title, json.author, json.description, json.genre_id)
      const genre = Genre.findById(book.genre_id)
      // const genreBooks = genre.bookCardsDiv()
      // debugger
      genre.test()
      
      genre.bookCardsDiv().append(book.bookCard())
      
      // this.booksDiv().innerHTML = ""
      // this.bookCards()
      // this.bookListener()
      // debugger
      
      // BookAdapter.renderBooks(genre)
      
      // this.bookForm().reset()
      this.reset()


      // const genre = Genre.findById()
      // debugger
      genre.toggleForm()
      // this.bookFormDisplay()
    })
  }

  static delete() {
    event.preventDefault()  

    // debugger

    const id = this.id.split("-")[1]
    // debugger
  
    fetch(`${BookAdapter.url}/${id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        } 
    })
    .then(resp => {
      if (resp.ok) {
        // debugger
        const book = Book.findById(parseInt(id))
        
        const genre = book.genre()
        
        Book.delete(book)
        genre.test()
        book.removeFromDom()
        
        // BookAdapter.renderBooks(genre)
      } 
    })
    
  }  

  static edit() {
    event.preventDefault()
    
    const book = {
      title: this.children[0].value,
      author: this.children[2].value,
      description: this.children[4].value,
    }

    const id = this.id.split("-")[2]
    
    fetch(`${BookAdapter.url}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify ({ 
        book 
      })
    })
    .then(resp => resp.json())
    .then(json => {
      const book = Book.findById(json.id)
      book.title = json.title
      book.author = json.author
      book.description = json.description
      BookAdapter.renderBooks(book.genre())
    })
    this.reset()
  }

  static renderBooks(obj) {
    obj.bookDiv().innerHTML = ""
    obj.bookCards(obj.div())

    // obj.bookTest()
    // obj.bookDelBtnListeners()

    // obj.bookEditBtnListeners()
    // obj.bookEdit()
  }
}