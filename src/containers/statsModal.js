import React, { Component } from 'react';
import Modal from 'react-modal';
import octokit from '@octokit/rest';
import _ from 'lodash';
import WeeklyStatsGrid from './weeklyStatsGrid';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        WebkitAnimationName: 'fadeIn', /* Fade in the background */
        WebkitAnimationDuration: '0.5s',
        animationName: 'fadeIn',
        animationDuration: '0.5s',
        font: '400 12px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif',
        borderRadius: '6px',
        width: '58%',
    },
};

Modal.setAppElement('#root');

export default class StatsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: props.owner,
            repo: props.repo,
            showModal: props.showModal,
            repoStats: [],
        };
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showModal: nextProps.showModal,
        });
    }

    closeModal() {
        this.setState({ showModal: false });
        this.props.hideModal();
    }

    afterOpenModal() {
        octokit().repos.getStatsCommitActivity({ owner: this.state.owner, repo: this.state.repo }).then((response) => {
            if (response.data && response.data[0]) {
                this.setState({
                    repoStats: response.data,
                });
            } else {
                setTimeout(() => {
                    octokit().repos.getStatsCommitActivity({ owner: this.state.owner, repo: this.state.repo }).then((response) => {
                        this.setState({
                            repoStats: response.data,
                        });
                    });
                }, 1000);
            }
        });
    }

    render() {
        console.log("rendering")
        console.log(this.state);
        return (
            <div>
                <Modal
                    isOpen={this.state.showModal}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div>
                        <div style={{ float: 'right' }}>
                            <button className="btn btn-sm btn-primary" onClick={this.closeModal}>Close</button>
                        </div>
                        <div>
                            <p style={{ fontSize: 'medium' }}>
                                Commits (last 52 weeks) : {this.state.repoStats && this.state.repoStats.length > 0 ? _.sum(_.map(this.state.repoStats, 'total')): 0 }
                            </p>
                        </div>
                    </div>
                    <br />
                    <WeeklyStatsGrid stats={this.state.repoStats}/>
                </Modal>
            </div>
        );
    }
};