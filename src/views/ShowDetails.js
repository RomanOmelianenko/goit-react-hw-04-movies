import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cast from './Cast';
import Reviews from './Rewies';
import moviesAPI from '../services/movies-api';
import RoutesConfig from '../routes';
import Notification from '../utils/Notification';
import Loader from '../utils/Loader';
import '../index.css';

class ShowDetails extends Component {

    static propTypes = {
        showDetails: PropTypes.array,
        loading: PropTypes.bool
    };

    state = {
        showDetails: null,
        loading: false
    };

    componentDidMount() {
        this.setState({ loading: true });

        moviesAPI
            .fetchMoviesDetails(this.props.match.params.movieId)
            .then(showDetails => this.setState({ showDetails }))
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
    };

    handleGoBack = () => {
       
        const { state } = this.props.location;
        // console.log(this.props.location);
        if (state && state.from) {
            
            return this.props.history.push(state.from)
        };

        this.props.history.push(RoutesConfig.movies);
        this.props.history.push(RoutesConfig.home);
    };

    render() {

        const { showDetails, error, loading } = this.state; 
        const { match } = this.props;

        return (
            <>
                <button
                    to="/"
                    type="button"
                    onClick={this.handleGoBack}
                    className="Button">
                    &lArr; Go back
                </button>
                <br />
                    
                {error && <Notification message={`Whoops, something went wrong: ${error.status_message}`} />}

                {loading && <Loader/>}

                {showDetails && (
                    <>  
                        <div className="About">
                            <img className="Image"
                                src={`https://image.tmdb.org/t/p/w500/${showDetails.poster_path}`}
                                alt=""
                                width="200"
                            />
                            <div className="Details">
                                <h2>{showDetails.title} {showDetails.release_date.slice(0, 4)}</h2>
                                <p>User Score: {showDetails.vote_average}% </p>
                                <h3>Overview</h3>
                                <p>{showDetails.overview}</p>
                                <h3>Genres</h3>
                                <ul>
                                    {showDetails.genres.map(genre => (
                                        <li key={genre.id}>{genre.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                            <div className="Additional-information" >   
                                <p>Additional information</p>
                                <ul>
                                    <li>
                                    <NavLink
                                        to={`${match.url}/cast`}
                                        className="Navigation-link"
                                        activeClassName="Navigation-link-active"
                                    >
                                        Cast
                                    </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to={`${match.url}/reviews`} 
                                            className="Navigation-link"
                                            activeClassName="Navigation-link-active"
                                        >
                                            Reviews
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        
                            <Switch>
                                <Route path={RoutesConfig.cast} component={Cast} />
                                {/* <Route path={`${match.path}/cast`} component={Cast} /> */}
                            
                                <Route path={RoutesConfig.reviews} component={Reviews} />
                                {/* <Route path={`${match.path}/reviews`} component={Reviews} /> */}
                            </Switch>
                        </>
                    )}
            </>
        )
    };
};

// const ShowDetails = ({ match }) => (
//     <h1>Show Details {match.params.movieId}</h1>
// );

export default ShowDetails;