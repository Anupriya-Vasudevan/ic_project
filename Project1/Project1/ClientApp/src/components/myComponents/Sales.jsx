import React, { Component} from 'react'
import {  Table, Button, Icon,Menu,Dropdown,Pagination} from 'semantic-ui-react'
import axios from 'axios';
import EditSale from './EditSale';
import DeleteSale from './DeleteSale'
import CreateSale from './CreateSale'
import Moment from 'react-moment';



export class Sales extends Component {

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
    currentpage: 1,
    postsPerPage:3,
    toggleCreateModal: false ,
    
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
           axios.get(`/Sales/GetSales`)
           .then(({data}) => {
            this.setState({sales:data
            });
        //console.log({data});
        
      })
      .catch( (err) => {
       console.log(err);
      });
      }
      getProduct()
      {
       axios.get(`/Products/GetProduct`)
       .then(({data}) => {
        this.setState({products:data,
        });
   // console.log({data});
      })
  .catch( (err) => {
   console.log(err);
  });
  }
  getStore()
          {
           axios.get(`/Stores/GetStore`)
           .then(({data}) => {
            this.setState({stores:data,
            });
        //console.log({data});
        
      })
      .catch( (err) => {
       console.log(err);
      });
      }
      getData()
      { 
        axios.get(`/Customers/GetCustomer`)
        .then(({data}) => {

            this.setState({customers:data
              
            });
       //console.log({data});
        
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
  toggleModal = () => {
    this.setState({toggleCreateModal:!this.state.toggleCreateModal})
};
  
    render(){
      const { currid,currentCustomerId,currentProductId,currentStoreId,currentDate, customers,products,stores,sales,toggleEditModal,id,toggleDeleteModal,postsPerPage,toggleCreateModal}=this.state;
      const indexOfLastPost = this.state.currentpage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentsales = sales.slice(indexOfFirstPost, indexOfLastPost);
        const totalPages = Math.ceil(customers.length / postsPerPage);
        const options = [
            { key: 1, text: '3', value: 3 },
            { key: 2, text: '5', value: 5 },
            { key: 3, text: '10', value: 10 },
        ] 
     return (
      
<div>
    <CreateSale open={toggleCreateModal} toggleModal={this.toggleModal} refreshSale={()=>this.getSales()}
          customers={customers} products={products} stores={stores}/>
          <Button primary onClick={()=>this.setState({toggleCreateModal: true })}>New Sale </Button>
<EditSale  open={ toggleEditModal}  toggle={this.toggle} currid={currid} currentCustomerId={currentCustomerId}  
currentProductId={currentProductId} currentStoreId={currentStoreId} currentDate={currentDate}  customers={customers} products={products} stores={stores} refreshSale={()=>this.getSales()} />
<DeleteSale open={toggleDeleteModal} toggleDelete={this.toggleDelete} id={id} refreshSale={()=>this.getSales()}/>
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
      {currentsales.map((s)=>(
       
                 <Table.Row key={s.id}>
                  
       <Table.Cell>{s.customer.name}</Table.Cell>
       <Table.Cell>{s.product.name}</Table.Cell>
       <Table.Cell>{s.store.name}</Table.Cell>
       
       <Table.Cell ><Moment format="D MMM, YYYY">{s.dateSold}</Moment></Table.Cell>
       <Table.Cell><Button color='yellow' icon labelPosition='left' onClick={()=>this.setState(
         {toggleEditModal: true,
          currid:s.id,
         currentCustomerId:s.customer.id,
         currentProductId:s.product.id,
         currentStoreId:s.store.id,
         currentDate:s.dateSold,
         })}>
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
    
    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan="4">
                                <Menu  compact>
                                    <Dropdown onChange={(e, data) => this.setState({ postsPerPage: data.value})} placeholder='Rows/Page' options={options} simple item />
                                </Menu>
                                <Menu floated="right" pagination>
                                    <Menu.Item as="a" icon>
                                        <Icon name="chevron left" />
                                    </Menu.Item>
                                    <Pagination
                                        defaultActivePage={1}
                                        onPageChange={(event, data) => this.setState({ currentpage: data.activePage})}
                                        totalPages={totalPages}
                                    />
                                    <Menu.Item as="a" icon>
                                        <Icon name="chevron right" />
                                    </Menu.Item>
                                </Menu>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
    </Table>
       </div>
    );
}
}
export default Sales