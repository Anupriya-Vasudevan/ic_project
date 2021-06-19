import React, {  Fragment} from 'react';
import { Button,   Modal } from 'semantic-ui-react'
import axios from 'axios';

const DeleteCustomer = (props) =>{
    const {open,toggleDelete,refreshCustomers,id} =props;
   const deleteRecord = (id) => {
        axios.delete(`/Customers/DeleteCustomer/${id}`)
        .then((res) => {
            //console.log(res);
            toggleDelete();
           refreshCustomers();  
          })
      .catch( (err) => {
       console.log(err);
      });
      }
      return (
        <Fragment>
        <Modal size="mini"
      dimmer="blurring" align="center" open={open}>
              <Modal.Header>Delete Customer</Modal.Header>
              <Modal.Content >
              <p>
          Are you sure?
        </p>
        </Modal.Content>
                
              <Modal.Actions>
              <Button color='black' onClick={toggleDelete}>
                Cancel
                </Button>
                <Button color='green' onClick={() =>deleteRecord(id)}  >
            Delete
                </Button>
              </Modal.Actions>
            </Modal>
            </Fragment>
             );
            };
            export default  DeleteCustomer