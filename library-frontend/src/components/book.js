class Book {

  constructor(id, title, author, description, genre_id) {
    this.id = id 
    this.title = title
    this.author = author
    this.description = description
    this.genre_id = genre_id
  }

  static renderBookForm() {
    const form = document.createElement("form")
    form.id = "book-form"

    const titleLabel = document.createElement("label")
    titleLabel.innerText = "Title"

    const titleInput = document.createElement("input")

    form.append(titleLabel, titleInput)

    // form.appendChild(titleLabel)
    // form.appendChild(titleInput)
    return form
  }

  createBookDiv() {
    const div = document.createElement("div")
    div.id = this.id
    // div.className = this.genre_id

    const h3 = document.createElement("h3")
    const p = document.createElement("p")
    const del = document.createElement("button")

    // del.id = this.id
    del.innerText = `Delete ${this.title}`

    h3.innerText = this.title
    p.innerText = `by ${this.author} \n\n ${this.description}`

    del.addEventListener("click", this.deleteBook)

    div.appendChild(h3)
    div.appendChild(p)
    div.appendChild(del)

    return div
  }

  deleteBook() {
    event.preventDefault()
    // debugger
    const id = this.id

    fetch(`${url}/books/${id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
        }
    })
    .catch(() => console.log("error"))

    this.parentElement.remove()
  }  

}