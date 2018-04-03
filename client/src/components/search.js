import React, { Component } from 'react';
import Header from './header.js';
import Sidebar from './sidebar.js';
import Footer from './footer.js';
import axios from 'axios';
import { Table } from 'antd';

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount(){
        //get the data as soon the page completes loading
        axios.get('https://btctracker.herokuapp.com/api/search')
            .then((response) => {
                console.log(response.data.result);
                this.setState({
                    data: response.data.result
                })
            }, (err) => {
                console.error(err)
            })
    }

    render() {
        //init table columns
        const columns = [
        {
          title: 'Ask',
          dataIndex: 'Ask',
        }, {
          title: 'Last',
          dataIndex: 'Last',
        }, {
          title: 'Bid',
          dataIndex: 'Bid',
        }, {
          title: 'Time',
          dataIndex: 'Time',
        }];
        
        return (
                <div className="wrapper">
                    <Header />
                    <div className="left-layout">
                      <Sidebar />
                    </div>
                    <div className="right-layout">
                      <div style={{ padding: '0 20px 20px 20px' }} >
                          <h3><b>Search</b></h3><br />
                          <Table columns={columns} dataSource={this.state.data} size="small" />
                        </div>
                    </div>
                </div>
        )
    }

}

export default Search;