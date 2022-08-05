class GenreAdapter {

  static url = "http://127.0.0.1:3000/genres"

  static fetchGenres() {
    fetch(this.url)
    .then(res => res.json())
    .then(json => {
      json.forEach(obj => {
        // debugger
        const genre = new Genre(obj.id, obj.name)

        Book.initBooks(obj.books)
        // obj.books.forEach(book => {
        //   new Book(book.id, book.title, book.author, book.description, book.genre_id)
        // })
        // debugger
      })
      Genre.renderGenres()
    })
  }

  static newGenre() {
    event.preventDefault()

    fetch(GenreAdapter.url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: document.getElementById('genre-name').value
      })
    })
    .then(resp => resp.json())
    .then(json => {
      const genre = new Genre(json.id, json.name, json.books)
      genre.renderGenre()
    })

    document.getElementById("genre-form").reset()
  }

  static deleteGenre() {
    event.preventDefault()
    if ( confirm(`This will delete the entire` + 
      ` ${this.name} genre and all the books in` +
      ` it. Click OK if you want to proceed.`)
      ) {
      fetch(`${GenreAdapter.url}/${this.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
          }
      })
        
      document.getElementById(this.id).remove()
    }
  }  
}