
import React, {  Fragment} from 'react';
import { Button,   Modal } from 'semantic-ui-react'
import axios from 'axios';

const DeleteSale = (props) =>{
    const {open,toggleDelete,refreshSale,id} =props;
   const deleteRecord = (id) => {
        axios.delete(`/Sales/DeleteSales/${id}`)
        .then((res) => {
            //console.log(res);
            toggleDelete();
           refreshSale();   
      })
      .catch( (err) => {
       console.log(err);
      });
      }
      return (
        <Fragment>
        <Modal  open={open}>
              <Modal.Header>Delete Sale</Modal.Header>
              <Modal.Content >
              <p>
          Are you sure?
        </p>
        </Modal.Content>
                
              <Modal.Actions>
              <Button color='black' onClick={toggleDelete}>
                Cancel
                </Button>
                <Button color='red' onClick={() =>deleteRecord(id)}  >
            Delete
                </Button>
              </Modal.Actions>
            </Modal>
            </Fragment>
             );
            };
            export default  DeleteSale