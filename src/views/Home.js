import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import moviesAPI from '../services/movies-api';
import Notification from '../utils/Notification';
import Loader from '../utils/Loader';

import { success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

class Home extends Component {
    state = {
        trending: [],
        error: null,
        loading: false
    };

    componentDidMount() {
        this.setState({ loading: true }); 
        const {trending} = this.state;

        moviesAPI
            .fetchMoviesTranding(this.props.movieId)
            .then(trending => this.setState({ trending }))
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
        
        if (trending !== []) {
            success({
                title: 'Success',
                text: 'Images uploaded!'
            });
        } else {
            error({
                title: 'Error',
                text: 'Something went wrong!'
            });
        }
    };

    render() {
        const { trending, error, loading } = this.state; 
        const { match } = this.props;

        return (
            <>
                {error && <Notification message={`Whoops, something went wrong: ${error.status_message}`} />}

                {loading && <Loader/>}

                {trending.length > 0 && (
                    <>
                    <h1 className="Home">Trending today</h1>
                    <ul>
                        {trending.map(movie =>
                            <li key={movie.id}>
                                <NavLink
                                    to={`${match.url}movies/${movie.id}`}
                                >
                                    {movie.title}
                                </NavLink>
                            </li>)}
                        </ul>
                    </>
                )} 
            </>
        )
    };
};

export default Home;