import React, { useState,useEffect} from 'react';
import { Button,  Form, Modal } from 'semantic-ui-react'
import axios from 'axios';
import moment from 'moment';

const EditSale= (props) =>{
    const {open,toggle,currid,currentCustomerId,currentProductId,currentStoreId,currentDate,customers, products, stores,
    refreshSale} =props;
    //console.log(currentDate);
    const [productId, setProductId] = useState(0);
    const [customerId, setCustomerId] = useState(0);
    const [storeId, setStoreId] = useState(0);
    const [dateSold, setDateSold] = useState(0);
   
    
    useEffect(() => {
      setProductId(currentProductId);
      setCustomerId(currentCustomerId);
      setStoreId(currentStoreId);
      setDateSold(new Date(currentDate).toDateString());
    }, [open]);

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
            value={moment(dateSold).format("YYYY-MM-DD")}
            //value={currentDate}
            onChange={(e) => setDateSold(e.target.value)}
            required
          />

          <Form.Field label="Customer" control="select" value={customerId}  onChange={(e) => setCustomerId(e.target.value)} required>
          <option key="0" value="">-select customer-</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
         
          </Form.Field>
          <Form.Field
            label="Product"
            control="select"
            value={productId}
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
            value={storeId}
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