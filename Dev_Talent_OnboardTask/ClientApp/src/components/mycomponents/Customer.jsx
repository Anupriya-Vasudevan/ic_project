/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars

import React, { Component } from 'react';

import axios from 'axios';
import CustomerTable from './CustomerTable';

import {  Button } from 'semantic-ui-react';
import CreateCustomer from './CreateCustomer';

 export class Customer extends Component {

    constructor(props) {
        super(props);
        this.state = { customers: [],
        toggleCreateModal: false ,
        
         };
      }

    componentDidMount(){
        console.log("componentDidMount");
            this.getData();
            }
  getData()
  { 
    axios.get('/Customers/GetCustomer')
    .then(({data}) => {
        this.setState({customers:data,
        });
    console.log({data});
    
  })
  .catch( (err) => {
   console.log(err);
  });
  }
    componentDidUpdate(){
        console.log(" componentDidUpdate");
    }
    componentWillUnmount(){
        console.log("componentWillUnmount");
      
    }

   
    toggleModal = () => {
        this.setState({toggleCreateModal:!this.state.toggleCreateModal})
    };
    
      
      
    render() {
       
        console.log("render");
        const {customers, toggleCreateModal }=this.state;
        return(
        <div>
            <CreateCustomer  open={toggleCreateModal} toggleModal={this.toggleModal} refreshData={this.getData}
            />
       
        <Button primary onClick={()=>this.setState({toggleCreateModal: true })}>New Customer</Button>
        <CustomerTable customers={customers} refreshData={this.getData()}  />
        </div>
        );
    }
}