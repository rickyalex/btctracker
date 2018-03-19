import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { BTCWebsocket } from './helper.js';

class Charts extends Component {

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

        const wss = BTCWebsocket();
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
                <div className="row bg-white box-shadow">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Ticker Chart</h4>
                                    <Line data={arr} options={chartOptions} width="600" height="250"/>
                                </div>
                            </div>
                        </div>
                    </div>
        )
    }

}

export default Charts;