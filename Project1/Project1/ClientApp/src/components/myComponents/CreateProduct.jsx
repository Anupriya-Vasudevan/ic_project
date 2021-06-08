import React, { useState  } from 'react';
import { Button,  Form, Modal } from 'semantic-ui-react'
import axios from 'axios';
  
const CreateProduct = (props) =>{
  const {open, toggleModal, refreshProducts } =props;
const [name, setName] = useState();
const [price, setPrice] = useState();
const  createProduct=() => {
  axios.post(`/Products/PostProduct`, {
      Name:name,
     Price:price,
    
  })
.then((res) => {
    // this.getData();
     console.log(res);
     toggleModal();
     refreshProducts();
    
    
})

.catch( (err) => {
console.log(err);
});
}
return (
  <Modal  open={open}>
    <Modal.Header>Create Product</Modal.Header>
    <Modal.Content >
      
      <Modal.Description>
      <Form>
  <Form.Field>
    <label> Name</label>
    <input placeholder='Enter the Product Name' onChange={(e)=>setName(e.target.value)} />
  </Form.Field>
  <Form.Field>
    <label>Price</label>$
    <input placeholder='Enter the Price' onChange={(e)=>setPrice(e.target.value)}/>
  </Form.Field>
 
  
</Form>
</Modal.Description>
    </Modal.Content>
    <Modal.Actions>
    <Button color='black' onClick={toggleModal}>
      Cancel
      </Button>
      <Button color='green' onClick={createProduct} >
     Create
      </Button>
    </Modal.Actions>
  </Modal>
)
}
export default CreateProduct