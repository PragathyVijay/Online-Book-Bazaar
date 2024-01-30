import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const location = useLocation();
  const totalAmount = new URLSearchParams(location.search).get('total');
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <p className="total-amount">Total Amount: ${totalAmount}</p>
      <h3> Thank You for your purchase. Do visit again</h3>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Checkout;