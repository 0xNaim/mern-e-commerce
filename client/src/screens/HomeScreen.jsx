import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { productsList } from '../actions/productActions';
import Message from '../components/message/Message';
import Product from '../components/product/Product';
import Spinner from '../components/spinner/Spinner';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(productsList());
  }, [dispatch]);

  return (
    <>
      <h3 className='mb-3'>Latest Products</h3>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products &&
            products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
