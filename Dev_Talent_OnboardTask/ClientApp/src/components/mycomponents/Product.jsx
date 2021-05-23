import React, { Component } from 'react';

import axios from 'axios';
import ProductTable from './ProductTable';

import {  Button } from 'semantic-ui-react';
import CreateProduct from './CreateProduct'

export class Product extends Component{  
    constructor(props){  
        super(props);  
        this.state = {  
        products:[],  
        toggleCreateModal: false ,
        
      };       
    }  
    componentDidMount(){
      console.log("componentDidMount");
          this.getProduct();
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
      toggleModal = () => {
        this.setState({toggleCreateModal:!this.state.toggleCreateModal})
    };
    
     render(){         
      const {products, toggleCreateModal }=this.state;
      return(
      <div>
          <CreateProduct  open={toggleCreateModal} toggleModal={this.toggleModal} refreshData={this.getProduct}
          />
     
      <Button primary onClick={()=>this.setState({toggleCreateModal: true })}>New Product</Button>
      <ProductTable products={products} refreshData={this.getProduct()}  />
      </div>
      );
  }
}
  
export default Product;  