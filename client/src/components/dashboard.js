import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { BTCWebsocket } from './helper.js';
import axios from 'axios';
import { limit } from '../chart_config.js'

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Ask: 0,
            Last: 0,
            Bid: 0,
            Min: 0,
            Max: 0,
            Time: ''
        }

        //arrays for displaying data on chart
        this.Datas = []
        this.Times = []
    }

    componentDidMount(){
        //initialize web socket
        const wss = BTCWebsocket()

        //subscribe to ticker channel
        wss.onopen = function() {
            wss.send(JSON.stringify({
                "event": "subscribe",
                "channel": "ticker",
                "pair": "BTCUSD"
            }));
        };

        //on message callback, process the results
        wss.onmessage = (msg) => {
            const response = JSON.parse(msg.data)
            const hb = response[1]
            let time = new Date()
            const now = time.getHours()+' '+time.getMinutes()+' '+time.getSeconds()

            //if it's not a heartbeat, get the data
            if (response.length > 0 && hb !== "hb") {
                this.setState({
                    Ask: response[3],
                    Last: response[7],
                    Bid: response[1],
                    Min: ((response[1]+response[3]+response[7])/3)-50,
                    Max: ((response[1]+response[3]+response[7])/3)+50,
                    Time: now
                }, () => {
                    //display the data on chart by limit parameter
                    if(this.Datas.length>limit){
                        this.Datas.splice(0,1)    
                        this.Times.splice(0,1)
                    }
                    this.Datas.push(this.state)
                    this.Times.push(now)

                    //post the data to api
                    axios.post('/api/btc', this.state)
                        .then((response) => {
                            console.log(response)
                        }, (err) => {
                            console.error(err)
                        })
                });
            }
        }
    }

    render() {
        //init chart object
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
                <div style={{ padding: '0 20px 20px 20px' }}>
                    <h3><b>Dashboard</b></h3>
                    <div className="container">
                        <span>Ask : ${this.state.Ask}</span><br />
                        <span>Last : ${this.state.Last}</span><br />
                        <span>Bid : ${this.state.Bid}</span><br />
                        <h4 className="card-title">Ticker Chart</h4>
                        <Line data={arr} options={chartOptions} width="600" height="250"/>    
                    </div>
                </div>  
        )
    }

}

export default Dashboard;
