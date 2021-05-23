import React, { Component } from 'react';
import SalesTable from './SalesTable';

import {  Button } from 'semantic-ui-react';
import CreateSale from './CreateSale'
import axios from 'axios';
export class Sales extends Component{  
    constructor(props){  
        super(props);  
        this.state = {  
            sales:[], 
            customers:[],
      products:[],
      stores:[], 
        toggleCreateModal: false ,
        
      };       
    }  
    componentDidMount(){
        console.log("componentDidMount");
            this.getSales();
            this.getData();
          this.getProduct();
          this.getStore();
            }

            getSales()
            {
             axios.get(`/Sales/GetSales`)
             .then(({data}) => {
              this.setState({sales:data
              });
          console.log({data});
          
        })
        .catch( (err) => {
         console.log(err);
        });
        }
        getProduct()
        {
         axios.get('/Products/GetProduct')
         .then(({data}) => {
          this.setState({products:data,
          });
      console.log({data});
      
    })
    .catch( (err) => {
     console.log(err);
    });
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
        getData()
        { 
          axios.get('/Customers/GetCustomer')
          .then(({data}) => {
  
              this.setState({customers:data
                
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
          const {sales,customers,products,stores, toggleCreateModal }=this.state;
          return(
          <div>
              <CreateSale open={toggleCreateModal} toggleModal={this.toggleModal} refreshSale={this.getSales()}
              customers={customers} products={products} stores={stores}/>
         
          <Button primary onClick={()=>this.setState({toggleCreateModal: true })}>New Sale </Button>
          <SalesTable sales={sales} refreshSale={this.getSales()}  />
          </div>
          );
      }
    }
      
    export default Sales;  