import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moviesAPI from '../services/movies-api';
import Notification from '../utils/Notification';
import Loader from '../utils/Loader';
import '../index.css';

class Cast extends Component {

    static propTypes = {
        cast: PropTypes.array,
        error: PropTypes.string,
        loading: PropTypes.bool
    };

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
                    <ul className="Cast">
                        {cast.map(actor => (
                            <li key={actor.credit_id}
                                className="CastList"
                            >
                                {actor.profile_path && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                                        alt={actor.name}
                                        width="150"
                                    />
                                )}
                                <p className="CastName">{actor.name}</p>
                                <p className="CastCharacter">
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