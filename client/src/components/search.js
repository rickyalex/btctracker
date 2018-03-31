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
        axios.get('/api/search')
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
                <div>
                    <Header />
                    <Sidebar />
                    <div className="page-wrapper">
                        <div className="row page-titles">
                            <div className="col-md-5 align-self-center">
                                <h3 className="text-primary">Search</h3>
                            </div>
                        </div>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <Table columns={columns} dataSource={this.state.data} size="small" />
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>

        )
    }

}

export default Search;