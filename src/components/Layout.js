import React, { useContext } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Building2, ClipboardList, Home, LogIn, LogOut, UserCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext'; // Nhúng kho dữ liệu Auth

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Lấy thông tin user và hàm logout từ AuthContext
  const { user, logout } = useContext(AuthContext);

  // Hàm xử lý khi bấm Đăng xuất
  const handleLogout = () => {
    logout();
    navigate('/'); // Đăng xuất xong đẩy về trang chủ
  };

  return (
    <div className="app-shell">
      <header className="app-header glass-card">
        <div className="container app-header-inner">
          
          <Link to="/" className="app-brand">
            <span className="app-brand-icon">
              <Building2 size={22} strokeWidth={2} />
            </span>
            <span className="app-brand-text">StayBook</span>
          </Link>

          <nav className="app-nav" aria-label="Điều hướng chính" style={{ display: 'flex', alignItems: 'center' }}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `app-nav-link ${isActive ? 'active' : ''}`
              }
            >
              <Home size={18} />
              Trang chủ
            </NavLink>
            
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `app-nav-link ${isActive ? 'active' : ''}`
              }
            >
              <ClipboardList size={18} />
              Đơn của tôi
            </NavLink>

            {/* --- Vạch kẻ phân cách --- */}
            <div style={{ width: '1px', height: '24px', backgroundColor: '#cbd5e1', margin: '0 15px' }}></div>

            {/* --- KHU VỰC TÀI KHOẢN --- */}
            {user ? (
              // Nếu đã đăng nhập: Hiện Tên người dùng và nút Đăng xuất
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', color: '#1e293b' }}>
                  <UserCircle size={18} color="#3b82f6" />
                  {user.name}
                </span>
                
                <button 
                  onClick={handleLogout} 
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '5px', 
                    background: '#fee2e2', color: '#ef4444', 
                    border: 'none', padding: '8px 12px', borderRadius: '8px', 
                    fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fecaca'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                >
                  <LogOut size={16} /> Đăng xuất
                </button>
              </div>
            ) : (
              // Nếu chưa đăng nhập: Hiện nút Đăng nhập
              <Link 
                to="/login" 
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '6px', 
                  backgroundColor: '#3b82f6', color: 'white', 
                  padding: '8px 16px', borderRadius: '8px', 
                  textDecoration: 'none', fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
                }}
              >
                <LogIn size={16} /> Đăng nhập
              </Link>
            )}

          </nav>
        </div>
      </header>

      <main className="app-main" key={location.pathname}>
        {children}
      </main>

      <footer className="app-footer">
        <div className="container">
          <p className="app-footer-text">
            © {new Date().getFullYear()} StayBook — Đặt phòng trực tuyến, thanh toán tại khách sạn.
          </p>
        </div>
      </footer>
    </div>
  );
}