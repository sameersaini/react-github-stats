import React, { Component } from 'react';
import StatsModal from './statsModal';

export default class buttonRenderer extends Component {
    state = {
        owner: this.props.value.owner,
        repo: this.props.value.repo,
        showModal: false,
    };


    showModal = () => {
        this.setState({
            showModal: true,
        });
    }

    hideModal = () => {
        this.setState({
            showModal: false,
        });
    }

    render() {
        return (
            <div>
                <i onClick={this.showModal} className="fas fa-chart-bar fa-lg" />
                <StatsModal
                    owner={this.state.owner}
                    repo={this.state.repo}
                    showModal={this.state.showModal}
                    hideModal={this.hideModal}
                />
                }
            </div>
        );
    }
}
