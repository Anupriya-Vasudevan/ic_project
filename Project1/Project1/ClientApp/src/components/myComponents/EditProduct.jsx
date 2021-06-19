import React, { useState, Fragment,useEffect} from 'react';
import { Button,  Form, Modal } from 'semantic-ui-react'
import axios from 'axios';

const EditProduct = (props) =>{
    const {open,toggle,id,currentName,currentPrice,refreshProducts} =props;
    const [cname, setName] = useState(currentName);
    const [cprice, setPrice] = useState(currentPrice);
    useEffect(() => {
      setName(currentName);
      setPrice(currentPrice);
    }, [open]);
  
    const  editProduct=() => {
      axios.put(`/Products/PutProduct/${id}`,{
        id: id,
        name: cname,
        price: cprice,
    })
        .then((res) => {
            toggle();
            refreshProducts();
           
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
              <input  value={cname}  onChange={(e) => setName(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Price</label>
              <input  value={cprice} onChange={(e)=>setPrice(e.target.value)}/>
            </Form.Field>           
          </Form>
          </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button color='black' onClick={toggle}>
                Cancel
                </Button>
                <Button color='green' onClick={() =>editProduct()}  >
             Edit
                </Button>
              </Modal.Actions>
            </Modal>
            </Fragment>
             );
            };
            export default  EditProduct