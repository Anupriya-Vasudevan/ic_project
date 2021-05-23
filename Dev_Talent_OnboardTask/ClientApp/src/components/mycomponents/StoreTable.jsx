import React, { Component} from 'react'
import {  Table, Button, Icon} from 'semantic-ui-react'
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
      const { stores,toggleEditModal,currentAddress,currentName,id,toggleDeleteModal}=this.state;
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
      {stores.map((s)=>(
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
    </Table>
    
       </div>
    );
}
}
export default StoreTable