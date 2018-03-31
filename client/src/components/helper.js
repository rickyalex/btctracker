//initialize Websocket object
export function BTCWebsocket(){
	const WebSocket = require('ws')

    const wss = new WebSocket('wss://api.bitfinex.com/ws/')

    return wss;
}

//function to fetch api from server
/* eslint-disable no-undef */
export function save(data, cb) {
  return fetch(`api/btc`, {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

//function to return api callback responses
export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

//function to parse json responses
export function parseJSON(response) {
  return response.json();
}