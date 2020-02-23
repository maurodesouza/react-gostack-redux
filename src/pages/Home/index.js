import React, { Component } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import api from '../../services/api';
import { formatPrice } from '../../util/format';

import { ProductList } from './styles';

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('/products');

    const data = response.data.map(product => ({
      ...product,
      formattedPrice: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  addProduct(product) {
    const { dispatch } = this.props;

    dispatch({
      type: 'ADD_TO_CART',
      product,
    });
  }

  render() {
    const { products } = this.state;
    return (
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.formattedPrice}</span>
            <button type="button" onClick={() => this.addProduct(product)}>
              <div>
                <MdAddShoppingCart size={16} color="#fff" /> 1
              </div>
              <span>Adicionar ao carrinho</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Home);
