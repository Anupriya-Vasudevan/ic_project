import React, { useState, Fragment} from 'react';
import { Button,  Form, Modal } from 'semantic-ui-react'
import axios from 'axios';

const EditProduct = (props) =>{
    const {open,toggle,refreshProducts,id,currentName,currentPrice} =props;
    const [cname, setName] = useState(currentName);
    const [cprice, setPrice] = useState(currentPrice);
    const  editProduct=(id) => {
      axios.put(`/Products/PutProduct/${id}`,{
      
        id: id,
        name: cname,
        price: cprice,
    })
        .then((res) => {
            toggle();
            refreshProducts();
            setName(currentName);
            setPrice(currentPrice);
        })
        .catch((err) => {
            console.log(err)
        });
};
        
      return (
        <Fragment>
        <Modal  open={open}>
              <Modal.Header>Edit Product</Modal.Header>
              <Modal.Content >
                
                <Modal.Description>
                <Form>
            <Form.Field>
              <label> Name</label>
              <input  defaultValue={currentName}  onChange={(e) => setName(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Price</label>
              <input  defaultValue={currentPrice} onChange={(e)=>setPrice(e.target.value)}/>
            </Form.Field>
           
            
          </Form>
          </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button color='black' onClick={toggle}>
                Cancel
                </Button>
                <Button color='green' onClick={() =>editProduct(id)}  >
             Edit
                </Button>
              </Modal.Actions>
            </Modal>
            </Fragment>
             );
            };
            export default  EditProduct