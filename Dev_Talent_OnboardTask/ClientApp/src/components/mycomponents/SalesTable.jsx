import React, { Component} from 'react'
import {  Table, Button, Icon} from 'semantic-ui-react'
import axios from 'axios';
import EditSale from './EditSale';
import DeleteSale from './DeleteSale'


export class SalesTable extends Component {

  constructor(props) {
    super(props);
    this.state = { sales:[],
      customers:[],
      products:[],
      stores:[],
      id:0,
      currentCustomerId:0,
      currentProductId:0,
      currentStoreId:0,
      CurrentDate:null,
    toggleEditModal: false ,
    toggleDeleteModal:false,
    
      };
  }

    componentDidMount(){
     
          this.getSales();
          this.getData();
          this.getProduct();
          this.getStore();
          }
         
      getSales()
      { 
        axios.get('/Sales/GetSale')
        .then(({data}) => {
            this.setState({sale:data,
              
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
     toggleDelete = () =>{
      this.setState({toggleDeleteModal:!this.state.toggleDeleteModal})
     };
    toggle = () => {
      this.setState({toggleEditModal:!this.state.toggleEditModal})
  };
  
  
    render(){
      const { customers,products,stores,sales,toggleEditModal,id,toggleDeleteModal}=this.state;
      
     return (
<div>
<EditSale  open={ toggleEditModal}  toggle={this.toggle}  customers={customers} toggleEditModal={toggleEditModal}
products={products} stores={stores} refreshSale={this.getSales()}/>
<DeleteSale open={toggleDeleteModal} toggleDelete={this.toggleDelete} id={id} refreshSale={this.getSales}/>
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Customer</Table.HeaderCell>
        <Table.HeaderCell>Product</Table.HeaderCell>
        <Table.HeaderCell>Store</Table.HeaderCell>
        <Table.HeaderCell>DateSold</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {sales.map((s)=>(
       
                 <Table.Row key={s.id}>
                  
       <Table.Cell>{s.customer.name}</Table.Cell>
       <Table.Cell>{s.product.name}</Table.Cell>
       <Table.Cell>{s.Store.name}</Table.Cell>
       <Table.Cell format="D MMM, YYYY">{s.datasold}</Table.Cell>
       <Table.Cell><Button color='yellow' icon labelPosition='left' onClick={()=>this.setState(
         {toggleEditModal: true,
         currentCustomerId:s.customer.id,
         currentProductId:s.product.id,
         currentStoreId:s.store.id,
         CurrentDate:s.date,
         id:s.id})}>
                    <Icon name='edit'/>
                  Edit</Button></Table.Cell>
       
       <Table.Cell> 
       <Button color='red' icon labelPosition='left' onClick = {()=>this.setState(
         {toggleDeleteModal: true,id:s.id})}>
        <Icon name='trash'/>
        Delete</Button>
         
       </Table.Cell>
     </Table.Row>
        ))}
      </Table.Body>
    </Table>
    
       </div>
    );
}
}
export default SalesTable