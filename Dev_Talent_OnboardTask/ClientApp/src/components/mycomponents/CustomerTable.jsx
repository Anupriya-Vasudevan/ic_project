import React, { Component} from 'react'
import {  Table, Button, Icon,Pagination,Dropdown} from 'semantic-ui-react'

import EditCustomer from './EditCustomer';
import DeleteCustomer from './DeleteCustomer';
import axios from 'axios';

export class CustomerTable extends Component{
  
//const CustomerTable = (props) =>{ 
  constructor(props) {
    super(props);
    this.state = { customers:[],
      id:0,
      currentName:"",
      currentAddress:"",
    toggleEditModal: false ,
    toggleDeleteModal:false,
    pageItems: [],
      page: 0,
      pageSize: 5
        };
      
  }

    componentDidMount(){
      //const {pageSize } = this.state;
          this.getData();
          
             }
         
      getData()
      { 
        axios.get('/Customers/GetCustomer')
        .then(({data}) => {

            this.setState({customers:data,
              pageItems: data.slice(0, 5)
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
          
    render()
    {
      const { customers,toggleEditModal,currentAddress,currentName,id,toggleDeleteModal, page, pageItems,}=this.state;
            
     return (
<div>
  
<EditCustomer  open={ toggleEditModal}  toggle={this.toggle} currentName={currentName} currentAddress={currentAddress} id={id} refresh={this.getData}/>
<DeleteCustomer open={toggleDeleteModal} toggleDelete={this.toggleDelete} id={id} refresh={this.getData()}/>
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Address</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {customers.map((c)=>(
                 <Table.Row key={c.id}>
       <Table.Cell>{c.name}</Table.Cell>
       <Table.Cell>{c.address}</Table.Cell>
       <Table.Cell><Button color='yellow' icon labelPosition='left' onClick={()=>this.setState(
         {toggleEditModal: true,
         currentName:c.name,
         currentAddress:c.address,
         id:c.id})}>
                    <Icon name='edit'/>
                  Edit</Button></Table.Cell>
       
       <Table.Cell> 
       <Button color='red' icon labelPosition='left' onClick = {()=>this.setState(
         {toggleDeleteModal: true,id:c.id})}>
        <Icon name='trash'/>
        Delete</Button>
         
       </Table.Cell>
     </Table.Row>
        ))}
      </Table.Body>
    </Table>
    <Pagination defaultActivePage={5} totalPages={10} />
    <Dropdown
      selection
      compact
      options={[
        { value: "10", text: "10" },
        { value: "20", text: "20" },
        { value: "30", text: "30" }
      ]}
      style={{ margin: "5px" }}
      defaultValue="10"
    />
    <span>items per page</span>
  </div>
);
}
}
export default CustomerTable