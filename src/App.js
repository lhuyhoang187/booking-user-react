import React, { useState, useEffect } from 'react';
import './App.css'; // <-- Dòng này cực kỳ quan trọng để gọi file CSS vào!

function App() {
  const [users, setUsers] = useState([]);
  const [currentView, setCurrentView] = useState('TABLE'); 
  const [editingUser, setEditingUser] = useState({ id: '', name: '' });
  const [newName, setNewName] = useState('');

  const fetchUsers = () => {
    fetch('http://127.0.0.1:8000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa thiên thần này không? ✨')) {
      fetch(`http://127.0.0.1:8000/users/${id}`, { method: 'DELETE' })
        .then(() => fetchUsers());
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName })
    }).then(() => {
      setNewName('');
      setCurrentView('TABLE');
      fetchUsers();
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/users/${editingUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editingUser.name })
    }).then(() => {
      setCurrentView('TABLE');
      fetchUsers();
    });
  };

  const pinkTheme = {
    sidebar: '#ffafcc',
    background: '#fff0f3',
    primary: '#ff4d6d',
    text: '#590d22',
    white: '#ffffff'
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: pinkTheme.background }}>
      
      {/* Sidebar */}
      <div style={{ width: '260px', backgroundColor: pinkTheme.sidebar, color: pinkTheme.text, padding: '30px', boxShadow: '2px 0 10px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '24px', textAlign: 'center', marginBottom: '40px' }}>🎀 King Hotel</h2>
        <ul style={{ listStyle: 'none', padding: 0, lineHeight: '3' }}>
          <li style={{ cursor: 'pointer', padding: '0 15px', borderRadius: '10px' }}>🌸 Dashboard</li>
          <li style={{ cursor: 'pointer', padding: '0 15px', borderRadius: '10px' }}>👗 Products</li>
          <li style={{ cursor: 'pointer', padding: '0 15px', borderRadius: '10px' }}>🍭 Orders</li>
          <li style={{ cursor: 'pointer', padding: '0 15px', backgroundColor: pinkTheme.white, borderRadius: '10px', fontWeight: 'bold', color: pinkTheme.primary }}>💒 Accounts</li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px' }}>
        
        {currentView === 'TABLE' && (
          <div style={{ animation: 'fadeIn 0.5s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ color: pinkTheme.text }}>Quản Lý Thành Viên 🌷</h2>
              {/* Dùng className thay vì style inline */}
              <button 
                onClick={() => setCurrentView('ADD')}
                className="btn btn-primary">
                + Thêm Thành Viên Mới
              </button>
            </div>

            <div style={{ backgroundColor: pinkTheme.white, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#ffccd5' }}>
                    <th style={{ padding: '20px', textAlign: 'left', color: pinkTheme.text }}>STT</th>
                    <th style={{ padding: '20px', textAlign: 'left', color: pinkTheme.text }}>Tên Thành Viên</th>
                    <th style={{ padding: '20px', textAlign: 'center', color: pinkTheme.text }}>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id} style={{ borderBottom: '1px solid #fff0f3' }}>
                      <td style={{ padding: '15px 20px', fontWeight: 'bold' }}>{index + 1}</td>
                      <td style={{ padding: '15px 20px', fontWeight: '600', color: '#c9184a' }}>{user.name}</td>
                      <td style={{ padding: '15px 20px', textAlign: 'center' }}>
                        {/* Nút Sửa và Xóa gắn class */}
                        <button 
                          onClick={() => { setEditingUser(user); setCurrentView('EDIT'); }}
                          className="btn btn-edit">
                          Sửa
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="btn btn-delete">
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {(currentView === 'ADD' || currentView === 'EDIT') && (
          <div style={{ maxWidth: '500px', margin: '50px auto', backgroundColor: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', animation: 'slideUp 0.4s' }}>
            <h2 style={{ textAlign: 'center', color: pinkTheme.primary, marginBottom: '30px' }}>
              {currentView === 'ADD' ? 'Thêm Thiên Thần Mới 👼' : 'Chỉnh Sửa Thông Tin 🦄'}
            </h2>
            <form onSubmit={currentView === 'ADD' ? handleCreate : handleUpdate}>
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '10px', color: pinkTheme.text, fontWeight: 'bold' }}>Tên hiển thị</label>
                <input 
                  type="text" 
                  value={currentView === 'ADD' ? newName : editingUser.name} 
                  onChange={(e) => currentView === 'ADD' ? setNewName(e.target.value) : setEditingUser({ ...editingUser, name: e.target.value })} 
                  required
                  style={{ width: '100%', padding: '15px', borderRadius: '15px', border: '2px solid #ffccd5', outline: 'none', fontSize: '16px' }}
                />
              </div>
              
              {/* Nút Lưu và Hủy gắn class */}
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '15px' }}>
                {currentView === 'ADD' ? 'Tạo Ngay ✨' : 'Cập Nhật 💖'}
              </button>
              <button type="button" onClick={() => setCurrentView('TABLE')} className="btn btn-cancel">
                Quay lại bảng
              </button>
            </form>
          </div>
        )}

      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
}

export default App;