import React, { Component } from 'react';

import Form from '../containers/form';
import Stats from '../containers/stats';
import User from '../containers/user';


class Wrapper extends Component {
    render() {
        return (
            <div className="container">
                <Form />
                <hr />
                <User />
                <Stats/>
            </div>
        );
    }
}

export default Wrapper;
