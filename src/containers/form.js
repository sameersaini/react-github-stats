import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import octokit from '@octokit/rest';
import _ from 'lodash';

import { fetchUserDetails } from '../actions';

class Form extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.state = {
            options: [],
        };
    }

    handleSearch(search) {
        if (!search) {
            return;
        }
        octokit().search.users({ q: search }).then((response) => {
            this.setState({ options: _.map(response.data.items, 'login') });
        });
    }

    renderField(field) {
        const { touched, error } = field.meta;
        return (
            <div>
                <DropdownList filter
                              placeholder="Username..."
                              type="text"
                              {...field.input}
                              data={field.data}
                              onSearch={e => field.onSearch(e)}
                />
                <div className='text-danger'>{touched && error}</div>
            </div>
        );
    }

    submitForm(values) {
        this.props.fetchUserDetails(values);
    }

    render() {
        const { handleSubmit } = this.props;
        const handleSearch = _.debounce(this.handleSearch, 500);
        return (
            <form className="searchUserForm" onSubmit={handleSubmit(this.submitForm.bind(this))}>
                <div className="input-group justify-content-center">
                    <Field
                        name="Search"
                        title="Search"
                        data={this.state.options}
                        component={this.renderField}
                        onSearch={handleSearch}
                    />
                    <div className="input-group-append">
                        <button type="submit" className="btn btn-outline-success">Search</button>
                    </div>
                </div>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    if (!values.Search) {
        errors.Search = 'Username is required';
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'SearchUserForm',
})(
    connect(null, { fetchUserDetails })(Form)
);
