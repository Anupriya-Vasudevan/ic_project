import React, { useState, Fragment,useEffect} from 'react';
import { Button,  Form, Modal } from 'semantic-ui-react'
import axios from 'axios';

const EditCustomer = (props) =>{
  const {open,toggle,id,currentName,currentAddress,refreshCustomers} =props;
  const [cname, setName] = useState(currentName);
  const [caddress, setAddress] = useState(currentAddress);
  
  useEffect(() => {
    setName(currentName);
    setAddress(currentAddress);
 }, [open]);

    const  editCustomer=()=> {
      
      axios.put(`/Customers/PutCustomer/${id}`,{
      
        id: id,
        name: cname,
        address:caddress,
    })
        .then((res) => {
            refreshCustomers();
            toggle();
            
            
        })
        .catch((err) => {
            console.log(err)
        });
};
 
return (
        <Fragment>
        <Modal  open={open}>
              <Modal.Header>Edit Customer</Modal.Header>
              <Modal.Content >          
                <Modal.Description>
                <Form >
            <Form.Field>
              <label> Name</label>
              <input placeholder='Please Enter Customer Name' value={cname}  onChange={(e) => setName(e.target.value)}/>
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <input placeholder='Please Enter Customer Address' value={caddress} onChange={(e)=>setAddress(e.target.value)}/>
            </Form.Field>          
          </Form>
          </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button color='black' onClick={toggle}>
                Cancel
                </Button>
                <Button color='green' onClick={()=>editCustomer()}  >
             Edit
                </Button>
              </Modal.Actions>
            </Modal>
            </Fragment>
             );
            };
            export default  EditCustomer