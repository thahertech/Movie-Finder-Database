// API key for The Movie Database
const apiKey = "04c35731a5ee918f014970082a0088b1";

// URLs for different API endpoints
const URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const imgURL = "https://image.tmdb.org/t/p/w1280";
const searchURL =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

// DOM elements
const form = document.getElementById("search-form");
const query = document.getElementById("query");
const root = document.getElementById("root");

// Array to store movie data and pagination variables
let movies = [],
    page = 1,
    inSearchPage = false;

// Function to fetch JSON data from the provided URL
async function fetchData(URL) {
    try {
        const data = await fetch(URL).then((res) => res.json());
        return data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

// Function to fetch and display results based on the given URL
const fetchAndShowResults = async (URL) => {
    const data = await fetchData(URL);
    data && showResults(data.results);
};

// Function to get movies from a specific page
const getSpecificPage = (page) => {
    const URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${page}`;
    fetchAndShowResults(URL);
};

// Template for a movie card
const movieCard = (movie) =>
    `<div class="col">
          <div class="card">
            <a class="card-media" href="./img-01.jpeg">
              <img src="${movie.poster_path}" alt="PUBG Mobile" width="100%" />
            </a>

            <div class="card-content">
              <div class="card-cont-header">
                <div class="cont-left">
                  <h3 style="font-weight: 600">${movie.original_title}</h3>
                  <span style="color: #12efec">${movie.release_date}</span>
                </div>
                <div class="cont-right">
                  <a href="${movie.poster_path}" target="_blank" class="SearchBtn">See image</a>
                </div>
              </div>

              <div class="describe">
                ${movie.overview}
              </div>
            </div>
          </div>
        </div>`;

// Function to display results on the webpage
const showResults = (items) => {
    let content = !inSearchPage ? root.innerHTML : "";
    if (items && items.length > 0) {
        items.map((item) => {
            let { poster_path, original_title, release_date, overview } = item;

            // Check if poster_path is available, otherwise use a default image
            if (poster_path) {
                poster_path = imgURL + poster_path;
            } else {
                poster_path = "./img-01.jpeg";
            }

            // Truncate long titles and provide default values for missing data
            if (original_title.length > 15) {
                original_title = original_title.slice(0, 15) + "...";
            }

            if (!overview) {
                overview = "No overview yet...";
            }

            if (!release_date) {
                release_date = "No release date";
            }

            const movieItem = {
                poster_path,
                original_title,
                release_date,
                overview,
            };

            content += movieCard(movieItem);
        });
    } else {
        content += "<p>Something went wrong!</p>";
    }

    root.innerHTML = content;
};

// Function to handle the "Load More" button click
const handleLoadMore = () => {
    getSpecificPage(++page);
};

// Function to de