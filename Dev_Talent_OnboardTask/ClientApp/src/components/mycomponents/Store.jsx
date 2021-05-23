import React, { Component } from 'react';

import axios from 'axios';
import StoreTable from './StoreTable';

import {  Button } from 'semantic-ui-react';
import CreateStore from './CreateStore'

export class Store extends Component{  
    constructor(props){  
        super(props);  
        this.state = {  
            stores:[],  
        toggleCreateModal: false ,
        
      };       
    }  
    componentDidMount(){
      console.log("componentDidMount");
          this.getStore();
          }
          getStore()
          {
           axios.get('/Stores/GetStore')
           .then(({data}) => {
            this.setState({stores:data,
            });
        console.log({data});
        
      })
      .catch( (err) => {
       console.log(err);
      });
      }
      toggleModal = () => {
        this.setState({toggleCreateModal:!this.state.toggleCreateModal})
    };
    
     render(){         
      const {stores, toggleCreateModal }=this.state;
      return(
      <div>
          <CreateStore  open={toggleCreateModal} toggleModal={this.toggleModal} refreshStore={this.getStore}
          />
     
      <Button primary onClick={()=>this.setState({toggleCreateModal: true })}>New Store</Button>
      <StoreTable stores={stores} refreshStore={this.getStore()}  />
      </div>
      );
  }
}
  
export default Store;  