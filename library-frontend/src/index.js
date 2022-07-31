// const url = "http://127.0.0.1:3000"
// const genreForm = document.getElementById("genre-form")

// genreForm.addEventListener("submit", Genre.newGenre)
// Genre.getGenres()

// const genreForm = document.getElementById("genre-form")
const genreAdapter = new GenreAdapter()
// genreForm.addEventListener("submit", genreAdapter.newGenre.bind(genreAdapter))
genreAdapter.fetchGenres()

