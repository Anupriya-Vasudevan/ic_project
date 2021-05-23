import React, {  Fragment} from 'react';
import { Button,   Modal } from 'semantic-ui-react'
import axios from 'axios';

const DeleteProduct = (props) =>{
    const {open,toggleDelete,refresh,id} =props;
   const deleteRecord = (id) => {
        axios.delete(`/Products/DeleteProduct/${id}`)
        .then((res) => {
            console.log(res);
            toggleDelete();
           refresh();
           
            
      })
      .catch( (err) => {
       console.log(err);
      });
      }
      return (
        <Fragment>
        <Modal  open={open}>
              <Modal.Header>Delete Product</Modal.Header>
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
            export default  DeleteProduct