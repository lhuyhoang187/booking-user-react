import axios from 'axios';

const axiosClient = axios.create({
    // SỬA DÒNG NÀY: Dùng process.env thay vì import.meta.env
    baseURL: process.env.REACT_APP_API_BASE_URL, 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Tự động gắn Token vào Header nếu đã đăng nhập
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosClient;