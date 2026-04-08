import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useBookingOrders } from '../context/BookingContext';
import { formatVnd } from '../utils/booking';
import axiosClient from '../services/axiosClient';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addOrder } = useBookingOrders();
  const state = location.state;

  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (
    !state?.hotelId ||
    !state?.roomId ||
    !state?.checkIn ||
    !state?.checkOut
  ) {
    return (
      <div className="container">
        <div className="empty-state glass-card">
          <p>Chưa có thông tin đặt phòng. Vui lòng chọn phòng từ trang chi tiết khách sạn.</p>
          <Link to="/" className="btn btn-primary">
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  const {
    hotelName,
    roomName,
    roomPrice,
    checkIn,
    checkOut,
    nights,
  } = state;

  const total = roomPrice * nights;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const name = guestName.trim();
    const tel = phone.replace(/\s/g, '');
    
    if (!name || !/^[0-9]{9,11}$/.test(tel)) {
      setError('Vui lòng nhập họ tên và số điện thoại hợp lệ.');
      return;
    }

    setSubmitting(true);
    
    try {
      // GỌI API ĐẶT PHÒNG CỦA BACKEND
      const response = await axiosClient.post('/bookings', {
        room_type_id: 1, // Tạm hardcode bằng 1 (Standard Room) vì dữ liệu detail đang lấy từ Mock
        check_in: checkIn,
        check_out: checkOut,
        quantity: 1, // Mặc định đặt 1 phòng
        customer_name: name,
        customer_phone: tel
      });

      alert(`Thành công! Mã đơn: ${response.data.data.booking_code}`);
      navigate('/orders', { replace: true, state: { booked: true } });
      
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra từ Server. Hết phòng hoặc sai thông tin.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="page-heading animate-fade-in-up">
        <h1>Thanh toán &amp; xác nhận</h1>
        <p>Kiểm tra thông tin và hoàn tất đặt phòng (thanh toán khi nhận phòng).</p>
      </div>

      <div className="checkout-summary glass-card">
        <h2 className="section-title" style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-md)' }}>
          Chi tiết đặt phòng
        </h2>
        <dl>
          <div>
            <dt>Khách sạn</dt>
            <dd>{hotelName}</dd>
          </div>
          <div>
            <dt>Phòng</dt>
            <dd>{roomName}</dd>
          </div>
          <div>
            <dt>Ngày nhận / trả phòng</dt>
            <dd>
              {checkIn} → {checkOut} ({nights} đêm)
            </dd>
          </div>
          <div>
            <dt>Giá mỗi đêm</dt>
            <dd>{formatVnd(roomPrice)}</dd>
          </div>
        </dl>
        <div className="checkout-total">
          <span className="checkout-total-label">Tổng cộng</span>
          <span className="checkout-total-value">{formatVnd(total)}</span>
        </div>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2 className="section-title" style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-md)' }}>
          Thông tin người đặt
        </h2>
        <div className="form-group">
          <label className="form-label" htmlFor="guestName">
            Họ và tên
          </label>
          <input
            id="guestName"
            className="form-input"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            autoComplete="name"
            placeholder="Nguyễn Văn A"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="phone">
            Số điện thoại
          </label>
          <input
            id="phone"
            className="form-input"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ''))}
            autoComplete="tel"
            placeholder="0901234567"
          />
        </div>

        {error ? (
          <p style={{ color: 'var(--color-error)', marginBottom: 'var(--space-md)', fontSize: 'var(--font-size-sm)' }}>
            {error}
          </p>
        ) : null}

        <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>
          Xác nhận đặt phòng (Thanh toán tại khách sạn)
        </button>

        <p className="checkout-hint">
          Bạn sẽ thanh toán trực tiếp tại khách sạn khi nhận phòng. Chúng tôi chỉ lưu thông tin đặt chỗ trên thiết bị của bạn (demo).
        </p>
      </form>
    </div>
  );
}
