$(document).ready(() => {
  $('#searchForm').on('submit',(event) => {
    let searchText = ($('#searchText').val());
    getSearch(searchText);
    event.preventDefault();
  });
  $('#home-results').on('load', getDiscoverMovies());
});

const over = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique illo illum officia rem qui, tempore ex nam sit? Quibusdam similique obcaecati ad expedita rerum non fugiat ullam unde doloremque nulla sit amet consectetur, adipisicing elit.";

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
        let overview = result.overview || '';
        overview = truncate(overview, 250);
        output += `
          <div class="col col-md-6 item">
          <div class="card horizontal">
            <div class="card-image">
              <picture>
                <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2${result.poster_path}">
              </picture>
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
                <p class="card-overview">${overview || ''}</p>
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
        let overview = result.overview;
        overview = truncate(overview, 250);
        output += `
        <div class="col col-md-6 item">
        <div class="card horizontal">
          <div class="card-image">
            <picture>
              <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2${result.poster_path}">
            </picture>
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
              <p class="card-overview">${overview || ''}</p>
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
      let output = `
      <h4>Search Results</h4>
      <p> Your Search Yielded ${results.length} Results</p>
      `;
      console.log(results);
      $.each(results, (index, result) => {
        let overview = result.overview || '';
        overview = truncate(overview, 250);
        output += `
        <div class="col col-md-6 item">
        <div class="card horizontal">
          <div class="card-image">
            <picture>
              <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2${result.poster_path}">
            </picture>
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
              <p class="card-overview">${overview || ''}</p>
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

function truncate(str, len = 25){
  if (str.length > len && str.length > 0) {
          var new_str = str + " ";
          new_str = str.substr(0, len);
          new_str = str.substr(0, new_str.lastIndexOf(" "));
          new_str = (new_str.length > 0) ? new_str : str.substr(0, len);
          return new_str + '...';
      }
      return str;
}