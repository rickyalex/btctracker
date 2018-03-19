import React, { Component } from 'react';
import { BTCWebsocket } from './helper.js';

class Panels extends Component {

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

        this.Datas = [];
        this.Times = [];
    }

    componentDidMount(){

        const wss = BTCWebsocket()

        wss.onopen = function() {
            wss.send(JSON.stringify({
                "event": "subscribe",
                "channel": "ticker",
                "pair": "BTCUSD"
            }));
        };

        wss.onmessage = (msg) => {
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
        
        return (
                
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card p-30">
                                    <div className="media">
                                        <div className="media-left meida media-middle">
                                            <span>
                                                {
                                                    (this.Datas.length>=3) ? (this.state.Ask > this.Datas[this.Datas.length-1].Ask) ? <i className="fa fa-arrow-circle-up f-s-40 color-success"></i> : <i className="fa fa-arrow-circle-down f-s-40 color-danger"></i> : <i className="fa fa-arrows-alt-h f-s-40 color-default"></i>
                                                }
                                            </span>
                                        </div>
                                        <div className="media-body media-text-right">
                                            <h2>${this.state.Ask}</h2>
                                            <p className="m-b-0">Ask</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card p-30">
                                    <div className="media">
                                        <div className="media-left meida media-middle">
                                            <span>
                                                {
                                                    (this.Datas.length>=3) ? (this.state.Last > this.Datas[this.Datas.length-1].Last) ? <i className="fa fa-arrow-circle-up f-s-40 color-success"></i> : <i className="fa fa-arrow-circle-down f-s-40 color-danger"></i> : <i className="fa fa-arrows-alt-h f-s-40 color-default"></i>
                                                }
                                            </span>
                                        </div>
                                        <div className="media-body media-text-right">
                                            <h2>${this.state.Last}</h2>
                                            <p className="m-b-0">Last</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card p-30">
                                    <div className="media">
                                        <div className="media-left meida media-middle">
                                            <span>
                                                {
                                                    (this.Datas.length>=3) ? (this.state.Bid > this.Datas[this.Datas.length-1].Bid) ? <i className="fa fa-arrow-circle-up f-s-40 color-success"></i> : <i className="fa fa-arrow-circle-down f-s-40 color-danger"></i> : <i className="fa fa-arrows-alt-h f-s-40 color-default"></i>
                                                }
                                            </span>
                                        </div>
                                        <div className="media-body media-text-right">
                                            <h2>${this.state.Ask}</h2>
                                            <p className="m-b-0">Bid</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        )
    }

}

export default Panels;