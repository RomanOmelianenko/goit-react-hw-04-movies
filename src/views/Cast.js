import React, { Component } from 'react';
import moviesAPI from '../services/movies-api';
import Notification from '../utils/Notification';
import Loader from '../utils/Loader';

class Cast extends Component {
    state = {
        cast: [],
        error: null,
        loading: false
    };

    componentDidMount() {
        this.setState({ loading: true });

        moviesAPI
            .fetchMoviesCast(this.props.match.params.movieId)
            .then(cast => this.setState({ cast }))
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
    };

    render() {

        const { cast, error, loading } = this.state;
        
        return (
            <>
                {error && <Notification message={`Whoops, something went wrong: ${error.status_message}`} />}

                {loading && <Loader/>}

                {cast && (
                    <ul>
                        {cast.map(actor => (
                            <li key={actor.credit_id}>
                                {actor.profile_path && (
                                    <img
                                            src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                                            alt={actor.name}
                                            width="100"
                                    />
                                )}
                                <p className="cast-name">{actor.name}</p>
                                <p className="cast-character">
                                Character: {actor.character}
                                </p>
                            </li>
                        ))}
                    </ul>
                )} 
            </>
        )
    };
};

export default Cast;