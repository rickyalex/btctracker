import React, { Component } from 'react';
import '../App.css';
import { Line, Bar } from 'react-chartjs-2';

class TrackingApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Ask: 0,
            Last: 0,
            Bid: 0,
            Min: 0,
            Max: 0
        }

        this.Datas = [];
        this.Times = [];
    }

    getDatas(){
        return this.Datas;
    }

    componentDidMount(){
        const WebSocket = require('ws')

        const wss = new WebSocket('wss://api.bitfinex.com/ws/')

        wss.onopen = function() {
            wss.send(JSON.stringify({
                "event": "subscribe",
                "channel": "ticker",
                "pair": "BTCUSD"
            }));
        };

        wss.onmessage = (msg) => {
            console.log(msg.data);
            const response = JSON.parse(msg.data);
            const hb = response[1];
            if (hb !== "hb") {
                this.setState({
                    Ask: response[3],
                    Last: response[7],
                    Bid: response[1],
                    Min: response[7]-100,
                    Max: response[7]+100,
                }, () => {
                    if(this.Datas.length>5){
                        this.Datas.splice(0,1);    
                        this.Times.splice(0,1);    
                    }
                    
                    this.Datas.push(this.state);
                    let time = new Date();
                    this.Times.push(time.getHours()+':'+time.getMinutes()+':'+time.getSeconds());
                });
            }
        }
    }

    render() {
        
        let arr = {
            labels: this.Times,
            datasets: [
                {
                    label: "Ask",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#36A2EB',
                    borderColor: '#36A2EA',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#36A2EB',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#36A2EB',
                    pointHoverBorderColor: '#36A2EB',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.Datas.map((data) => {
                        let askArray = [];
                        askArray.push(data.Ask);
                        return askArray;
                    })
                },
                {
                    label: "Last",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#FFCE56',
                    borderColor: '#FFCE55',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#FFCE56',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#FFCE56',
                    pointHoverBorderColor: '#FFCE56',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.Datas.map((data) => {
                            let lastArray = [];
                            lastArray.push(data.Last);
                            return lastArray;
                    })
                },
                {
                    label: "Bid",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#FF6384',
                    borderColor: '#FF6383',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#FF6384',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#FF6384',
                    pointHoverBorderColor: '#FF6384',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: this.Datas.map((data) => {
                            let bidArray = [];
                            bidArray.push(data.Bid);
                            return bidArray;
                    })
                }
            ]
        };

        var chartOptions = {
            beginAtZero:false,
            showScale: true,
            pointDot : true,
            pointDotRadius : 4,

            scales: {
              yAxes: [{
                  ticks: {
                      min: this.state.Min,
                      max: this.state.Max
                  }
                }]
             }
        }

        return (
                <div className="row">
                    <div className="col-md-3">
                        <div className="card p-30">
                            <div className="media">
                                <div className="media-left meida media-middle">
                                    <span><i className="fa fa-usd f-s-40 color-primary"></i></span>
                                </div>
                                <div className="media-body media-text-right">
                                    <h2>${this.state.Ask}</h2>
                                    <p className="m-b-0">Ask</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card p-30">
                            <div className="media">
                                <div className="media-left meida media-middle">
                                    <span><i className="fa fa-shopping-cart f-s-40 color-success"></i></span>
                                </div>
                                <div className="media-body media-text-right">
                                    <h2>${this.state.Last}</h2>
                                    <p className="m-b-0">Last</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card p-30">
                            <div className="media">
                                <div className="media-left meida media-middle">
                                    <span><i className="fa fa-archive f-s-40 color-warning"></i></span>
                                </div>
                                <div className="media-body media-text-right">
                                    <h2>${this.state.Ask}</h2>
                                    <p className="m-b-0">Bid</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card p-30">
                            <div className="media">
                                <div className="media-left meida media-middle">
                                    <span><i className="fa fa-user f-s-40 color-danger"></i></span>
                                </div>
                                <div className="media-body media-text-right">
                                    <h2>847</h2>
                                    <p className="m-b-0">Customer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row bg-white box-shadow">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Extra Area Chart</h4>
                                    <Line data={arr} options={chartOptions} width="600" height="250"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

}

export default TrackingApp;