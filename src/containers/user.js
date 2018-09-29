import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
import momemt from 'moment';

class User extends Component {
    notify = msg => toast.error(msg);

    render() {
        const jsx = [];

        if (_.has(this.props.user, 'error') && this.props.user.error) {
            this.notify(this.props.user.error);
            jsx.push(<ToastContainer key="1"/>);
        }

        if (_.keys(this.props.user).length !== 0) {
            const { user } = this.props;
            jsx.push(
                <div key="2">
                    <table className="table table-bordered" >
                        <thead>
                            <tr>
                                <th style={{ width: '15%' }}>Name</th>
                                <th style={{ width: '25%' }}>Location</th>
                                <th style={{ width: '10%' }}>Profile</th>
                                <th style={{ width: '10%' }}>Photo</th>
                                <th style={{ width: '10%' }}>Repos</th>
                                <th style={{ width: '15%' }}>Profile Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.name}</td>
                                <td>{user.location}</td>
                                <td><a href={user.html_url} target="_blank">Click Here</a></td>
                                <td><img src={user.avatar_url} width="70" height="70"/></td>
                                <td>{user.public_repos}</td>
                                <td>{momemt(user.created_at).format('MMM D, YYYY')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }

        return (<div>{jsx}</div>);
    }
}

function mapStateToProps({ user }) {
    return { user };
}
export default connect(mapStateToProps)(User);
