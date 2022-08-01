class Book {

  constructor(id, title, author, description, genre_id) {
    this.id = id 
    this.title = title
    this.author = author
    this.description = description
    this.genre_id = genre_id
  }

  static createBookForm(genreId) {
    const form = document.createElement("form")
    form.dataset.id = genreId
    form.className = "no-display"

    const titleInput = document.createElement("input")
    titleInput.id = `title-${genreId}`
    titleInput.placeholder = "Title"

    const authorInput = document.createElement("input")
    authorInput.id = `author-${genreId}`
    authorInput.placeholder = "Author"

    const descriptionTextarea = document.createElement("textarea")
    descriptionTextarea.id = `description-${genreId}`
    descriptionTextarea.placeholder = "Description"

    const submit = document.createElement("input")
    submit.type = "submit"
    submit.value = "Add Book"

    form.addEventListener("submit", this.newBook)

    form.append( 
      titleInput,
      this.linebreak(),
      authorInput,
      this.linebreak(),
      descriptionTextarea,
      this.linebreak(),
      submit)

    return form
  }

  static linebreak() {
    return document.createElement("br")
  }

  createBookDiv() {
    const div = document.createElement("div")
    div.className = "book-div"
    div.id = `book-${this.id}`

    div.append(
      this.titleTag(), 
      this.authorTag(), 
      this.descriptionTag(), 
      this.deleteButton()
      )

    return div
  }

  titleTag() {
    const h4 = document.createElement("h4")
    h4.innerHTML = this.title
    return h4
  }

  authorTag() {
    const p = document.createElement("p")
    p.innerHTML = `by ${this.author}`
    return p
  }

  descriptionTag() {
    const p = document.createElement("p")
    p.innerHTML = this.description
    return p
  }

  deleteButton() {
    const button = document.createElement("button")
    button.innerHTML = `Delete ${this.title}`
    button.addEventListener("click", this.deleteBook.bind(this))
    return button
  }
    
  renderBook() {
    const bookDiv = this.createBookDiv()
    const genreDiv = document.getElementById(this.genre_id)
    genreDiv.append(bookDiv)
  }

  static newBook() {
    event.preventDefault()
    const id = this.dataset.id
   
    const book = {
      title: document.getElementById(`title-${id}`).value,
      author: document.getElementById(`author-${id}`).value, 
      description: document.getElementById(`description-${id}`).value, 
      genre_id: id
    }
 
    fetch("http://127.0.0.1:3000/books", {
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
    this.className = "no-display"
    this.parentElement.children[0].className = "" 
  }

  deleteBook() {
    event.preventDefault()
   
    fetch(`http://127.0.0.1:3000/books/${this.id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
        }
    })
    .catch(() => console.log("error"))

    document.getElementById(`book-${this.id}`).remove()
  }  
}