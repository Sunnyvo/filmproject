import React, { Component } from "react";
import Sunny from "./Sunny.png";
import "./App.css";
import { Container } from "bloomer";
import MovieList from "./Movielist.jsx";
import "bulma/css/bulma.css";
import { Control, Input, Icon } from "reactbulma";
import FaRefresh from "react-icons/lib/fa/refresh";
import FaSearch from "react-icons/lib/fa/search";
import FaStar from "react-icons/lib/fa/star";
import FaEye from "react-icons/lib/fa/eye";
import FaCertificate from "react-icons/lib/fa/certificate";
import "./Responsive.css";

class App extends Component {
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: true,
      page: 1,
      endPoint: "now_playing"
    };
  }

  handleSearch = event => {
    let SearchList = this.state.movies;
    SearchList = SearchList.filter(function(item) {
      return item.title.toLowerCase().search(event.toLowerCase()) !== -1;
    });
    this.setState({
      itemsSearch: SearchList
    });
  };

  async fetchMovie(page, endPoint) {
    const test_url = `https://api.themoviedb.org/3/movie/${
      endPoint
    }?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed&page=${page}`;
    const results = await fetch(test_url);
    const data = await results.json();

    this.setState({
      isLoading: true
    });

    await this.sleep(3000);

    return data.results;
  }

  async componentDidMount() {
    this.movieresult = await this.fetchMovie(
      this.state.page,
      this.state.endPoint
    );
    this.setState({
      movies: this.movieresult,
      isLoading: false,
      endPoint: "now_playing"
    });
  }

  async loadMovieEndPoint(endPoint) {
    this.movieresult = await this.fetchMovie(this.state.page, endPoint);
    this.setState({
      movies: this.movieresult,
      isLoading: false,
      endPoint: this.state.endPoint
    });
  }

  async hand1leLoadMore() {
    const page = this.state.page + 1;
    const newMovies = await this.fetchMovie(page,this.state.endPoint);
    this.movieresult = this.movieresult.concat(newMovies);
    this.setState({
      page,
      movies: this.movieresult,
      isLoading: false,
      endPoint: this.state.endPoint
    });
  }

  render() {
    //handle refresh page
    const handleReFresh = () => {
      this.setState({
        movies: [],
        isLoading: true,
        page: 1,
        endPoint: this.state.endPoint
      });
      this.loadMovieEndPoint(this.state.endPoint);
    };
    //handle top rating
    const handleTopRating = () => {
      this.setState({
        movies: [],
        isLoading: true,
        page: 1,
        endPoint: "top_rated"
      });
      this.loadMovieEndPoint("top_rated");
    };
    const handleTopPopular = () => {
      this.setState({
        movies: [],
        isLoading: true,
        page: 1,
        endPoint: "popular"
      });
      this.loadMovieEndPoint("popular");
    };

    const handleTopLatest = () => {
      this.setState({
        movies: [],
        isLoading: true,
        page: 1,
        endPoint: "latest"
      });
      this.loadMovieEndPoint("latest");
    };
    //conditional render
    let content;
    if (this.state.isLoading) {
      content =  <h3>Loading...</h3>;
    } else if (this.state.itemsSearch) {
      content = (
        <MovieList
          movies={this.state.itemsSearch}
          isLoading={this.state.isLoading}
          handleLoadMore={this.hand1leLoadMore.bind(this)}
        />
      );
    } else {
      content = (
        <MovieList
          movies={this.state.movies}
          isLoading={this.state.isLoading}
          handleLoadMore={this.hand1leLoadMore.bind(this)}
        />
      );
    }

    return (
      <Container>
        <div className="App">
          <header className="App-header">
            <img src={Sunny} className="App-logo" alt="logo" />
            <h1 className="App-title">Sunny Cinema</h1>
          </header>
          <Container className="filter-list">
            <a href="#" onClick={handleReFresh} className="">
              <FaRefresh size={50} className="App-ReFresh" />
            </a>
            <Control hasIconsLeft className="Search-Control">
              <div className="App-Search">
                <Input
                  className="App-InputSearh"
                  small
                  type="text"
                  placeholder="Search"
                  onChange={e => this.handleSearch(e.target.value)}
                />
                <Icon small left>
                  <FaSearch />
                </Icon>
              </div>
              <a href="#" onClick={handleTopRating} className="App-Star">
                <FaStar size={20}  /> Top Rate
              </a>

              <a href="#" onClick={handleTopPopular} className="App-Eye">
                <FaEye size={20}  /> Popular
              </a>

              <a href="#" onClick={handleTopLatest} className="App-Latest">
                <FaCertificate size={20}  /> Latest
              </a>

            </Control>
          </Container>
          <Container className="App-ContentContainer">{content}</Container>
        </div>
      </Container>
    );
  }
}

export default App;
