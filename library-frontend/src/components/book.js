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
    // debugger
    form.id = "book-form"

    const titleInput = document.createElement("input")
    titleInput.id = "title"
    titleInput.placeholder = "Title"

    const authorInput = document.createElement("input")
    authorInput.id = "author"
    authorInput.placeholder = "Author"

    const descriptionTextarea = document.createElement("textarea")
    descriptionTextarea.id = "description"
    descriptionTextarea.placeholder = "Description"

    const submit = document.createElement("input")
    submit.type = "submit"
    submit.value = "Add Book"

    // make form disappear and button reappear
    submit.addEventListener("click", function() {
      this.parentElement.style.display = "none"
      // debugger
      const div = document.getElementById(`button${genreId}`)
      div.style.display = "block"
      div.style.textAlign = "center"
    })
    form.addEventListener("submit", this.newBook)

    const br1 = document.createElement("br")
    const br2 = document.createElement("br")
    const br3 = document.createElement("br")

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
    div.id = `book-id-${this.id}`

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
    // button.addEventListener("click", genreAdapter.deleteGenre.bind(this))
    return button
  }
    // const h3 = document.createElement("h3")
    // const p = document.createElement("p")
    // const del = document.createElement("button")

    // del.id = this.id
    // del.innerText = `Delete ${this.title}`

    // h3.innerText = this.title
    // p.innerText = `by ${this.author} \n\n ${this.description}`

    // del.addEventListener("click", this.deleteBook)

    // div.appendChild(h3)
    // div.appendChild(p)
    // div.appendChild(del)

    // return div
  // }

  renderBook() {
    // debugger
    const x = this.createBookDiv()

    const y = document.getElementById(this.genre_id)

    y.append(x)
  }

  static newBook() {
    event.preventDefault()

    const book = {
      title: document.getElementById("title").value,
      author: document.getElementById("author").value, 
      description: document.getElementById("description").value, 
      genre_id: this.parentElement.id.split("-")[2]
    }
    // debugger
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
    document.getElementById("book-form").reset()
    // debugger
  }

  deleteBook() {
    // debugger
    event.preventDefault()
    // debugger
    const id = this.id
    // debugger
    fetch(`http://127.0.0.1:3000/books/${id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
        }
    })
    .catch(() => console.log("error"))

    document.getElementById(`book-id-${this.id}`).remove()

    // this.parentElement.remove()
  }  

}