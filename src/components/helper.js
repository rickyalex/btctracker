import React from 'react';

export function BTCWebsocket(){
	const WebSocket = require('ws')

    const wss = new WebSocket('wss://api.bitfinex.com/ws/')

    return wss;
}