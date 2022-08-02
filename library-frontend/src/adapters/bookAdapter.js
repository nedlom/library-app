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
      book.renderBook()
    })
    
    this.reset()
    this.parentElement.className = "no-display"
  }

  static deleteBook() {
    event.preventDefault()
      fetch(`${BookAdapter.url}/${this.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
          }
      })

      document.getElementById(`book-${this.id}`).remove()
  }  
}