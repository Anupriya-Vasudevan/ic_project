import React, { useState  } from 'react';
import { Button,  Form, Modal } from 'semantic-ui-react'
import axios from 'axios';
  
const CreateStore = (props) =>{
  const {open, toggleModal, refreshStore } =props;
const [name, setName] = useState();
const [address, setAddress] = useState();
const  createStore=() => {
  axios.post('/Stores/PostStore', {
      Name:name,
     Address:address,
    
  })
.then((res) => {
     //console.log(res);
     toggleModal();
     refreshStore();  
    })
.catch( (err) => {
console.log(err);
});
}
return (
  <Modal  open={open}>
    <Modal.Header>Create Store</Modal.Header>
    <Modal.Content >
      
      <Modal.Description>
      <Form>
  <Form.Field>
    <label> Name</label>
    <input placeholder='Enter the Store Name' onChange={(e)=>setName(e.target.value)} />
  </Form.Field>
  <Form.Field>
    <label>Address</label>
    <input placeholder='Enter the Address' onChange={(e)=>setAddress(e.target.value)}/>
  </Form.Field>
 
  
</Form>
</Modal.Description>
    </Modal.Content>
    <Modal.Actions>
    <Button color='black' onClick={toggleModal}>
      Cancel
      </Button>
      <Button color='green' onClick={createStore} >
     Create
      </Button>
    </Modal.Actions>
  </Modal>
)
}
export default CreateStore