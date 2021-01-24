import React from 'react';
import Loader from 'react-loader-spinner';
import '../index.css';

function Spinner() {
    return (
        <Loader
            className="Loader"
            type="Circles"
            color="#e8f318"
            height={80}
            width={80}
        />
    )
};

export default Spinner;