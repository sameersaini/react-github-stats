import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import buttonRenderer from './buttonRenderer';

class Stats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                {
                    headerName: 'Name', field: 'name', width: 150,
                },
                {
                    headerName: 'Description', field: 'description', width: 200, tooltipField: 'description',
                },
                {
                    headerName: 'Link', field: 'link', width: 100, tooltipField: 'link', suppressSorting: true, suppressFilter: true, suppressResize: true, cellRenderer: params => `<a href='${params.value}' target='_blank'>Click Here</a>`,
                },
                {
                    headerName: 'Stats', field: 'stats', width: 80, suppressSorting: true, suppressFilter: true, suppressResize: true, cellRenderer: 'buttonRenderer',
                },
                {
                    headerName: 'Size (Bytes)', field: 'size', width: 80, filter: 'agNumberColumnFilter', headerTooltip: 'Size in Bytes',
                },
                {
                    headerName: 'Forks', field: 'forks', width: 80, filter: 'agNumberColumnFilter', headerTooltip: 'Default Branch',
                },
                {
                    headerName: 'Default Branch', field: 'defaultBranch', width: 120,
                },
                {
                    headerName: 'Pushed At', field: 'pushedAt', width: 120, filter: 'agNumberDateFilter', comparator: this.dateComparator.bind(this), sort: 'desc',
                },
                {
                    headerName: 'Created At', field: 'createdAt', width: 120, filter: 'agNumberDateFilter', comparator: this.dateComparator.bind(this),
                },
                {
                    headerName: 'Updated At', field: 'updatedAt', width: 120, filter: 'agNumberDateFilter', comparator: this.dateComparator.bind(this),
                },
            ],
            context: { componentParent: this },
            frameworkComponents: {
                buttonRenderer,
            },
            pageSize: 15,
        };
    }

    methodFromParent(cell) {
        alert("Parent Component Method from " + cell + "!");
    }

    dateComparator(date1, date2) {
        if (moment(new Date(date1)).isSame(new Date(date2))) {
            return 0;
        } if (moment(new Date(date1)).isBefore(new Date(date2))) {
            return -1;
        }
        return 1;
    }

    render() {
        if (this.props.rowData.length === 0) {
            return null;
        }
        return (
            <div
                className="ag-theme-balham"
                style={{
                    height: '400px',
                }}
            >
                <AgGridReact
                    enableSorting={true}
                    enableFilter={true}
                    enableColResize={true}
                    animateRows={true}
                    pagination={true}
                    paginationPageSize={this.state.pageSize}
                    columnDefs={this.state.columnDefs}
                    rowData={this.props.rowData}
                    context={this.state.context}
                    frameworkComponents={this.state.frameworkComponents}>
                </AgGridReact>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const rowData = state.userRepos.map(data => ({
        name: data.name,
        description: data.description || '--',
        link: data.html_url,
        stats: {
            owner: data.owner.login,
            repo: data.name,
        },
        size: data.size,
        forks: data.forks_count,
        defaultBranch: data.default_branch,
        createdAt: moment(data.created_at).format('MMM D, YYYY'),
        updatedAt: moment(data.updated_at).format('MMM D, YYYY'),
        pushedAt: moment(data.pushed_at).format('MMM D, YYYY'),
    }));
    return { rowData };
}

export default connect(mapStateToProps)(Stats);
