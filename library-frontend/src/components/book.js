class Book {

  static all = []

  constructor(id, title, author, description, genre_id) {
    this.id = id 
    this.title = title
    this.author = author
    this.description = description
    this.genre_id = genre_id
    Book.all.push(this)
  }

  static initBooks(array) {
    array.forEach(obj => {
      new Book(obj.id, obj.title, obj.author, obj.description, obj.genre_id)
    })
  }

  static delete(book) {
    // Book.all = Book.all.filter(b => b.id !== book.id )
    Book.all.splice(Book.all.indexOf(book), 1)
  }

  static createBookForm() {
    const form = document.createElement("form")
    form.innerHTML = `
      <input class='a' type='text' placeholder='hi'><br>
      <input class='a' type='text' placeholder='hi'><br>
      <textarea class='a'placeholder='hi'></textarea><br>
      <input class='a' type='submit' value='Add Book'>
      `
    form.addEventListener("submit", BookAdapter.newBook)
    return form
  }

  // static createBookForm2() {
  //   const form = document.createElement("form")
  
  //   form.append(
  //     this.titleInput(),
  //     this.authorInput(),
  //     this.descriptionInput(),
  //     this.submit()
  //     )

  //   form.addEventListener("submit", BookAdapter.newBook)
  //   return form
  // }

  static textInput(tagname, id, classname, placeholder) {
    const div = document.createElement("div")
    div.className = "form-input-div"

    const element = document.createElement(tagname)
    element.id = id
    element.className = classname
    element.placeholder = placeholder

    return element
  }

  // static formSubmitInput

  // static divMaker() {
  //   const formInputDiv = document.createElement("div")
  //   formInputDiv.className = "form-input-div"
  //   return formInputDiv
  // }

  static titleInput() {
    const obj = {classname: "input", id: "title", placeholder: "Title"}    
    return this.formInput("input", obj)
  }

  static authorInput() {
    const obj = {classname: "input", id: "author", placeholder: "Author"}
    return this.formInput("input", obj)
  }

  static descriptionInput() {
    const obj = {classname: "input", id: "description", placeholder: "Description"}
    return this.formInput("textarea", obj)
  }

  static submit() {
    const obj = {type: "submit", value: "Add Book"}
    return this.formInput("input", obj)
  }

  static formInput(tagname, obj={}) {
    const formInputDiv = document.createElement("div")
    formInputDiv.className = "form-input-div"

    const formInput = document.createElement(tagname)
    for(const key in obj) {
      if (key === "id") {
        formInput.id = obj[key]
      }
      if (key === "placeholder") {
        formInput.placeholder = obj[key]
      }
      if (key === "classname") {
        formInput.className = obj[key]
      }
      if (key === "type") {
        formInput.type = obj[key]
      }
      if (key === "value") {
        formInput.value = obj[key]
      }
      if (key === "className") {
        div.className = obj[key]
      }
      if (key === "innerHTML") {
        div.innerHTML = obj[key]
      }
    }  
    formInputDiv.append(formInput)
    return formInputDiv
  }

  genre() {
    return Genre.all.find(genre => this.genre_id === genre.id)
  }

  createBookDiv() {
    const div = document.createElement("div")
    div.className = "book-div"
    div.id = `book-${this.id}`

    div.append(
      this.bookTitle(), 
      this.bookAuthor(), 
      this.bookDescription(), 
      this.deleteButton()
      )

    return div
  }

  formInput(tagname, obj) {
    const formInput = document.createElement(tagname)
    for(const key in obj) {
      if (key === "className") {
        formInput.className = obj[key]
      }
      if (key === "innerHTML") {
        formInput.innerHTML = obj[key]
      }
    }  
    return formInput
  }

  bookTitle() {
    const obj = {innerHTML: this.title, className: "bold"}
    return this.formInput("div", obj)
  }

  bookAuthor() {
    const obj = {innerHTML: `by ${this.author}`, className: "bold"}
    return this.formInput("div", obj)
  }

  bookDescription() {
    const obj = {innerHTML: this.description}
    return this.formInput("p", obj)
  }

  deleteButton() {
    const button = document.createElement("button")
    button.className = "book-delete"
    button.innerHTML = "<i class='fa fa-trash'></i>"
    button.addEventListener("click", BookAdapter.deleteBook.bind(this))
    return button
  }
}