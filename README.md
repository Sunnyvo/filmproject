# User Stories

# Requirement

  [x] User can view a list of movies currently playing in theaters from The Movie Database.
        The Movie Database API
        Ensure you can hit the "Now Playing" endpoint in a browser. This shows the data we will be using from The Movies Database.
        Note: It's helpful to install the JSONView Chrome Extension to view the returned JSON more easily.
        Sample Request: https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed
  [x]  User can see a "now loading spinner" while the API request is being loaded. For testing, you may want to simulate slow loading by wrapping the fetch call in setTimeout.
  [x]  User can refresh the movie list.
  [x]  The app should look good on phone and tablet sizes.
  [x]  User can search for movies by title through a search bar.

# Optional
  [x]  Sort Movies by rating, popularity, release date (med).
  []  Add animation for the open/close. (low)
  []  Clicking on a movie poster should give you the high resolution version at a larger size in a lightbox. (med)
  []  Infinite scrolling (med)
  []  Change layouts on the fly (med)

Additional Requirements

  [x]  Each "movie" should be a separate component.

- The Movie Database API

- Check out The Movie Database documentation. In particular:

  []  The "Now Playing" endpoint.
  []  The "Top Rated" endpoint
  []  The movie poster is available by appending the returned poster_path to https://image.tmdb.org/t/p/w342.
  []  The low resolution movie poster is available by appending the returned poster_path to https://image.tmdb.org/t/p/w45
  []  The high resolution movie poster is available by appending the returned poster_path to
