import React, { useState, Fragment} from 'react';
import { Button,  Form, Modal } from 'semantic-ui-react'
import axios from 'axios';

const EditSale= (props) =>{
    const {open,toggle,refreshSale, sales, customers, products, stores} =props;
    //const {name,address} =customer;
    const [productId, setProductId] = useState(0);
    const [customerId, setCustomerId] = useState(0);
    const [storeId, setStoreId] = useState(0);
    const [dateSold, setDateSold] = useState(0);
  
    
  
    const  editSale=() => {
      axios.put(`/Sales/PutSales/${sales.id}`,{
        id: sales.id,
        productId: productId,
        customerId: customerId,
        storeId: storeId,
        dateSold: dateSold,
    })
        .then((res) => {
            refreshSale();
            toggle();
            
        })
        .catch((err) => {
            console.log(err)
        });
};
        
      return (
        <Fragment>
        <Modal  open={open}>
              <Modal.Header>Edit Sale</Modal.Header>
              <Modal.Content >
                
                <Modal.Description>
                <Form>
                <Form.Field
            label="Date sold"
            control="input"
            type="date"
            value={dateSold}
            onChange={(e) => setDateSold(e.target.value)}
            required
          />

          <Form.Field
            label="Customer"
            control="select"
           
            onChange={(e) => setCustomerId(e.target.value)}
            required
          >
            <option key="0" value="">
              -select customer-
            </option>
            {customers.map((c) => (
              <option key={c.id} value={c.id} >
                {c.name}
              </option>
            ))}
          </Form.Field>
          <Form.Field
            label="Product"
            control="select"
           
            onChange={(e) => setProductId(e.target.value)}
            required
          >
            <option key="0" value="">
              -select product-
            </option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Form.Field>
          <Form.Field
            label="Store"
            control="select"
            
            onChange={(e) => setStoreId(e.target.value)}
            required
          >
            <option key="0" value="">
              -select store-
            </option>
            {stores.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Form.Field>
          </Form>
          </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button color='black' onClick={toggle}>
                Cancel
                </Button>
                <Button color='green' onClick={() =>editSale()}  >
             Edit
                </Button>
              </Modal.Actions>
            </Modal>
            </Fragment>
             );
            };
            export default  EditSale