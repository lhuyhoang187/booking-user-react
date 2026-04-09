import axios from 'axios';

// Khởi tạo trạm phát sóng mặc định nối tới Laravel (Backend)
const axiosClient = axios.create({
  baseURL: 'https://booking-backend-laravel-production.up.railway.app/api', // Chú ý: Đảm bảo Backend Laravel của bạn đang chạy ở port 8000
  headers: {
    'Content-Type': 'application/json',
  },
});

// INTERCEPTOR: Người gác cổng tự động
// Trước khi bất kỳ Request nào được gửi đi, nó sẽ chạy qua đây
axiosClient.interceptors.request.use(
  (config) => {
    // Tìm trong localStorage xem có Thẻ ra vào (Token) của Khách hàng không
    const token = localStorage.getItem('customer_token');
    if (token) {
      // Nếu có, tự động kẹp vào phần Header để gửi cho Laravel
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;