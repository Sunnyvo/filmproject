//import request URL
import Request from './http/Request.jsx';

//import from component
import MovieList from "./components/Movielist.jsx";
import Navigation from "./components/Navigation";

//import css
import "bulma/css/bulma.css";
import "./css/Responsive.css";
import "./css/App.css";

//import from library
import { Control, Input, Icon } from "reactbulma";
import FaRefresh from "react-icons/lib/fa/refresh";
import FaSearch from "react-icons/lib/fa/search";
import FaStar from "react-icons/lib/fa/star";
import FaEye from "react-icons/lib/fa/eye";
import FaCertificate from "react-icons/lib/fa/certificate";
import React, { Component } from "react";
import { Container } from "bloomer";

class App extends Component {
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  constructor(props) {
    super(props);
    //the best way
    this.handleTopLatest  = this.handleTopLatest.bind(this);
    this.handleTopPopular = this.handleTopPopular.bind(this);
    this.handleTopRating  = this.handleTopRating.bind(this);
    this.state = {
      movies: [],
      isLoading: true,
      page: 1,
      endPoint: "now_playing",


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
    this.movieresult = await this.fetchMovie(this.state.page, endPoint).catch((error) => {
      alert(error);
    });
    this.setState({
      movies: this.movieresult,
      isLoading: false,
      endPoint: this.state.endPoint
    });
  }

  async hand1leLoadMore() {
    const page = this.state.page + 1;
    const newMovies = await this.fetchMovie(page,this.state.endPoint).catch((error) => {
      alert(error);
    });
    this.movieresult = this.movieresult.concat(newMovies);
    this.setState({
      page,
      movies: this.movieresult,
      isLoading: false,
      endPoint: this.state.endPoint
    });
  }
  async HandleSetState(end1Point){
    this.setState({
        movies: [],
        isLoading: true,
        page: 1,
        endPoint: end1Point
      });
  }
      //handle refresh page
  async handleReFresh () {
      await this.HandleSetState( this.state.endPoint).catch((error) => {
      alert(error);
    });
      await this.loadMovieEndPoint( this.state.endPoint).catch((error) => {
      alert(error);
    });
    };
    //handle top rating
    async handleTopRating () {
      await this.HandleSetState("top_rated").catch((error) => {
      alert(error);
    });
      await this.loadMovieEndPoint(this.state.endPoint).catch((error) => {
      alert(error);
    });
    };
    async handleTopPopular ()  {
      await this.HandleSetState("popular").catch((error) => {
      alert(error);
    });
      await this.loadMovieEndPoint(this.state.endPoint).catch((error) => {
      alert(error);
    });
    };

    async handleTopLatest () {
      await this.HandleSetState("upcoming").catch((error) => {
      alert(error);
    });
      await this.loadMovieEndPoint(this.state.endPoint).catch((error) => {
      alert(error);
    });
    };
//////////////////////////////////////////////////////////////
    // the better way
    //handleTopLatest  = () => {this.handleTopLatest()};
    //handleTopPopular = () => {this.handleTopLatest()};
    //handleTopRating  = () => {this.handleTopRating()}
//////////////////////////////////////////////////////////////
    render() {

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
    const navigation = (

      <Navigation
//////////////////////////////////////////////////////////////////
       // the best way
        hand1leTopLatest  = {this.handleTopLatest}
        hand1leTopPopular = {this.handleTopPopular}
        hand1leTopRating  = {this.handleTopRating}
//////////////////////////////////////////////////////////////////
       // the better way
       // hand1leTopLatest  = {this.handleTopLatest}
       // hand1leTopPopular = {this.handleTopPopular}
       // hand1leTopRating  = {this.handleTopRating}
//////////////////////////////////////////////////////////////////
       // the easiest way
       // hand1leTopLatest  = {() => this.hand1leTopLatest()}  or { this.hand1leTopLatest.bind(this)}
       // hand1leTopRating  = {() => this.handleTopRating()  }
       // hand1leTopPopular = {() => this.handleTopPopular() }
      />
//////////////////////////////////////////////////////////////////
    )
    return (
      <Container>
        <div className="App">
          <header className="App-header">
             {navigation}
          </header>
          <Container className="filter-list">
            <a href="#" onClick= {() => this.handleReFresh()} className="">
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
            </Control>
          </Container>
          <Container className="App-ContentContainer">{content}</Container>
        </div>
      </Container>
    );
  }
}

export default App;
