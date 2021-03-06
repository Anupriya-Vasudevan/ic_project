import React, { useState } from 'react';
import { Button,  Form, Modal } from 'semantic-ui-react'
import axios from 'axios';

const CreateCustomer = (props) =>{
    const {open, toggleModal, refreshCustomers } =props;
  const [name, setName] = useState();
  const [address, setAddress] = useState();
const  createCustomer=() => {
    axios.post(`/Customers/PostCustomer`, {
        Name:name,
       Address:address,
      
    })
.then((res) => {
         //console.log(res);
       toggleModal();
       refreshCustomers();
      
      
})

.catch( (err) => {
console.log(err);
});
}

  return (
    <Modal  open={open}>
      <Modal.Header>Create Customer</Modal.Header>
      <Modal.Content >
        
        <Modal.Description>
        <Form>
    <Form.Field>
      <label> Name</label>
      <input placeholder='Enter the Name' onChange={(e)=>setName(e.target.value)} />
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
        <Button color='green' onClick={createCustomer} >
       Create
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
export default CreateCustomer