import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class Stats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                {
                    headerName: 'ID', field: 'id', width: 100, filter: 'agNumberColumnFilter', headerTooltip: 'ID',
                },
                {
                    headerName: 'Name', field: 'name', width: 150,
                },
                {
                    headerName: 'Description', field: 'description', width: 150, tooltipField: 'description',
                },
                {
                    headerName: 'Link', field: 'link', width: 100, tooltipField: 'link', suppressSorting: true, suppressFilter: true, suppressResize: true, cellRenderer: params => `<a href='${params.value}' target='_blank'>Click Here</a>`,
                },
                {
                    headerName: 'Size', field: 'size', width: 80, filter: 'agNumberColumnFilter', headerTooltip: 'Size in Bytes',
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
        };
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
                    columnDefs={this.state.columnDefs}
                    rowData={this.props.rowData}>
                </AgGridReact>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const rowData = state.userRepos.map(data => ({
        id: data.id,
        name: data.name,
        description: data.description || '--',
        link: data.html_url,
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
