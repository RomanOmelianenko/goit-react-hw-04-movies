import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moviesAPI from '../services/movies-api';
import Notification from '../utils/Notification';
import Loader from '../utils/Loader';

class Rewies extends Component {

    static propTypes = {
        reviews: PropTypes.array,
        error: PropTypes.string,
        loading: PropTypes.bool
    };

    state = {
        reviews: [],
        error: null,
        loading: false
    };

    componentDidMount() {
        this.setState({ loading: true });

        moviesAPI
            .fetchMoviesReviews(this.props.match.params.movieId)
            .then(reviews => this.setState({ reviews }))
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
    };

    render() {

        const { reviews, loading } = this.state;
        const { error } = this.state;
        
        return (
            <>
                {error && <Notification message={`Whoops, something went wrong: ${error.status_message}`} />}

                {loading && <Loader/>}

                {reviews.length > 0 ? (
                   <ul>
                        {reviews.map(review => (
                            <li key={review.id}>
                                <p className="AuthorName">Author: {review.author}</p>
                                <p>{review.content}</p>
                            </li>
                        ))}
                    </ul>
                    ) : (
                    <p className="Reviews">We don't have any reviews for this movie.</p>
                )}
            </>
        )
    };
};

export default Rewies;