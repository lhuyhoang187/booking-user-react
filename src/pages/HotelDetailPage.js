import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { MapPin, Star, Users, Info, ArrowLeft, BedDouble } from 'lucide-react';

const HotelDetailPage = () => {
  const { id } = useParams(); // Lấy số ID từ URL (VD: /hotels/4 -> id = 4)
  const navigate = useNavigate();
  
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Tự động gọi API lấy chi tiết khách sạn khi mở trang
  useEffect(() => {
    const fetchHotelDetail = async () => {
      try {
        const response = await axiosClient.get(`/hotels/${id}`);
        // Backend trả về: { message: "...", data: { ... } }
        setHotel(response.data.data);
      } catch (err) {
        console.error(err);
        setError('Không tìm thấy khách sạn hoặc có lỗi xảy ra.');
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetail();
  }, [id]);

  // Hàm format tiền Việt Nam (VD: 500000 -> 500.000 ₫)
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Nếu đang tải dữ liệu
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <h3 style={{ color: '#64748b' }}>Đang tải thông tin khách sạn...</h3>
      </div>
    );
  }

  // Nếu bị lỗi (như ảnh báo 404 lúc nãy của bạn)
  if (error || !hotel) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <h3 style={{ color: '#ef4444', marginBottom: '20px' }}>{error || 'Không tìm thấy khách sạn.'}</h3>
        <button 
          onClick={() => navigate('/')}
          style={{ backgroundColor: '#3b82f6', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Về trang chủ
        </button>
      </div>
    );
  }

  // Lấy ảnh cover (nếu không có thì dùng ảnh mặc định)
  const coverImage = hotel.images?.[0]?.file_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&q=80';

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* 1. KHU VỰC ẢNH BANNER KHÁCH SẠN */}
      <div style={{ position: 'relative', height: '400px', backgroundImage: `url(${coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '40px 20px' }}>
          <button 
            onClick={() => navigate('/')} 
            style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', backdropFilter: 'blur(4px)' }}
          >
            <ArrowLeft size={18} /> Quay lại
          </button>

          <h1 style={{ color: 'white', fontSize: '36px', marginBottom: '10px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {hotel.name}
          </h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#f8fafc' }}>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#eab308', padding: '4px 10px', borderRadius: '6px', color: '#713f12', fontWeight: 'bold' }}>
              <Star size={16} fill="currentColor" style={{ marginRight: '5px' }} />
              {hotel.star_rating || 5} Sao
            </div>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
              <MapPin size={18} style={{ marginRight: '5px', color: '#ef4444' }} />
              {hotel.address}, {hotel.city}
            </div>
          </div>
        </div>
      </div>

      {/* 2. KHU VỰC THÔNG TIN VÀ DANH SÁCH PHÒNG */}
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
        
        {/* Giới thiệu khách sạn */}
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '22px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px', color: '#1e293b' }}>
            Giới thiệu về khách sạn
          </h2>
          <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '16px', whiteSpace: 'pre-line' }}>
            {hotel.description || 'Khách sạn chưa cập nhật bài giới thiệu chi tiết.'}
          </p>
        </div>

        {/* Danh sách các loại phòng (Room Types) */}
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px' }}>
            Các loại phòng đang có sẵn
          </h2>

          {hotel.room_types && hotel.room_types.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {hotel.room_types.map((room) => (
                <div key={room.id} style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  
                  {/* Ảnh minh họa phòng (dùng tạm ảnh nền nếu chưa có ảnh phòng cụ thể) */}
                  <div style={{ flex: '1 1 250px', minHeight: '200px', backgroundColor: '#cbd5e1', backgroundImage: 'url(https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                  
                  {/* Thông tin phòng */}
                  <div style={{ flex: '2 1 400px', padding: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '20px', color: '#0f172a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <BedDouble size={22} color="#3b82f6" /> {room.name}
                      </h3>
                      
                      <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', color: '#64748b', fontSize: '14px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <Users size={16} /> Sức chứa: {room.capacity || 2} người
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <Info size={16} /> Kích thước: {room.size || '30'} m²
                        </span>
                      </div>
                      
                      <p style={{ color: '#475569', fontSize: '14px', marginBottom: '20px' }}>
                        {room.description || 'Phòng nghỉ tiện nghi, sạch sẽ, phù hợp cho kỳ nghỉ của bạn.'}
                      </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px dashed #cbd5e1', paddingTop: '20px' }}>
                      <div>
                        <span style={{ display: 'block', fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Giá mỗi đêm từ</span>
                        <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444' }}>
                          {formatPrice(room.base_price)}
                        </span>
                      </div>
                      
                      {/* Nút Đặt phòng sẽ dẫn sang trang Checkout */}
                      <button 
                        onClick={() => navigate(`/checkout?room_id=${room.id}&hotel_id=${hotel.id}`)}
                        style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                      >
                        Chọn phòng này
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', textAlign: 'center', color: '#64748b' }}>
              Khách sạn này hiện chưa thiết lập loại phòng nào.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default HotelDetailPage;