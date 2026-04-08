import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { User, Mail, Lock } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.password_confirmation) {
      return setError('Mật khẩu nhập lại không khớp!');
    }

    try {
      await axiosClient.post('/auth/register', formData);
      setSuccess('Đăng ký thành công! Đang chuyển hướng...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi đăng ký!');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f8fafc' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', color: '#1e1b4b', marginBottom: '20px' }}>Tạo Tài Khoản Mới</h2>
        
        {error && <div style={{ color: '#ef4444', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '14px' }}>{error}</div>}
        {success && <div style={{ color: '#10b981', backgroundColor: '#d1fae5', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '14px' }}>{success}</div>}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Họ và tên</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '10px', top: '12px', color: '#94a3b8' }} />
              <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '10px 10px 10px 35px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} placeholder="Nhập họ tên" />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '10px', top: '12px', color: '#94a3b8' }} />
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '10px 10px 10px 35px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} placeholder="Nhập email" />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Mật khẩu</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '10px', top: '12px', color: '#94a3b8' }} />
              <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '10px 10px 10px 35px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} placeholder="Nhập mật khẩu" />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Nhập lại mật khẩu</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '10px', top: '12px', color: '#94a3b8' }} />
              <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required style={{ width: '100%', padding: '10px 10px 10px 35px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} placeholder="Xác nhận mật khẩu" />
            </div>
          </div>

          <button type="submit" style={{ backgroundColor: '#10b981', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
            Đăng ký
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
          Đã có tài khoản? <Link to="/login" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;