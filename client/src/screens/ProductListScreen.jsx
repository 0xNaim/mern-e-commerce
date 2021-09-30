import React, { useEffect } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  createProduct,
  deleteProduct,
  productsList,
} from '../actions/productActions';
import Message from '../components/message/Message';
import Spinner from '../components/spinner/Spinner';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(productsList());
    }
  }, [
    dispatch,
    userInfo,
    history,
    createdProduct,
    successCreate,
    successDelete,
  ]);

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure to delete this product?')) {
      dispatch(deleteProduct(id));
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const handleCreateProduct = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <Button className='my-3' onClick={handleCreateProduct}>
            <i className='fas fa-plus' /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Spinner />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Spinner />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' size='sm'>
                      <i className='fas fa-edit' />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    size='sm'
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <i className='fas fa-trash' />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
