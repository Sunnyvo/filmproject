import React, { Component } from 'react'
import { Box, Title,Content } from 'bloomer';
import { Grid, Row, Col } from 'react-flexbox-grid';
import "./MovieCard.css"
export default class MovieCard extends Component {
	render() {
		const imgLink = `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${this.props.movie.poster_path}`;
		const overViewFull = this.props.movie.overview;
		let overView = overViewFull;
		if (overView.length > 140){
			overView = overView.slice(0,140);
			overView =overView.concat("...");
		}

		return (
			<Box style={{ marginBottom: "10px" }} className="MovieCard-Box">
				<Title isSize={6} >{this.props.movie.title}</Title>
				<Grid fluid>
					<Row>
						<Col  xs={12} sm={6} >
							<img src={imgLink} alt="logo" />
						</Col>
						<Col xs={12} sm={6}>
							<Content isSize={"small"} className="MovieCard-Content" >
								{overView}
							</Content>
						</Col>
					</Row>
				</Grid>
			</Box>
		)
	}
}
