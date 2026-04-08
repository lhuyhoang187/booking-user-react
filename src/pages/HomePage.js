import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star } from 'lucide-react'; // Thêm MapPin và Star
import { destinations } from '../data/mockHotels';
import { addDaysISODate, todayISODate } from '../utils/booking';
import axiosClient from '../api/axiosClient'; // Kéo trạm API vào

export default function HomePage() {
  const navigate = useNavigate();
  const defaultCheckIn = todayISODate();
  const defaultCheckOut = useMemo(() => addDaysISODate(defaultCheckIn, 2), [defaultCheckIn]);

  // State quản lý form tìm kiếm (Của bạn)
  const [destinationId, setDestinationId] = useState(destinations[0]?.id ?? '');
  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [error, setError] = useState('');

  // --- THÊM MỚI: State quản lý dữ liệu Khách sạn từ Laravel ---
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- THÊM MỚI: Tự động gọi API khi tải trang ---
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axiosClient.get('/hotels/search');
        // Tuỳ thuộc Laravel trả về { data: [...] } hay mảng thẳng [...]
        const hotelData = response.data?.data || response.data || [];
        setHotels(hotelData);
      } catch (error) {
        console.error('Lỗi khi tải danh sách khách sạn:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!destinationId) {
      setError('Vui lòng chọn điểm đến.');
      return;
    }
    if (!checkIn || !checkOut) {
      setError('Vui lòng chọn ngày đi và ngày về.');
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setError('Ngày về phải sau ngày đi.');
      return;
    }
    const q = new URLSearchParams({
      destination: destinationId,
      checkIn,
      checkOut,
    });
    navigate(`/hotels?${q.toString()}`);
  }

  return (
    <div>
      {/* KHU VỰC HERO & FORM TÌM KIẾM (GIỮ NGUYÊN GIAO DIỆN CỦA BẠN) */}
      <div className="hero">
        <div className="hero-bg" aria-hidden />
        <div className="hero-inner animate-fade-in-up">
          <h1 className="hero-title">
            <span className="hero-title-line">Khám phá kỳ nghỉ</span>
            <span className="hero-title-accent">
              {'trong\u00A0tầm\u00A0tay'}
            </span>
          </h1>
          <div className="hero-desc-scroll">
            <p className="hero-desc">
              Tìm khách sạn theo điểm đến, chọn ngày đi — ngày về và bắt đầu hành trình của bạn.
            </p>
          </div>
        </div>

        <form className="search-card glass-card animate-fade-in" onSubmit={handleSubmit} noValidate>
          <div className="search-card-title">Tìm phòng phù hợp</div>
          <div className="search-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="destination">
                Điểm đến
              </label>
              <select
                id="destination"
                className="form-select"
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
              >
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="checkIn">
                Ngày đi
              </label>
              <input
                id="checkIn"
                type="date"
                className="form-input"
                value={checkIn}
                min={todayISODate()}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="checkOut">
                Ngày về
              </label>
              <input
                id="checkOut"
                type="date"
                className="form-input"
                value={checkOut}
                min={checkIn || todayISODate()}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                <Search size={20} />
                Tìm kiếm
              </button>
            </div>
          </div>
          {error ? (
            <p className="checkout-hint" style={{ color: 'var(--color-error)', marginTop: 'var(--space-md)' }}>
              {error}
            </p>
          ) : null}
        </form>
      </div>

      {/* --- THÊM MỚI: KHU VỰC DANH SÁCH KHÁCH SẠN NỔI BẬT --- */}
      <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '30px' }}>
          Khám phá các khách sạn nổi bật
        </h2>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '18px' }}>Đang tải dữ liệu từ hệ thống...</p>
        ) : hotels.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '18px' }}>Hiện chưa có khách sạn nào.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
            {hotels.map((hotel) => (
              <div 
                key={hotel.id} 
                onClick={() => navigate(`/hotels/${hotel.id}`)} 
                style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', cursor: 'pointer', border: '1px solid #e2e8f0', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {/* Ảnh cover khách sạn */}
                <div style={{ height: '220px', backgroundColor: '#e2e8f0', backgroundImage: `url(${hotel.images?.[0]?.file_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a', fontWeight: 'bold' }}>{hotel.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fef08a', padding: '4px 8px', borderRadius: '6px' }}>
                      <Star size={14} color="#ca8a04" fill="#ca8a04" />
                      <span style={{ marginLeft: '4px', fontSize: '14px', fontWeight: 'bold', color: '#854d0e' }}>{hotel.star_rating || 5}</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
                    <MapPin size={16} style={{ marginRight: '6px' }} />
                    {hotel.city}
                  </div>
                  
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '15px', textAlign: 'right' }}>
                    <span style={{ fontSize: '15px', color: '#2563eb', fontWeight: 'bold' }}>Xem chi tiết ➔</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}