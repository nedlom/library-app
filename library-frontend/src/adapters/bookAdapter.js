class BookAdapter {

  static url = "http://127.0.0.1:3000/books"

  static newBook() {
    event.preventDefault()

    const formInputs = this.querySelectorAll(".input")
    const book = {}
    formInputs.forEach(input => {
      book[input.id] = input.value
    })
    book["genre_id"] = this.parentElement.dataset.id
    
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
      const book = new Book(json.id, json.title, json.author, json.description, json.genre_id)
      const genre = Genre.findById(book.genre_id)
      genre.books().push(book)

      const genreDiv = document.getElementById(genre.id)
      genreDiv.innerHTML = ""

      genre.appendChildren(genreDiv)
    })
  }

  static deleteBook() {
    event.preventDefault()  
    
    fetch(`${BookAdapter.url}/${this.id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
        } 
    }).then(() => { 
      const genre = this.genre()
      Book.delete(this)
      
      const genreDiv = document.getElementById(genre.id)
      genreDiv.innerHTML = ""

      genre.appendChildren(genreDiv)
    }) 
  }  
}