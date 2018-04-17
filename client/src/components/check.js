import React, { Component } from 'react';
import { BTCWebsocket } from './helper.js';
import Header from './header.js';
import Sidebar from './sidebar.js';
import { Input } from 'antd';

class Check extends Component {

    constructor(props) {
        super(props);

        this.state = {
            yourValue: 0,
            toggleResult: 'hide',
            chanId: ''
        }
    }

    getYourValue(value){

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
            //record chanId for unsubscribing
            if(response.chanId){
                this.setState({
                    chanId: response.chanId
                })
            }else{
                //if it's not a heartbeat, get the data
                const hb = response[1]
                if (response.length > 0 && hb !== "hb") {
                    this.setState({
                        yourValue: response[7]*value,
                        toggleResult: 'show',
                        toggleLoading: 'hide'
                    }, () => {
                        //unsubscribe channel after getting Last value
                        wss.send(JSON.stringify({
                            "event": "unsubscribe",
                            "chanId": this.state.chanId
                        }));

                    });
                }    
            }
        }
    }

    render() {
        //init Input component
        const Search = Input.Search
        
        return (
                <div className="wrapper">
                    <Header />
                    <div className="left-layout">
                      <Sidebar />
                    </div>
                    <div className="right-layout">
                        <div style={{ padding: '0 20px 20px 20px' }}>
                            <h3><b>Check</b></h3><br />
                              <Search placeholder="Enter your Bitcoin amount" onSearch={value => this.getYourValue(value)} enterButton="Check Value" size="large" />
                              <br /><br />
                              <div className={this.state.toggleResult}>
                                <span>Your Value is :</span><br />
                                <h2>${this.state.yourValue}</h2>        
                              </div>
                        </div>
                    </div>
                </div>
        )
    }

}

export default Check;