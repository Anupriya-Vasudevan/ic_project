import React, { useState} from 'react'
import {  columns, Button, Moment,Fragment} from 'semantic-ui-react'
import axios from 'axios';
import EditSale from './EditSale';
import DeleteSale from './DeleteSale'

const SalesTable = (props) => {
    const { sales, refreshSale, customers, products, stores } = props;
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
  
    const [currSale, setCurrSale] = useState({
      id: 0,
      productId: 0,
      customerId: 0,
      storeId: 0,
      dateSold: null,
    });
  
    const deleteSale = (id) => {
      axios
        .delete(`/api/Sales/${id}`)
        .then((res) => {
          console.log(res);
          refreshSale();
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  
    const columns = [
      {
        name: "Customer",
        cell: (row) => row.customer.name,
        sortable: true,
      },
      {
        name: "Product",
        cell: (row) => row.product.name,
        sortable: true,
      },
      {
        name: "Store",
        cell: (row) => row.store.name,
        sortable: true,
      },
      {
        name: "Date sold",
        cell: (row) => <Moment format="D MMM, YYYY">{row.dateSold}</Moment>,
        sortable: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <Button
            content="Edit"
            icon="edit"
            color="yellow"
            onClick={() => {
              setCurrSale(row);
              setEditModalOpen(true);
            }}
          />
        ),
      },
      {
        name: "Actions",
        cell: (row) => (
          <Button
            content="Delete"
            icon="trash alternate"
            color="red"
            onClick={() => {
              setCurrSale(row);
              setDeleteModalOpen(true);
            }}
          />
        ),
      },
    ];
  
    return (
      <Fragment>
        
  
        <DeleteSale
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          deleteAction={deleteSale}
          actionId={currSale.id}
          actionName="Sale"
        />
        <EditSale
          editModalOpen={editModalOpen}
          setEditModalOpen={setEditModalOpen}
          sales={currSale}
          refreshSale={refreshSale}
          customers={customers}
          products={products}
          stores={stores}
        />
      </Fragment>
    );
  };
  
  export default SalesTable;
  
  