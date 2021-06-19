import React, { Component} from 'react'
import {  Table, Button, Icon,Pagination,Dropdown,Menu} from 'semantic-ui-react'
import EditCustomer from './EditCustomer';
import DeleteCustomer from './DeleteCustomer';
import axios from 'axios';
import CreateCustomer from './CreateCustomer';

export class Customer extends Component{
   constructor(props) {
    super(props);
    this.state = { customers:[],
      id:0,
      currentName:"",
      currentAddress:"",
    toggleCreateModal:false,
    toggleEditModal: false ,
    toggleDeleteModal:false,
    currentpage: 1,
    postsPerPage:3
    };
      
  }

    componentDidMount()
    {
      
    this.getData();
         
    }
         
    getData()
      { 
        axios.get(`/Customers/GetCustomer`)
        .then(({data}) => {
            this.setState({customers: data,       
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
          
    render()
    {
      const { customers,toggleEditModal,id,currentName,currentAddress,toggleDeleteModal,toggleCreateModal, postsPerPage}=this.state;
      const indexOfLastPost = this.state.currentpage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = customers.slice(indexOfFirstPost, indexOfLastPost);
        const totalPages = Math.ceil(customers.length / postsPerPage);
        const options = [
            { key: 1, text: '3', value: 3 },
            { key: 2, text: '5', value: 5 },
            { key: 3, text: '10', value: 10 },
        ]      
     return (
<div>
    
<CreateCustomer  open={toggleCreateModal} toggleModal={this.toggleModal} refreshCustomers={()=>this.getData()}/> 
<EditCustomer  open={ toggleEditModal}  toggle={this.toggle} id={id} currentName={currentName} currentAddress={currentAddress}  refreshCustomers={()=>this.getData()}/>
<DeleteCustomer open={toggleDeleteModal} toggleDelete={this.toggleDelete} id={id} refreshCustomers={()=>this.getData()}/>
<Button primary onClick={()=>this.setState({toggleCreateModal: true })}>New Customer</Button>
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
      {currentPosts.map((c)=>(
                 <Table.Row key={c.id}>
       <Table.Cell>{c.name}</Table.Cell>
       <Table.Cell>{c.address}</Table.Cell>
       <Table.Cell><Button color='yellow' icon labelPosition='left' onClick={()=>this.setState(
         {toggleEditModal: true,
          id:c.id,
         currentName:c.name,
         currentAddress:c.address
       })}>
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
export default Customer