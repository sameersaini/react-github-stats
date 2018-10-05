import React, { Component } from 'react';
import Modal from 'react-modal';
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
        '-webkit-animation-duration': '0.5s',
        'animation-name': 'fadeIn',
        'animation-duration': '0.5s',
        font: '400 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;',
        'border-radius': '10px',
        'text-decoration': 'underline',
    },
};

Modal.setAppElement('#root');

export default class buttonRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: props.value.owner,
            repo: props.value.repo,
            showModal: false,
            repoStats: {},
        };
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    showModal() {
        octokit().repos.getStatsContributors({ owner: this.state.owner, repo: this.state.repo }).then((response) => {
            if (response.data && response.data[0]) {
                this.setState({
                    repoStats: response.data[0],
                    showModal: true,
                });
            } else {
                setTimeout(() => {
                    octokit().repos.getStatsContributors({ owner: this.state.owner, repo: this.state.repo }).then((response) => {
                        this.setState({
                            repoStats: response.data[0],
                            showModal: true,
                        });
                    });
                }, 1000);
            }
        });
    }


    render() {
        return (
            <div>
                <i onClick={this.showModal} className="fas fa-chart-bar fa-lg" />
                <Modal
                    isOpen={this.state.showModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <button onClick={this.closeModal}>close</button>
                    <p>
                        total commits: {this.state.repoStats && this.state.repoStats.total ? this.state.repoStats.total : 0 }
                    </p>
                </Modal>
            </div>
        );
    }
};