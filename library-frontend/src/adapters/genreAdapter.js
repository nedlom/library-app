class GenreAdapter {

  static url = "http://127.0.0.1:3000/genres"

  static fetchGenres() {
    fetch(this.url)
    .then(res => res.json())
    .then(json => {
      json.forEach(obj => {
        const genre = new Genre(obj.id, obj.name)
        Book.initBooks(obj.books)
      })
      Genre.noGenres()
      Genre.renderGenres()
    })
    const genreForm = document.getElementById("genre-form")
    genreForm.addEventListener("submit", GenreAdapter.newGenre)
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
      Genre.noGenres()
      genre.renderGenre()
    })

    document.getElementById("genre-form").reset()
  }

  static delete() {
    event.preventDefault()

    // debugger
    const genreId = this.id.split("-")[1]
    

    // if ( confirm(`This will delete the entire` + 
    //   ` ${this.name} genre and all the books in` +
    //   ` it. Click OK if you want to proceed.`)
    //   ) {

      fetch(`${GenreAdapter.url}/${genreId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
          }
      })
      .then(() => {
        // debugger
        const genre = Genre.findById(parseInt(genreId))
        Genre.removeFromDom(genre)
        Genre.deleteGenre(genre)
        Genre.noGenres()
        // document.getElementById(this.id).remove()
      })
      // Genre.deleteGenre(this)
      // Genre.noGenres()
      // document.getElementById(this.id).remove()

    // }
  }  
}