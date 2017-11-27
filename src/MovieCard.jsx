import React, { Component } from "react";
import { Box, Title, Content } from "bloomer";
import { Grid, Row, Col } from "react-flexbox-grid";
import "./MovieCard.css";
import StarRatingComponent from "react-star-rating-component";
import "./Responsive.css"
export default class MovieCard extends Component {

  render() {
    const imgLink = `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${
      this.props.movie.poster_path
    }`;
    const overViewFull = this.props.movie.overview;
    let overView = overViewFull;
    if (overView.length > 140) {
      overView = overView.slice(0, 140);
      overView = overView.concat("...");
    }
		let rating = this.props.movie.vote_average;
		let release = this.props.movie.release_date;
    return (
      <Box style={{ marginBottom: "10px" }} className="MovieCard-Box">
        <Title isSize={6}>{this.props.movie.title}</Title>
        <Grid fluid>
          <Row>
            <Col xs={12} sm={6}>
              <img src={imgLink} alt="logo" className="MovieCard-Img" />
            </Col>
            <Col xs={12} sm={6}>
              <Content isSize={"small"} className="MovieCard-Content">
                {overView}
              </Content>
            </Col>
          </Row>
          <Row>
            <StarRatingComponent name="rate1" starCount={10} value={rating} />
							<p> <strong> Release: </strong>{release} </p>
          </Row>
        </Grid>
      </Box>
    );
  }
}
