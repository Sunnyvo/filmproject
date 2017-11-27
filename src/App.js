import React, { Component } from 'react';
import Sunny from './Sunny.png';
import './App.css';
import { Container } from 'bloomer';
import MovieList from './Movielist.jsx';
import "bulma/css/bulma.css";
import { Control, Input, Field, Icon, PanelIcon } from 'reactbulma';
import FaRefresh from 'react-icons/lib/fa/refresh';
import FaSearch from 'react-icons/lib/fa/search';

class App extends Component {

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: true,
      page: 1
    }
  }

  handleSearch =(event) => {
    let SearchList = this.state.movies;
    SearchList =
    SearchList.filter(function(item){
      return item.title.toLowerCase().search(
        event.toLowerCase()) !== -1;

      });
    this.setState(
      {
        itemsSearch: SearchList
      }
    );
  };




  async fetchMovie(page) {
    const test_url = `https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed&page=${page}`;
    const results = await fetch(test_url);
    const data = await results.json();

    this.setState({
      isLoading: true
    })

    await this.sleep(3000);

    return data.results;
  }

  async componentDidMount() {
    this.movieresult = await this.fetchMovie(this.state.page);
    this.setState({
      movies: this.movieresult,
      isLoading: false,
    })
  }

  async hand1leLoadMore() {
    const page = this.state.page + 1;
    const newMovies = await this.fetchMovie(page);
    this.movieresult = this.movieresult.concat(newMovies);
    this.setState({
      page,
      movies: this.movieresult,
      isLoading: false,
    })
  }

  render() {

    const handleReFresh = () => {
      this.setState({
        movies: [],
        isLoading: true,
        page: 1,

      });
      this.componentDidMount()
    };


    //conditional render
    let content;
    if (this.state.isLoading) {
      content = <h3>Loading...</h3>
    }else if(this.state.itemsSearch){
      content = <MovieList movies={this.state.itemsSearch} isLoading={this.state.isLoading}
      handleLoadMore={this.hand1leLoadMore.bind(this)}></MovieList>

    }else {
      content = <MovieList movies={this.state.movies} isLoading={this.state.isLoading}
        handleLoadMore={this.hand1leLoadMore.bind(this)}></MovieList>
    }

    return (
      <Container>
        <div className="App">
          <header className="App-header">
            <img src={Sunny} className="App-logo" alt="logo" />
            <h1 className="App-title">Sunny Cinema</h1>
          </header>
          <Container className="filter-list">
            <a onClick={handleReFresh}> <FaRefresh size={50} style={{ marginBottom: "15px" }} /> </a>
            <Control hasIconsLeft className="Search-Control">
              <Input small type="text" placeholder="Search" onChange = {e => this.handleSearch(e.target.value)}/>
              <Icon small left>
                <FaSearch/>
              </Icon>
            </Control>
          </Container>

          <Container>
            {content}
          </Container>
        </div>
      </Container>
    );
  }
}

export default App;
