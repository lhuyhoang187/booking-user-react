import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { getDestinationName } from '../data/mockHotels';
import { formatVnd } from '../utils/booking';
import axiosClient from '../services/axiosClient';

export default function ListingPage() {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get('destination') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const destName = destination ? getDestinationName(destination) : 'Tất cả điểm đến';
  const querySuffix = `?destination=${destination}&checkIn=${checkIn}&checkOut=${checkOut}`;

  // GỌI API BACKEND TẠI ĐÂY
  useEffect(() => {
    const fetchHotels = async () => {
      if (!checkIn || !checkOut) return;
      setLoading(true);
      try {
        // Chuyển mã 'hcm' thành tên thành phố để gửi cho Backend
        const cityMap = { hcm: 'Ho Chi Minh', hn: 'Ha Noi', dn: 'Da Nang', pq: 'Phu Quoc', dl: 'Da Lat' };
        
        const response = await axiosClient.get('/hotels/search', {
          params: {
            city: cityMap[destination] || '',
            check_in: checkIn,
            check_out: checkOut
          }
        });
        setList(response.data.data);
      } catch (error) {
        console.error("Lỗi gọi API Tìm kiếm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [destination, checkIn, checkOut]);

  return (
    <div className="container">
      <div className="page-heading animate-fade-in-up">
        <h1>Kết quả tìm kiếm</h1>
        <p>{destName} {checkIn && checkOut ? `— ${checkIn} → ${checkOut}` : null}</p>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Đang tìm khách sạn trống, vui lòng đợi...</p>
      ) : list.length === 0 ? (
        <div className="empty-state glass-card">
          <p>Không có khách sạn nào trống phòng trong thời gian này.</p>
          <Link to="/" className="btn btn-primary">Về trang chủ</Link>
        </div>
      ) : (
        <div className="hotel-grid">
          {list.map((hotel, index) => (
            <Link key={hotel.id} to={`/hotels/${hotel.id}${querySuffix}`} className="hotel-card glass-card animate-fade-in-up">
              <div className="hotel-card-image-wrap">
                {/* Tạm dùng ảnh mặc định vì Database chưa có cột Image */}
                <img className="hotel-card-image" src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80" alt="" />
                <span className="hotel-card-rating">
                  <Star size={14} fill="currentColor" /> {hotel.star_rating} Sao
                </span>
              </div>
              <div className="hotel-card-body">
                <h2 className="hotel-card-name">{hotel.name}</h2>
                <p className="hotel-card-address">
                  <MapPin size={14} style={{ display: 'inline', marginRight: 4 }} />
                  {hotel.address}, {hotel.city}
                </p>
                <div className="hotel-card-meta">
                  <span className="hotel-card-from">Giá từ Backend</span>
                  <span className="hotel-card-price">{formatVnd(500000)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}