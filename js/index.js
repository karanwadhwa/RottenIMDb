$(document).ready(() => {
  $('#searchForm').on('submit',(event) => {
    let searchText = ($('#searchText').val());
    getSearch(searchText);
    event.preventDefault();
  });
  $('#home-results').on('load', getDiscoverMovies());
});

function getDiscoverMovies(){
  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc`)
    .then((response) => {
      let results = response.data.results;
      console.log(results);
      let output = `
      <div class="flex">
      <h3>Discover</h3>
      <ul class="nav nav-pills">
        <li class="active"><a href="#" id='discover-movies'>Movies</a></li>
        <li><a onclick='getDiscoverTV()' href="#" id='discover-tv'>TV Shows</a></li>
      </ul>
    </div>

      `;
      $.each(results, (index, result) => {
        output += `
          <div class="col col-md-6 item">
          <div class="card horizontal">
            <div class="card-image">
              <img src="https://image.tmdb.org/t/p/w500${result.poster_path}">
            </div>
            <div class="card-stacked info">
              <div class="card-content">
                <p class='card-title flex'>
                  <a class='title'>${result.name || result.title}</a>
                  <span class='vote_average'>${result.vote_average}
                    <i class="fa fa-star" aria-hidden="true"></i>
                  </span>
                </p>
                <p class='card-meta flex'>
                  <span class='release_date'>
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                    ${result.release_date || result.first_air_date}
                  </span>
                </p>
                <p class="card-overview">${result.overview || ''}</p>
                <p class='card-footer'>
                  <a href="#" class="btn btn-primary info-btn">More Info</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        `;
      });
      $('#home-results').html(output);
    })
    .catch((err) =>{
      console.log(err);
    });
}

function getDiscoverTV(){
  axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc`)
    .then((response) => {
      let results = response.data.results;
      console.log(results);
      let output = `
      <div class="flex">
      <h3>Discover</h3>
      <ul class="nav nav-pills">
        <li><a onclick='getDiscoverMovies()' href="#" id='discover-movies'>Movies</a></li>
        <li class='active'><a href="#" id='discover-tv'>TV Shows</a></li>
      </ul>
    </div>

      `;
      $.each(results, (index, result) => {
        output += `
          <div class="col col-md-6 item">
          <div class="card horizontal">
            <div class="card-image">
              <img src="https://image.tmdb.org/t/p/w500${result.poster_path}">
            </div>
            <div class="card-stacked info">
              <div class="card-content">
                <p class='card-title flex'>
                  <a class='title'>${result.name || result.title}</a>
                  <span class='vote_average'>${result.vote_average}
                    <i class="fa fa-star" aria-hidden="true"></i>
                  </span>
                </p>
                <p class='card-meta flex'>
                  <span class='release_date'>
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                    ${result.release_date || result.first_air_date}
                  </span>
                </p>
                <p class="card-overview">${result.overview || ''}</p>
                <p class='card-footer'>
                  <a href="#" class="btn btn-primary info-btn">More Info</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        `;
      });
      $('#home-results').html(output);
    })
    .catch((err) =>{
      console.log(err);
    });
}

function getSearch(searchText) {
  console.log('search: ', searchText);
  // API key is being imported from the file: "apiKeyFile.js"
  axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${searchText}`)
    .then((response) => {
      let results = response.data.results;
      let output = `<h4>Search Results</h4>`;
      console.log(results);
      $.each(results, (index, result) => {
        output += `
        <div class="col col-md-6 item">
        <div class="card horizontal">
          <div class="card-image">
            <img src="https://image.tmdb.org/t/p/w500${result.poster_path}">
          </div>
          <div class="card-stacked info">
            <div class="card-content">
              <p class='card-title flex'>
                <a class='title'>${result.name || result.title}</a>
                <span class='vote_average'>${result.vote_average}
                  <i class="fa fa-star" aria-hidden="true"></i>
                </span>
              </p>
              <p class='card-meta flex'>
                <span class='release_date'>
                  <i class="fa fa-calendar" aria-hidden="true"></i>
                  ${result.release_date ||  result.first_air_date}
                </span>
              </p>
              <p class="card-overview">${result.overview || ''}</p>
              <p class='card-footer'>
                <a href="#" class="btn btn-primary info-btn">More Info</a>
              </p>
            </div>
          </div>
        </div>
      </div>
        `;
      });

      $('#home-results').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

/* function cutString(string, charsToCutTo){
    console.log('parsed string: ', string)
     if(string.length>charsToCutTo){
      var strShort = "";
      for(i = 0; i < charsToCutTo; i++){
        strShort += string[i];
      }
      return strShort;
     }
} */

