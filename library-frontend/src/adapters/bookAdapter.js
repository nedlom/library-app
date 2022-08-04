class BookAdapter {

  static url = "http://127.0.0.1:3000/books"

  static newBook() {
    event.preventDefault()
 
    const id = this.parentElement.dataset.id
    
    const book = {
      title: document.getElementById(`title-${id}`).value,
      author: document.getElementById(`author-${id}`).value, 
      description: document.getElementById(`description-${id}`).value, 
      genre_id: id
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
      const book = new Book(json.id, json.title, json.author, json.description, json.genre_id)
      Genre.findById(book.genre_id).books.push(book)
      const bookGenre = document.getElementById(id).getElementsByClassName("books")[0]
      bookGenre.append(book.createBookDiv())
      
      if (bookGenre.children[0].className === 'book-div no-books') {
        bookGenre.children[0].remove()
      }
    })
   
    this.reset()
    const bookForm = document.getElementById(`book-form-div-container-${id}`)
    bookForm.className = "no-display"
  }

  static deleteBook() {
    event.preventDefault()

    fetch(`${BookAdapter.url}/${this.id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
        } 
    }).then(() => { 
      
      const genreElement = document.getElementById(this.genre_id)

      const booksElement = genreElement.getElementsByClassName("books")[0]
      booksElement.innerHTML = ""

      const genre = this.genre()
      const genreBooks = this.genre().books
      const updateGenreBooks = genreBooks.filter(book => book !== this)

      genre.books = updateGenreBooks

      if (genre.hasBooks()) {
        const bookDivs = genre.bookDivs()
        bookDivs.forEach(book => booksElement.append(book))
      } else {
        const noBooks = document.createElement("div")
        noBooks.className = "book-div no-books"
        noBooks.innerHTML = `${genre.name} genre empty.`
        booksElement.append(noBooks)
      }
    }) 
  }  
}