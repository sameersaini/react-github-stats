import React, { Component } from 'react';
import moment from 'moment';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

export default class WeeklyStatsGrid extends Component {
    state = {
        columnDefs: [
            {
                headerName: 'Date', field: 'date', width: 120, filter: 'agNumberDateFilter', comparator: WeeklyStatsGrid.dateComparator, sort: 'desc',
            },
            {
                headerName: 'Sun', field: 'sun', width: 80, filter: 'agNumberColumnFilter',
            },
            {
                headerName: 'Mon', field: 'mon', width: 80, filter: 'agNumberColumnFilter',
            },
            {
                headerName: 'Tue', field: 'tue', width: 80, filter: 'agNumberColumnFilter',
            },
            {
                headerName: 'Wed', field: 'wed', width: 80, filter: 'agNumberColumnFilter',
            },
            {
                headerName: 'Thur', field: 'thu', width: 80, filter: 'agNumberColumnFilter',
            },
            {
                headerName: 'Fri', field: 'fri', width: 80, filter: 'agNumberColumnFilter',
            },
            {
                headerName: 'Sat', field: 'sat', width: 80, filter: 'agNumberDateFilter',
            },
            {
                headerName: 'Total', field: 'total', width: 105, filter: 'agNumberDateFilter',
            },
        ],
        data: WeeklyStatsGrid.formatData(this.props.stats),
        pageSize: 52,
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: WeeklyStatsGrid.formatData(nextProps.stats),
        });
    }

    static formatData(stats) {
        return stats.map((stat, index) => ({
            date: moment.unix(stat.week).format('MMM D, YYYY'),
            sun: stat.days[0],
            mon: stat.days[1],
            tue: stat.days[2],
            wed: stat.days[3],
            thu: stat.days[4],
            fri: stat.days[5],
            sat: stat.days[6],
            total: stat.total,
        }));
    }

    static dateComparator(date1, date2) {
        if (moment(new Date(date1)).isSame(new Date(date2))) {
            return 0;
        } if (moment(new Date(date1)).isBefore(new Date(date2))) {
            return -1;
        }
        return 1;
    }

    render() {
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
                    rowData={this.state.data}
                >
                </AgGridReact>
            </div>
        );
    }
}
