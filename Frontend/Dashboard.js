import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch books data from the backend when the component mounts
    axios.get('http://localhost:3001/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleAddToCart = (bookId) => {
    // Find the book with the given ID
    const selectedBook = books.find(book => book.bid === bookId);

    // Check if the book is already in the cart
    const existingItem = cart.find(item => item.book.bid === bookId);

    // If the book is not in the cart, add it with a quantity of 1
    if (!existingItem && selectedBook) {
      setCart([...cart, { book: selectedBook, quantity: 1 }]);
      console.log(`Book "${selectedBook.bname}" added to cart.`);
    } else {
      // If the book is already in the cart, update the quantity
      const updatedCart = cart.map(item =>
        item.book.bid === bookId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      console.log(`Quantity of "${selectedBook.bname}" increased in cart.`);
    }
  };

  const handleBuyNow = () => {
    // Calculate the total amount of the books in the cart
    const totalAmount = cart.reduce((acc, item) => acc + item.book.bprice * item.quantity, 0);

    // Redirect to the checkout page with the total amount as a query parameter
    navigate(`/checkout?total=${totalAmount}`);
  };

  return (
    <div className="dashboard-container">
      <h1>BOOKSTORE DASHBOARD</h1>
      <div className="book-list-container">
        <h2>Book List</h2>
        <ul className="book-list">
          {books.map(book => (
            <li key={book.bid} className="book-item">
              <img src={book.burl} alt={`${book.bname} cover`} className="book-image" />
              <div className="book-details-container">
                <div className="book-title">{book.bname}</div>
                <div className="book-author">by {book.bauthor}</div>
                <div className="book-bprice">${book.bprice}</div>
                <button onClick={() => handleAddToCart(book.bid)}>Add to Cart</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <ul className="cart-list">
          {cart.map(item => (
            <li key={item.book.bid}>
              {item.book.bname} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
        <button onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
};

export default Dashboard;
