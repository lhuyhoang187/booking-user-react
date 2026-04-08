import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { formatVnd } from '../utils/booking';
import axiosClient from '../services/axiosClient';

export default function OrdersPage() {
  const location = useLocation();
  const justBooked = location.state?.booked;
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // GỌI API LẤY LỊCH SỬ
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosClient.get('/bookings');
        setOrders(response.data.data);
      } catch (error) {
        console.error("Lỗi lấy lịch sử:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container">
      <div className="page-heading">
        <h1>Đơn đặt phòng của tôi</h1>
      </div>

      {justBooked && <div style={{ color: 'green', marginBottom: 20 }}>Đặt phòng thành công!</div>}

      {loading ? <p>Đang tải dữ liệu từ Backend...</p> : orders.length === 0 ? (
        <div className="orders-empty glass-card">
          <p>Bạn chưa có đơn đặt phòng nào.</p>
          <Link to="/" className="btn btn-primary">Tìm khách sạn</Link>
        </div>
      ) : (
        orders.map((o) => (
          <article key={o.id} className="order-card glass-card">
            <div className="order-card-top">
              <div>
                <p className="order-id">Mã đơn: {o.booking_code}</p>
                <h2 className="order-hotel">{o.hotel?.name || 'Khách sạn Backend'}</h2>
                <p className="order-room">Họ tên khách: {o.guest_name} - ĐT: {o.guest_phone}</p>
              </div>
              <span className="badge badge-success">
                {o.status === 0 ? 'Đang chờ xử lý' : 'Đã xác nhận'}
              </span>
            </div>
            <div className="order-grid">
              {o.details?.map(detail => (
                <React.Fragment key={detail.id}>
                  <div className="order-field"><label>Nhận phòng</label><span>{detail.check_in_date}</span></div>
                  <div className="order-field"><label>Trả phòng</label><span>{detail.check_out_date}</span></div>
                  <div className="order-field"><label>Số phòng</label><span>{detail.rooms_count}</span></div>
                </React.Fragment>
              ))}
              <div className="order-field"><label>Tổng tiền</label><span style={{ color: 'var(--color-accent)' }}>{formatVnd(o.total_amount)}</span></div>
            </div>
          </article>
        ))
      )}
    </div>
  );
}