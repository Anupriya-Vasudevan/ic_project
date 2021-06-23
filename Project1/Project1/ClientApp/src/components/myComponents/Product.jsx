import React, { Component} from 'react'
import {  Table, Button, Icon,Menu,Dropdown,Pagination} from 'semantic-ui-react'
import axios from 'axios';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';
import CreateProduct from './CreateProduct';


export class Product extends Component {

  constructor(props) {
    super(props);
    this.state = { products:[],
      id:0,
      currentName:"",
      currentPrice:"",
    toggleCreateModal: false ,
    toggleEditModal: false ,
    toggleDeleteModal:false,
    togglesortnamedesc: false,
    togglesortpricedesc: false,
    currentpage: 1,
    postsPerPage:3
        };
  }

    componentDidMount(){
     
          this.getProduct();
          }
         
      getProduct()
      { 
        axios.get(`/Products/GetProduct`)
        .then(({data}) => {
            this.setState({products:data,
              
            });
        console.log({data});
        
      })
      .catch( (err) => {
       console.log(err);
      });
      }
      toggleModal = () => {
        this.setState({toggleCreateModal:!this.state.toggleCreateModal})
    };
     toggleDelete = () =>{
      this.setState({toggleDeleteModal:!this.state.toggleDeleteModal})
     };
    toggle = () => {
      this.setState({toggleEditModal:!this.state.toggleEditModal})
  };
  sortByName = () => {
    if (this.state.togglesortnamedesc === false) {
        this.setState({ products: this.state.products.sort((a, b) => a.name < b.name ? 1 : -1) })
        this.setState({ togglesortnamedesc: !this.state.togglesortnamedesc })
    }
    else {
        this.setState({ products: this.state.products.sort((a, b) => a.name > b.name ? 1 : -1) })
        this.setState({ togglesortnamedesc: !this.state.togglesortnamedesc })

    }
}
sortByPrice = () => {
    if (this.state.togglesortpricedesc === false) {
        this.setState({ products: this.state.products.sort((a, b) => a.price< b.price ? 1 : -1) })
        this.setState({ togglesortpricedesc: !this.state.togglesortpricedesc })
    }
    else {
        this.setState({ products: this.state.products.sort((a, b) => a.price > b.price ? 1 : -1) })
        this.setState({ togglesortaddrdesc: !this.state.togglesortaddrdesc })

    }
  }
  
  
    render(){
      const { products,toggleEditModal,id,currentName,currentPrice,toggleDeleteModal,toggleCreateModal,postsPerPage}=this.state;
      const indexOfLastPost = this.state.currentpage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);
        const totalPages = Math.ceil(products.length / postsPerPage);
        const options = [
            { key: 1, text: '3', value: 3 },
            { key: 2, text: '5', value: 5 },
            { key: 3, text: '10', value: 10 },
        ]  
     return (
<div>
  
<CreateProduct  open={toggleCreateModal} toggleModal={this.toggleModal} refreshProducts={()=>this.getProduct()}/>
<EditProduct open={ toggleEditModal}  toggle={this.toggle} id={id} currentName={currentName} currentPrice={currentPrice}  refreshProducts={()=>this.getProduct()}/>
<DeleteProduct open={toggleDeleteModal} toggleDelete={this.toggleDelete} id={id} refreshProducts={()=>this.getProduct()}/>
<Button primary onClick={()=>this.setState({toggleCreateModal: true })}>New Product</Button>
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name<Icon onClick={this.sortByName} name="sort" /></Table.HeaderCell>
                            <Table.HeaderCell>Price<Icon onClick={this.sortByPrice} name="sort" /></Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {currentProducts.map((p)=>(
                 <Table.Row key={p.id}>
       <Table.Cell>{p.name}</Table.Cell>
       <Table.Cell>${p.price}</Table.Cell>
       <Table.Cell><Button color='yellow' icon labelPosition='left' onClick={()=>this.setState(
         {toggleEditModal: true,
         currentName:p.name,
         currentPrice:p.price,
         id:p.id})}>
                    <Icon name='edit'/>
                  Edit</Button></Table.Cell>
       
       <Table.Cell> 
       <Button color='red' icon labelPosition='left' onClick = {()=>this.setState(
         {toggleDeleteModal: true,id:p.id})}>
        <Icon name='trash'/>
        Delete</Button>
         
       </Table.Cell>
     </Table.Row>
        ))}
      </Table.Body>
      
      <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan="4">
                                <Menu  compact>
                                    <Dropdown onChange={(e, data) => this.setState({ postsPerPage: data.value})} placeholder='Rows/Page' options={options} simple item />
                                </Menu>
                                <Menu floated="right" pagination>
                                    <Menu.Item as="a" icon>
                                        <Icon name="chevron left" />
                                    </Menu.Item>
                                    <Pagination
                                        defaultActivePage={1}
                                        onPageChange={(event, data) => this.setState({ currentpage: data.activePage})}
                                        totalPages={totalPages}
                                    />
                                    <Menu.Item as="a" icon>
                                        <Icon name="chevron right" />
                                    </Menu.Item>
                                </Menu>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
    </Table>
    
       </div>
    );
}
}
export default Product