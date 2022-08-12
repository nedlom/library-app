class GenreAdapter {

  static url = "http://127.0.0.1:3000/genres"

  static fetchGenres() {
    fetch(this.url)
    .then(resp => resp.json())
    .then(json => {
      json.forEach(obj => {
        const genre = new Genre(obj)
        Book.initBooks(obj.books)
      })
      Genre.noGenresDiv()
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
    // .then(resp => {
    //   if (resp === 201 ) { degugger }
    //   else {
    //     debugger
    //     throw new Error(resp.statusText)}})
    //   .catch(err => console.log(err))
    .then(json => {
      // console.log(json.id)
      const genre = new Genre(json)
      Genre.noGenresDiv()
      genre.renderGenre()
    })
    document.getElementById("genre-form").reset()
  }

  static delete() {
    event.preventDefault()
    fetch(`${GenreAdapter.url}/${this.id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
      .then(resp => {
        debugger
        if (resp.ok) {
          Genre.delete(this)
          Genre.noGenresDiv()
        }
      })
  }  
}