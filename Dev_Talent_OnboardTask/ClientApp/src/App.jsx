import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Customer } from './components/mycomponents/Customer';
import { Product } from './components/mycomponents/Product';
import { Store } from './components/mycomponents/Store';
import { SalesTable } from './components/mycomponents/SalesTable';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/customer' component={Customer} />
        <Route path='/Product' component={Product} />
        <Route path='/Store' component={Store} />
        <Route path='/Sales' component={SalesTable} />
      </Layout>
    );
  }
}
