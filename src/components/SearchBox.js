import React, { Component } from 'react';
// import { success, error } from '@pnotify/core';
// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';

class SearchBox extends Component {
    
    state = {
        value: ''
    };

    handleChange = e => {
        this.setState({
            value: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        // const {value} = this.state;

        this.props.onSubmit(this.state.value);
        this.setState({ value: '' });

        // if (value === '') {
        //     error({
        //         title: 'Error',
        //         text: 'Input movie name!'
        //     });
        // } else {
        //     success({
        //         title: 'Success',
        //         text: 'Movie list loaded!'
        //     });
        // }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                    autoComplete="off"
                    autoFocus
                    placeholder="Enter movie name"
                />
                <button type="submit">Search</button>
            </form>
        )
    };
};

export default SearchBox;
