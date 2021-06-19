import React, { Component} from 'react'
import {  Table, Button, Icon,Menu,Dropdown,Pagination} from 'semantic-ui-react'
import axios from 'axios';
import EditStore from './EditStore';
import DeleteStore from './DeleteStore';
import CreateStore from './CreateStore';


export class Store extends Component {
 
  constructor(props) {
    super(props);
    this.state = { stores:[],
      id:0,
      currentName:"",
      currentAddress:"",
    toggleCreateModal: false ,
    toggleEditModal: false ,
    toggleDeleteModal:false,
    currentpage: 1,
    postsPerPage:3
      };
  }

    componentDidMount()
    {
     this.getStore();
    }
         
      getStore()
      { 
        axios.get('/Stores/GetStore')
        .then(({data}) => {
            this.setState({stores:data,
              
            });
       //console.log({data});
        
      })
      .catch( (err) => {
       console.log(err);
      });
      }
      toggleModal = () => {
        this.setState({toggleCreateModal:!this.state.toggleCreateModal})
    };
     toggleDelete = () =>{
      this.setState({toggleDeleteModal:!this.state.toggleDeleteModal})
     };
    toggle = () => {
      this.setState({toggleEditModal:!this.state.toggleEditModal})
  };
  
  
    render(){
      const { stores,toggleEditModal,id,currentAddress,currentName,toggleDeleteModal,toggleCreateModal,postsPerPage}=this.state;
      const indexOfLastPost = this.state.currentpage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentstores = stores.slice(indexOfFirstPost, indexOfLastPost);
        const totalPages = Math.ceil(stores.length / postsPerPage);
        const options = [
            { key: 1, text: '3', value: 3 },
            { key: 2, text: '5', value: 5 },
            { key: 3, text: '10', value: 10 },
        ]      
     return (
<div>
<CreateStore  open={toggleCreateModal} toggleModal={this.toggleModal} refreshStore={()=>this.getStore()}/>
<EditStore  open={ toggleEditModal}  toggle={this.toggle} id={id} currentName={currentName} currentAddress={currentAddress}  refreshStore={()=>this.getStore()}/>
<DeleteStore open={toggleDeleteModal} toggleDelete={this.toggleDelete} id={id} refreshStore={()=>this.getStore()}/>
<Button primary onClick={()=>this.setState({toggleCreateModal: true })}>New Store</Button>
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
      {currentstores.map((s)=>(
                 <Table.Row key={s.id}>
       <Table.Cell>{s.name}</Table.Cell>
       <Table.Cell>{s.address}</Table.Cell>
       <Table.Cell><Button color='yellow' icon labelPosition='left' onClick={()=>this.setState(
         {toggleEditModal: true,
          id:s.id,
         currentName:s.name,
         currentAddress:s.address
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
export default Store