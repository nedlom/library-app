const url = "http://127.0.0.1:3000"

function getGenres() {
  fetch(`${url}/genres`)
  .then(resp => resp.json())
  .then(json => console.log(json))
}

getGenres()