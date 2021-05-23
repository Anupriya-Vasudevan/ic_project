import React, { useState  } from 'react';
import { Button,  Form, Modal } from 'semantic-ui-react'
import axios from 'axios';
  
const CreateSale = (props) =>{
  const {open, toggleModal, refreshSale,customers,products,stores } =props;
  const [productId, setproductId] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [storeId, setStoreId] = useState(0);
  const [dateSold, setDateSold] = useState(0);

const  createSale=() => {
  axios.post(`/Sales/PostSales`, {
    productId: productId,
    customerId: customerId,
    storeId: storeId,
    dateSold: dateSold,
  })
.then((res) => {
    // this.getData();
     console.log(res);
     toggleModal();
     refreshSale();
    
    
})

.catch( (err) => {
console.log(err);
});
}
return (
  <Modal  open={open}>
    <Modal.Header>Create Sale</Modal.Header>
    <Modal.Content >
      
      <Modal.Description>
      <Form>
      <Form.Field>
    <label>DateSold</label>
    <input placeholder='Enter the Date'  type="date"
            onChange={(e) => setDateSold(e.target.value)}
            required/>
  </Form.Field>
 
  
  <Form.Field label="Customer" control="select" onChange={(e) => setCustomerId(e.target.value)} required>
          <option key="0" value="">-select customer-</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </Form.Field>
          <Form.Field label="Product" control="select" onChange={(e) => setproductId(e.target.value)} required>
          <option key="0" value="">-select product-</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </Form.Field>
          <Form.Field label="Store" control="select" onChange={(e) => setStoreId(e.target.value)} required>
          <option key="0" value="">-select store-</option>
            {stores.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </Form.Field>
  
</Form>
</Modal.Description>
    </Modal.Content>
    <Modal.Actions>
    <Button color='black' onClick={toggleModal}>
      Cancel
      </Button>
      <Button color='green'   labelPosition="right" icon name="check" onClick={createSale} >
     Creates
      </Button>
    </Modal.Actions>
  </Modal>
)
}
export default CreateSale