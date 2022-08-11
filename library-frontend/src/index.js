const genreForm = document.getElementById("genre-form")
genreForm.addEventListener("submit", GenreAdapter.newGenre)

GenreAdapter.fetchGenres()
