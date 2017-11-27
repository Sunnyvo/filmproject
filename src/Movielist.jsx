import React, { Component } from 'react';
import MovieCard from './MovieCard';
import { Button } from 'bloomer';
import { Grid, Row, Col } from 'react-flexbox-grid';
import "./MovieList.css";

export default class MovieList extends Component {
	render() {
		const { movies, handleLoadMore, isLoading } = this.props;
		const isLoadingMore = isLoading ? 'isLoading' : 'info';
		return (

			<div>
				<Grid fluid>
					<Row className="MovieList-Row">
						{movies.map((movie, index) =>
							<Col sm={3} xs={12} className="MovieList-Col">
								<MovieCard movie={movie} />
							</Col>
						)}
					</Row>
				</Grid>
				<Button isColor={isLoadingMore} isOutlined onClick={(e) => handleLoadMore(e)}>Load more plz !</Button>
			</div>
		)
	}
}
