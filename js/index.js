$(document).ready(() => {
  $('#searchForm').on('submit',(event) => {
    let searchText = ($('#searchText').val());
    searchResults(searchText);
    event.preventDefault();
  });
});

function searchResults(searchText) {
  console.log('search: ', searchText);
  // API key is being imported from the file: "apiKeyFile.js"
  axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${searchText}`)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}