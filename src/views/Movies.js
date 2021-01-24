import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getQueryParams from '../utils/getQueryParams';
import SearchBox from '../components/SearchBox';
import moviesAPI from '../services/movies-api';
import Notification from '../utils/Notification';
import Loader from '../utils/Loader'; 

class Movies extends Component {
    state = {
        searchMovies: [],
        error: null,
        loading: false
    };

    componentDidMount() {
        
        const { query } = getQueryParams(this.props.location.search);
       
        if (query) {
           
            this.fetchMovies(query);
        };
    };

    componentDidUpdate(prevProps, prevState) {

        const {query: prevQuery} = getQueryParams(prevProps.location.search);
        const { query: nextQuery } = getQueryParams(this.props.location.search);

        if (prevQuery !== nextQuery) {
           
            this.fetchMovies(nextQuery);
        }
    };

    fetchMovies = query => {
        this.setState({ loading: true });

        moviesAPI
            .fetchMoviesWithQuery(query)
            .then(movies => this.setState({ searchMovies: movies }))
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
    };

    handleChangeQuery = query => {
        
        this.props.history.push({
            ...this.props.location,                   
            search: `query=${query}`                  
        })
    };

    render() {

        const { searchMovies, error, loading } = this.state; 

        return (
            <>
                <SearchBox onSubmit={this.handleChangeQuery} />

                {error && <Notification message={`Whoops, something went wrong: ${error.status_message}`} />}

                {loading && <Loader/>}
                
                {searchMovies.length > 0 && (
                    <ul>
                        {searchMovies.map(movie =>
                            <li key={movie.id}>
                                {/* <Link to={`${this.props.match.url}/${movie.id}`}>{movie.title}</Link> */}
                                <Link to={{
                                    pathname: `${this.props.match.url}/${movie.id}`,
                                    state: { from: this.props.location }
                                }}
                                >
                                    {movie.title}
                                </Link>
                            </li>)}
                    </ul>  
                )}
            </>
        );
    };
};

export default Movies;