import React, { lazy, Suspense } from 'react';
import { Route, Switch, /*Redirect*/ } from 'react-router-dom';
import Layout from './Layout';
import RoutesConfig from '../routes';
import Loader from '../utils/Loader';

const AsyncHome = lazy(() =>
    import('../views/Home' /* webpackChunkName: "HomePage" */)
);

const AsyncMovies = lazy(() =>
    import('../views/Movies') /* webpackChunkName: "MoviesPage" */
);

const AsyncShowDetails = lazy(() =>
    import('../views/ShowDetails' /* webpackChunkName: "ShowDetails" */)
);

const AsyncNotFound = lazy(() => 
    import('../views/NotFound' /* webpackChunkName: "ShowDetails" */)
);

const App = () => (
    <Layout>
        <Suspense fallback={<Loader/>}>
            <Switch>
                <Route path={RoutesConfig.home} exact component={AsyncHome} />
                <Route path={RoutesConfig.movies} exact component={AsyncMovies} />
                <Route path={RoutesConfig.showDetails} component={AsyncShowDetails} />
                <Route component={AsyncNotFound} />
                {/* <Redirect to={RoutesConfig.home} /> */}
            </Switch>
        </Suspense>
    </Layout>
);

export default App;