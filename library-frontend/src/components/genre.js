class Genre {

  static all = []

  constructor(id, name, books) {
    this.id = id
    this.name = name
    this.books = this.getBooks(books)
    Genre.all.push(this)
  }

  getBooks(books) {
    if (books) {
      return books.map(book => new Book(
        book.id, 
        book.title, 
        book.author, 
        book.description, 
        book.genre_id
      ))
    } else {
        return []
    }
  }

  static renderGenres() {
    this.all.forEach(genre => genre.renderGenre())
  }

  renderGenre() {
    const genreContainer = document.getElementById("genre-container")
    const genreDiv = this.createGenreDiv()
    genreContainer.append(genreDiv)
  }

  createGenreDiv() {
    const div = document.createElement("div")
    div.className = "genre-div"
    div.id = this.id

    div.append(this.nameAndDelete(), this.addBookButton())

    const bookDivs = this.bookTags()
    bookDivs.forEach(book => div.append(book))
    
    return div
  }

  nameAndDelete() {
    const div = document.createElement("div")
    div.className = "parent"
    div.append(this.nameTag(), this.deleteButton())
    return div
  }

  nameTag() {
    const div = document.createElement("div")
    div.className = "child"
    div.innerHTML = this.name
    return div
  }

  deleteButton() {
    const button = document.createElement("button")
    button.className = "child"
    button.innerHTML = `Delete ${this.name}`
    button.addEventListener("click", genreAdapter.deleteGenre.bind(this))
    return button
  }

  addBookButton() {
    const buttonDiv = document.createElement("div")
    // buttonDiv.id = "add-book-button-container"
    buttonDiv.id = `genre-id-${this.id}`
    buttonDiv.className = "add-book-to-genre"

    const button = document.createElement("button")
    button.id = `button${this.id}`
    button.innerHTML = `Add Book To ${this.name}` 
    // button.className = "add-book-to-genre"

    buttonDiv.append(button)

    button.addEventListener("click", this.removeBtnGetForm.bind(this))
    
    return buttonDiv
  }

  bookTags() {
    return this.books.map(book => book.createBookDiv())
  }

  removeBtnGetForm() {
    this.hideNewBookButton()
    this.getBookForm()
    // return Book.renderBookForm()
  }

  hideNewBookButton() {
    // debugger

    // const id = this.id
    const div = document.getElementById(`button${this.id}`)

    // const div = document.getElementById("add-book-to-genre")
    if (div.style.display === "none") {
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
  }

  getBookForm() {
    // debugger
    
    // const div = document.getElementById(this.id)
    
    const div = document.getElementById(`genre-id-${this.id}`)

    // const bttnContainer = div.getElementById("add-book-button-container")
    // const div = document.getElementById("add-book-button-container")
    div.append(Book.createBookForm(this.id))
    // bttnContainer.append(Book.createBookForm())
  }

  // renderGenre2() {
  //   const genreList = document.getElementById("genre-list")

    // const delBttn = document.createElement("button")
    // delBttn.innerText = "pretend this is a trashcan"
    // delBttn.className = "delete"
    // delBttn.dataset.id = this.id

    // const li = document.createElement("li")
    // const div = document.createElement("div")
    // div.id = "li-title"
    // div.innerText = this.name
    // li.appendChild(div)
    // li.id = this.id
    // // li.innerText = this.name

    // const bookDiv = document.createElement("div")
    // bookDiv.innerText = "BOOK DIV"
    // bookDiv.id = "myDiv"
    // bookDiv.style.display = "none"

    // const bookBttn = document.createElement("button")
    // bookBttn.innerText = "Add Book"
    // bookBttn.addEventListener("click", this.myFunction)
    // const bookForm = Book.renderBookForm()
    // li.appendChild(bookBttn)
    // li.appendChild(bookDiv)

    // if (this.books !== []) {
    //   this.books.forEach(obj => {

    //     const book = new Book(obj.id, obj.title, obj.author, obj.description)
    //     const bookDiv = book.createBookDiv()
    //     li.appendChild(bookDiv)
    //   })
    // }

    // li.appendChild(delBttn)

    // delBttn.addEventListener("click", this.deleteGenre)

  //   delBttn.addEventListener("click", genreAdapter.deleteGenre.bind(this))

  //   genreList.appendChild(li)
  // }

  // myFunction() {

  //   const myDiv = document.getElementById("myDiv")

    // debugger
  //   if (myDiv.style.display === "none") {
  //     myDiv.style.display = "block";
  //   } else {
  //     myDiv.style.display = "none";
  //   }

  //   myDiv.innerHTML = `<div id="book-form-container">
  //   <form id="book-form">
  //     <label>Title</label><br>
  //     <input type="text" id="title"><br>
  //     <label>Author</label><br>
  //     <input type="text" id="author"><br>
  //     <label>Description</label><br>
  //     <textarea type="text" id="description"></textarea><br>
  //     <input type="submit" value="Add Book">
  //   </form>
  // </div>`

  // debugger
  // }

  // static newGenre() {
  //   event.preventDefault()
  //   fetch(`${url}/genres`, {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       name: document.getElementById('genre-name').value
  //     })
  //   })
  //   .then(resp => resp.json())
  //   .then(json => {
  //     const genre = new Genre(json.id, json.name, json.books)
  //     genre.renderGenre()
     
  //   })
  //   this.reset()
  // }

  // deleteGenre() {
  //   event.preventDefault()
  //   const id = this.dataset.id

  //   fetch(`${url}/genres/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //         "Content-Type": "application/json"
  //       }
  //   })
  //   .catch(() => console.log("error"))
  //   this.parentElement.remove()
  // }  
    
}