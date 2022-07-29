class Book {

  constructor(title, author, description) {
    this.title = title
    this.author = author
    this.description = description
  }

  createBookDiv() {
    const div = document.createElement("div")

    const h3 = document.createElement("h3")
    const p = document.createElement("p")

    h3.innerText = this.title
    p.innerText = `by ${this.author} \n\n ${this.description}`

    
    div.appendChild(h3)
    div.appendChild(p)

    return div
  }

  deleteGenre() {
    event.preventDefault()
    const id = this.dataset.id

    fetch(`${url}/genres/${id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
        }
    })
    .catch(() => console.log("error"))
    this.parentElement.remove()
  }  

}