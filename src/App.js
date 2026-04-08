import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ListingPage from './pages/ListingPage';
import HotelDetailPage from './pages/HotelDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';

// THÊM 2 DÒNG IMPORT NÀY
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import './pages/pages.css';
import './App.css';

function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hotels" element={<ListingPage />} />
            <Route path="/hotels/:id" element={<HotelDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            
            {/* THÊM 2 ĐƯỜNG DẪN NÀY VÀO HỆ THỐNG */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </BookingProvider>
  );
}

export default App;