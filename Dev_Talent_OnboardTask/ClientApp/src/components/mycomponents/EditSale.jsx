import React, { useState} from 'react';
import { Button,  Form, Modal } from 'semantic-ui-react'
import axios from 'axios';


const EditSale= (props) =>{
    const {open,toggle,currid,currentCustomerId,currentProductId,currentStoreId,currentDate,customers, products, stores,
    refreshSale} =props;
    const [productId, setProductId] = useState(currentProductId);
    const [customerId, setCustomerId] = useState(currentCustomerId);
    const [storeId, setStoreId] = useState(currentStoreId);
    const [dateSold, setDateSold] = useState(currentDate);
    
    
  
    
  
    const  editSale=(currid) => {
      axios.put(`/Sales/PutSales/${currid}`,{
        id:currid,
        productId: productId,
        customerId: customerId,
        storeId: storeId,
        dateSold: dateSold,
    })
        .then((res) => {
          toggle();
            refreshSale();
            setCustomerId(currentCustomerId);
      setProductId( currentProductId);
      setStoreId(currentStoreId);
      setDateSold(currentDate);
            
            
        })
        .catch((err) => {
            console.log(err)
        });
};
        
      return (
       
       <Modal
      size="mini"
      dimmer="blurring"
      
      open={open}
    >
      <Modal.Header>Edit Sale</Modal.Header>
      <Modal.Content>
        <Form>
        <Form.Field
            label="Date sold"
            control="input"
            type="date"
            value={currentDate}
            onChange={(e) => setDateSold(e.target.value)}
            required
          />

          <Form.Field
            label="Customer"
            control="select"
            value={currentCustomerId}
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
            value={currentProductId}
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
            value={currentStoreId}
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
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={toggle}>
          Cancel
        </Button>
        <Button
          color="green"
          content="Edit"
          labelPosition="right"
          icon="check"
          onClick={() => {
            editSale(currid);
          }}
        />
      </Modal.Actions>
    </Modal>
  );
  
  }
            
            export default  EditSale