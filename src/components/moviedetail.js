import React, { Component } from 'react';
import { fetchMovie } from "../actions/movieActions";
import {connect} from 'react-redux';
import {Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'
import { Image } from 'react-bootstrap';

class MovieDetail extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId));
        }
    }

    //when the user clicks submit button
    submit(){
        const {dispatch} = this.props;
        dispatch(submitReview(this.state.details));
    }

    render() {
        const DetailInfo = () => {
            if (!this.props.selectedMovie) {
                return <div>Loading....</div>
            }

            return (
                <Card>
                    <Card.Header>Movie Detail</Card.Header>
                    <Card.Body>
                        <Image className="image" src={this.props.selectedMovie.imageUrl} thumbnail />
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem>{this.props.selectedMovie.title}</ListGroupItem>
                        <ListGroupItem>
                            {this.props.selectedMovie.actors.map((actor, i) =>
                                <p key={i}>
                                    <b>{actor.actorName}</b> {actor.characterName}
                                </p>)}
                        </ListGroupItem>
                        <ListGroupItem><h4><BsStarFill/> {this.props.selectedMovie.avgRating}</h4></ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        {this.props.selectedMovie.reviews.map((review, i) =>
                            <p key={i}>
                                <b>{review.user}</b>&nbsp; {review.review}
                                &nbsp;  <BsStarFill /> {review.rating}
                            </p>
                        )}

                        //add form for user to submit review
                        <Form>
                            <Form.Group controlId="review">
                                <Form.Label>Review</Form.Label>
                                <Form.Control as="textarea" onChange={this.updateDetails} value={this.state.details.review} placeholder="Enter a review" />
                            </Form.Group>
                            <Form.Group>
                                <div key={'inline-radio'}>
                                    <Form.Label>Rating &nbsp;
                                        <Form.Check onChange={this.updateRating} inline label="1" name="rating" type='radio' value={1} />
                                        <Form.Check onChange={this.updateRating} inline label="2" name="rating" type="radio" value={2} />
                                        <Form.Check onChange={this.updateRating} inline label="3" name="rating" type="radio" value={3} />
                                        <Form.Check onChange={this.updateRating} inline label="4" name="rating" type="radio" value={4} />
                                        <Form.Check onChange={this.updateRating} inline label="5" name="rating" type="radio" value={5} />
                                        Stars </Form.Label>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <Button type="submit" onClick={this.submit}>
                                    Submit Review
                                </Button>
                            </Form.Group>
                        </Form>
                        //end form

                    </Card.Body>
                </Card>
            )
        }

        return (
            <DetailInfo />
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedMovie: state.movie.selectedMovie
    }
}

export default connect(mapStateToProps)(MovieDetail);

