import React, { createContext, useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

// Tạo hộp chứa dữ liệu Auth
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Khi tải lại trang web, tự động kiểm tra xem có token cũ không
  useEffect(() => {
    const checkUserLoggedIn = () => {
      const storedToken = localStorage.getItem('customer_token');
      const storedUser = localStorage.getItem('customer_info');
      
      if (storedToken && storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    checkUserLoggedIn();
  }, []);

  // Hàm Đăng nhập
  const login = async (email, password) => {
    try {
      // Gọi API đăng nhập của Laravel
      const response = await axiosClient.post('/auth/login', { email, password });
      
      // Giả sử Laravel trả về { access_token: "...", user: {...} }
      const { access_token, user } = response.data; 

      // Cất Token và Thông tin vào Local Storage
      localStorage.setItem('customer_token', access_token);
      localStorage.setItem('customer_info', JSON.stringify(user));
      
      setUser(user);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại!' 
      };
    }
  };

  // Hàm Đăng xuất
  const logout = () => {
    localStorage.removeItem('customer_token');
    localStorage.removeItem('customer_info');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};