class BookAdapter {

  static url = "http://127.0.0.1:3000/books"

  static newBook() {
    event.preventDefault()

    const inputs = event.target.querySelectorAll(".field")
    const book = {
      title: inputs[0].value,
      author: inputs[1].value,
      description: inputs[2].value, 
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
      const book = new Book(json)
      this.toggleEmptyBookCard()
      this.toggleForm()
      book.addDom()    
    })
  }

  static delete() {
    event.preventDefault()  
  
    fetch(`${BookAdapter.url}/${this.id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        } 
    })
    .then(resp => {
      if (resp.ok) {
        Book.delete(this)
        this.genre().toggleEmptyBookCard()
      } 
    })
  }  

  static edit() {
    event.preventDefault()
  
    const inputs = event.target.querySelectorAll(".field")
    const book = {
      title: inputs[0].value,
      author: inputs[1].value,
      description: inputs[2].value, 
    }
    
    fetch(`${BookAdapter.url}/${this.id}`, {
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
      this.update(json)
    })
  }
}