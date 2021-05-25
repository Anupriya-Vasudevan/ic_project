import React, { Component} from 'react'
import {  Table, Button, Icon,Menu,Dropdown,Pagination} from 'semantic-ui-react'
import axios from 'axios';
import EditStore from './EditStore';
import DeleteStore from './DeleteStore'


export class StoreTable extends Component {
//const CustomerTable = (props) =>{ 
  constructor(props) {
    super(props);
    this.state = { stores:[],
      id:0,
      currentName:"",
      currentAddress:"",
    toggleEditModal: false ,
    toggleDeleteModal:false,
    currentpage: 1,
    postsPerPage:3
      };
  }

    componentDidMount(){
     
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
     toggleDelete = () =>{
      this.setState({toggleDeleteModal:!this.state.toggleDeleteModal})
     };
    toggle = () => {
      this.setState({toggleEditModal:!this.state.toggleEditModal})
  };
  
  
    render(){
      const { stores,toggleEditModal,currentAddress,currentName,id,toggleDeleteModal,postsPerPage}=this.state;
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
<EditStore  open={ toggleEditModal}  toggle={this.toggle} currentName={currentName} currentAddress={currentAddress} id={id} refresh={this.getStore()}/>
<DeleteStore open={toggleDeleteModal} toggleDelete={this.toggleDelete} id={id} refreshStore={this.getStore}/>
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
         currentName:s.name,
         currentAddress:s.address,
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
      <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan="4">
                                <Menu floated="left" compact>
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
export default StoreTable