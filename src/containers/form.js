import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchUser } from '../actions';

class Form extends Component {
    renderField(field) {
        const { touched, error } = field.meta;
        const className = `form-control ${ touched && error ? 'is-invalid' : ''}`;
        return (
            <div>
                <field.type
                    className={className}
                    placeholder="Username..."
                    type="text"
                    {...field.input}
                />
                <div className='invalid-tooltip'>{touched && error}</div>
            </div>
        );
    }

    submitForm(values) {
        this.props.fetchUser(values);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form className="searchUserForm" onSubmit={handleSubmit(this.submitForm.bind(this))}>
                <div className="form-group row">
                    <div className="col-md-4 offset-md-3">
                        <Field
                            name="Search"
                            title="Search"
                            type="input"
                            component={this.renderField}
                        />
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-success">Search</button>
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
    connect(null, { fetchUser })(Form)
);
