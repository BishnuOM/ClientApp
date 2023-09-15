import React, { Component } from 'react';
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import Service from '../../Service/Service';

export class LineChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                "labels": ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
                "datasets": [
                    {
                        "label": "This Week",
                        "data": [0, 0, 0, 0, 0, 0, 0],
                        "fill": false,
                        lineTension: 0.3,
                        "backgroundColor": "#484848",
                        "borderColor": "#484848",
                    },
                    {
                        "label": "Last Week",
                        "data": [0, 0, 0, 0, 0, 0, 0],
                        "fill": false,
                        lineTension: 0.3,
                        "backgroundColor": "#FF4339",
                        "borderColor": "#FF4339",
                    }

                ]
            },
            options: {
                scales: {
                    x: {
                        ticks: {
                            padding: 15
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        ticks: {
                            padding: 15
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            padding:30,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            color: '#FF4339',
                            boxWidth: 20,
                            boxHeight: 10,
                        }
                    }
                }
            }
        }
    }

     plugin = {
        beforeInit: function (chart) {
            // Get reference to the original fit function
            const originalFit = chart.legend.fit

            // Override the fit function
            chart.legend.fit = function fit() {
                originalFit.bind(chart.legend)()
                this.height += 20 // Change the height
                this.width += 50;
            }
        }
    }

    componentDidMount() {
        const data = JSON.parse(localStorage.getItem("login_data"));
        this.setState({
            AccessToken: data.token,
            userid: data.id,
            mentorshipdata: this.props.filter,
        }, this.GetChartData);
    }

    componentWillReceiveProps(props) {
        this.setState({
            mentorshipdata: props.filter
        }, this.GetChartData);
    }

    GetChartData() {
        var self = this;
        var mentor_data = {
            days: this.state.mentorshipdata,
            chartType: "mentorship",
        }
        Service.GetChartData(self, mentor_data).then((response) => {
            const chartdata = response
            self.setState({
                data: {
                    labels: chartdata.labels,
                    datasets:
                        [
                            {
                                label: chartdata.datasets[1].label,
                                data: chartdata.datasets[1].data,
                                fill: chartdata.datasets[1].fill,
                                lineTension: 0.3,
                                backgroundColor: chartdata.datasets[1].backgroundColor,
                                borderColor: chartdata.datasets[1].borderColor
                            },
                            {
                                label: chartdata.datasets[0].label,
                                data: chartdata.datasets[0].data,
                                fill: chartdata.datasets[0].fill,
                                lineTension: 0.3,
                                backgroundColor: chartdata.datasets[0].backgroundColor,
                                borderColor: chartdata.datasets[0].borderColor
                            }

                        ]
                },
                options: {
                    scales: {
                        x: {
                            ticks: {
                                padding: 15
                            },
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            ticks: {
                                padding: 15,
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                padding: 30,
                                usePointStyle: true,
                                pointStyle: 'circle',
                                color: '#FF4339',
                                boxWidth: 20,
                                boxHeight:10,
                            }
                        }
                    }
                }
            })

            this.props.getChartHeight(window.$("#chrtLine").innerHeight());
        });
    }

    render() {


        return (
            <>
                <Line id="chrtLine" height="530px" width="950px" plugins={[this.plugin]} data={this.state.data} options={this.state.options} />
            </>

        );
    }
}
