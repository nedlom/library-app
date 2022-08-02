class GenreAdapter {

  static url = "http://127.0.0.1:3000/genres"

  // constructor() {
  //   this.url = "http://127.0.0.1:3000/genres"
  //   this.getForm()
  // }

  // getForm() {
  //   const genreForm = document.getElementById("genre-form")
  //   genreForm.addEventListener("submit", this.newGenre.bind(this))
  // }

  static fetchGenres() {
    fetch(this.url)
    .then(res => res.json())
    .then(json => {
      json.forEach(obj => {
        const genre = new Genre(obj.id, obj.name, obj.books)
      })
      Genre.renderGenres()
    })
  }

  static newGenre() {
    event.preventDefault()

    // debugger
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
    
    fetch(`${GenreAdapter.url}/${this.id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
        }
    })
    
    document.getElementById(this.id).remove()
  }  

}