import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import FormContainer from '../components/form/FormContainer';

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [shippingForm, setShippingForm] = useState({
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setShippingForm({
      ...shippingForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address: shippingForm.address,
        city: shippingForm.city,
        postalCode: shippingForm.postalCode,
        country: shippingForm.country,
      })
    );
    history.push('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h3>Shipping</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            className='mb-3'
            name='address'
            type='text'
            placeholder='Address'
            required
            value={shippingForm.address}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            className='mb-3'
            name='city'
            type='text'
            placeholder='City'
            value={shippingForm.city}
            required
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            className='mb-3'
            name='postalCode'
            type='text'
            placeholder='Enter postal code'
            value={shippingForm.postalCode}
            required
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            className='mb-3'
            name='country'
            type='text'
            placeholder='Country'
            value={shippingForm.country}
            required
            onChange={handleChange}
          />
        </Form.Group>

        <Button type='submit' variant='dark'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
