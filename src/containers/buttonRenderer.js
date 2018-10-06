import React, { Component } from 'react';
import StatsModal from './statsModal';

export default class buttonRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: props.value.owner,
            repo: props.value.repo,
            showModal: false,
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }


    showModal() {
        this.setState({
            showModal: true,
        });
    }

    hideModal() {
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
};