import React, { Component} from 'react'
import {  Table, Button, Icon} from 'semantic-ui-react'
import axios from 'axios';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';


export class ProductTable extends Component {
//const CustomerTable = (props) =>{ 
  constructor(props) {
    super(props);
    this.state = { products:[],
      id:0,
      currentName:"",
      currentPrice:"",
    toggleEditModal: false ,
    toggleDeleteModal:false,
    
      };
  }

    componentDidMount(){
     
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
     toggleDelete = () =>{
      this.setState({toggleDeleteModal:!this.state.toggleDeleteModal})
     };
    toggle = () => {
      this.setState({toggleEditModal:!this.state.toggleEditModal})
  };
  
  
    render(){
      const { products,toggleEditModal,currentPrice,currentName,id,toggleDeleteModal}=this.state;
     return (
<div>
<EditProduct open={ toggleEditModal}  toggle={this.toggle} currentName={currentName} currentPrice={currentPrice} id={id} refresh={this.getProduct()}/>
<DeleteProduct open={toggleDeleteModal} toggleDelete={this.toggleDelete} id={id} refresh={this.getProduct}/>
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {products.map((p)=>(
                 <Table.Row key={p.id}>
       <Table.Cell>{p.name}</Table.Cell>
       <Table.Cell>${p.price}</Table.Cell>
       <Table.Cell><Button color='yellow' icon labelPosition='left' onClick={()=>this.setState(
         {toggleEditModal: true,
         currentName:p.name,
         currentPrice:p.price,
         id:p.id})}>
                    <Icon name='edit'/>
                  Edit</Button></Table.Cell>
       
       <Table.Cell> 
       <Button color='red' icon labelPosition='left' onClick = {()=>this.setState(
         {toggleDeleteModal: true,id:p.id})}>
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
export default ProductTable