import React from 'react';
import Header from './Header';

const styles = {
    maxWidth: 1170,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 12,
    paddingRight: 12,
    position: 'relative'
};

const Layout = ({ children }) => (
    <div style={styles}>
        <Header />
        {children}
    </div>
);

export default Layout;