import React from 'react';
import { NavLink } from 'react-router-dom';
import routesConfig from '../routes';

const Navigation = () => (
    <ul className="Nav-list">
        <li className="Nav-item">
            <NavLink
                to={routesConfig.home}
                exact
                className="Navigation-link"
                activeClassName="Navigation-link-active"
            >
                Home
            </NavLink>
        </li>
        <li className="Nav-item">
            <NavLink
                to={routesConfig.movies}
                className="Navigation-link"
                activeClassName="Navigation-link-active"
            >
                Movies
            </NavLink>
        </li>
    </ul>
);

export default Navigation;