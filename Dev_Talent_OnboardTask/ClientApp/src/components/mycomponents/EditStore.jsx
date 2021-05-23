import React, { useState, Fragment} from 'react';
import { Button,  Form, Modal } from 'semantic-ui-react'
import axios from 'axios';

const EditStore = (props) =>{
    const {open,toggle,refreshStore,id,currentName,currentAddress} =props;
    //const {name,address} =customer;
    const [cname, setName] = useState(currentName);
  const [caddress, setAddress] = useState(currentAddress);
    const  editStore=(id) => {
      axios.put(`/Stores/PutStore/${id}`,{
      
        id: id,
        name: cname,
        address: caddress,
    })
        .then((res) => {
            toggle();
            refreshStore();
            setName(currentName);
            setAddress(currentAddress);
        })
        .catch((err) => {
            console.log(err)
        });
};
        
      return (
        <Fragment>
        <Modal  open={open}>
              <Modal.Header>Edit Store</Modal.Header>
              <Modal.Content >
                
                <Modal.Description>
                <Form>
            <Form.Field>
              <label> Name</label>
              <input  defaultValue={currentName}  onChange={(e) => setName(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <input  defaultValue={currentAddress} onChange={(e)=>setAddress(e.target.value)}/>
            </Form.Field>
           
            
          </Form>
          </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button color='black' onClick={toggle}>
                Cancel
                </Button>
                <Button color='green' onClick={() =>editStore(id)}  >
             Edit
                </Button>
              </Modal.Actions>
            </Modal>
            </Fragment>
             );
            };
            export default  EditStore