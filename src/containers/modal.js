import React, { Component } from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import octokit from '@octokit/rest';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        '-webkit-animation-name': 'fadeIn', /* Fade in the background */
        '-webkit-animation-duration': '1s',
        'animation-name': 'fadeIn',
        'animation-duration': '1s',
        font: '400 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;',
        'border-radius': '10px',
    },
};

Modal.setAppElement('#root');


export default class StatsModal extends Component {
    constructor(props) {
        console.log("in modal")
        console.log(props)
        super(props);

        this.state = {
            modalIsOpen: props.showModal,
            repoStats: [],
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        octokit().repos.getStatsContributors({ owner: this.state.owner, repo: this.state.repo }).then((response) => {
            if (response.data.total) {
                this.setState({
                    repoStats: response.data.total,
                });
            } else {
                setTimeout(() => {
                    octokit().repos.getStatsContributors({ owner: this.state.owner, repo: this.state.repo }).then((response) => {
                        this.setState({
                            repoStats: response.data.total,
                        });
                    });
                }, 1000);
            }
        });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (

        );
    }
};