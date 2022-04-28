import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovie, newRating } from "../actions/movieActions";
import MovieDetail from "../components/moviedetail"
import { Glyphicon, Panel, ListGroup, ListGroupItem } from "react-bootstrap";
import { Image } from "react-bootstrap";
import PanelBody from "react-bootstrap/lib/PanelBody";

// support routing

const Movie = () => {
    const {movieId} = useParams();
    const selectedMovie = useSelector((state) => state.movie.selectedMovie);
    const dispatch = useDispatch();
    const [ratingDetails, setRatingDetails] = useState({
        movie: selectedMovie?.title,
        user: localStorage.getItem("username"),
        rating: 0,
        theReview: "",
    });

    const handleChange = (event) => {
        setRatingDetails({
            ...ratingDetails,
            [event.target.name]: event.target.value,
        });
        if(!ratingDetails.movie) {
            setRatingDetails({
                movie: selectedMovie?.title,
                user: localStorage.getItem("username"),
                rating: 0,
                theReview: "",
            });
        }
    };

    useEffect(() => {
        dispatch(fetchMovie(movieId));
    },
        [dispatch, movieId]);

    const ActorInfo = ({actors}) => {
        if(!actors) {
            return null;
        }
        return actors?.map((actor, i) => (
            <p key={i}>
                <b> {actor.actorName}</b>
                {actor.characterName}
            </p>
        ));
    };

    const ReviewInfo = ({ reviews }) => {
        if(!reviews)
        {
            return null;
        }
        return reviews?.map((review, i) => (
            <p key={i}>
                <b>{review.user}</b>
                {review.theReview}
                <Glyphicon glyph={"star"} /> {review.rating}
            </p>
        ));
    };

    return (
        <Panel>
            {!selectedMovie ? (
                <div>...LOADING</div>
            ) : (
                <>
                    <Panel.Heading>Movie Detail</Panel.Heading>
                    <Panel.Body>
                        <Image className="image" src={selectedMovie.imageUrl} thumbnail />
                    </Panel.Body>
                    <ListGroup>
                        <ListGroupItem>{selectedMovie.title}</ListGroupItem>
                        <ListGroupItem> <ActorInfo actors={selectedMovie.actors} />
                        </ListGroupItem>
                        <ListGroupItem>
                            <h4>
                                <Glyphicon glyph={"star"} />
                                {selectedMovie.avgRating}{" "}
                            </h4>
                        </ListGroupItem>
                    </ListGroup>
                    <Panel.Body>
                        <ReviewInfo reviews={selectedMovie.Reviews} />
                    </Panel.Body>
                    <form>
                        <label htmlFor="quote"> Review </label>
                        <input
                            name="quote"
                            onChange={handleChange}
                            value={ratingDetails.theReview}
                            type="text"
                            placeholder="Write a review for this movie"
                            />
                        <label> htmlFor="rating"> Rating </label>
                        <input
                            type="number"
                            placeholder="What do you rate this movie?"
                            min = "0"
                            max = "5"
                            name="rating"
                            value={ratingDetails.rating}
                            onChange={handleChange}
                            />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(newRating(ratingDetails, selectedMovie._id));
                                setRatingDetails({
                                    movie: selectedMovie?.title,
                                    user: localStorage.getItem("username"),
                                    theReview: "",
                                    rating: 0,
                                });
                            }}
                            > Submit Review
                        </button>
                    </form>
                </>
            )}
        </Panel>
    )
}

export default Movie;