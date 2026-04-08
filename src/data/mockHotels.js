/** Dữ liệu mẫu — thay bằng API khi tích hợp backend */

export const destinations = [
  { id: 'hcm', name: 'Hồ Chí Minh' },
  { id: 'hn', name: 'Hà Nội' },
  { id: 'dn', name: 'Đà Nẵng' },
  { id: 'pq', name: 'Phú Quốc' },
  { id: 'dl', name: 'Đà Lạt' },
];

export const hotels = [
  {
    id: 'h1',
    destinationId: 'hcm',
    name: 'Saigon Pearl Hotel',
    address: '92 Nguyễn Huệ, Quận 1, TP.HCM',
    rating: 4.7,
    reviewCount: 328,
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    description:
      'Khách sạn trung tâm quận 1, view thành phố, bể bơi vô cực và nhà hàng rooftop.',
    rooms: [
      {
        id: 'h1-r1',
        name: 'Phòng Superior',
        price: 1890000,
        capacity: 2,
        beds: '1 giường đôi',
        area: '26 m²',
        amenities: ['WiFi', 'Điều hòa', 'Minibar'],
      },
      {
        id: 'h1-r2',
        name: 'Phòng Deluxe City View',
        price: 2490000,
        capacity: 2,
        beds: '1 giường đôi',
        area: '32 m²',
        amenities: ['WiFi', 'Ban công', 'Bồn tắm'],
      },
    ],
  },
  {
    id: 'h2',
    destinationId: 'hcm',
    name: 'The Urban Retreat',
    address: '45 Lê Lợi, Quận 1, TP.HCM',
    rating: 4.5,
    reviewCount: 201,
    image:
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    description: 'Thiết kế hiện đại, gần chợ Bến Thành, phù hợp công tác và nghỉ dưỡng ngắn ngày.',
    rooms: [
      {
        id: 'h2-r1',
        name: 'Phòng Standard',
        price: 1290000,
        capacity: 2,
        beds: '2 giường đơn',
        area: '22 m²',
        amenities: ['WiFi', 'Điều hòa'],
      },
      {
        id: 'h2-r2',
        name: 'Suite Executive',
        price: 3290000,
        capacity: 3,
        beds: '1 giường king + sofa',
        area: '45 m²',
        amenities: ['WiFi', 'Phòng khách', 'Bồn tắm'],
      },
    ],
  },
  {
    id: 'h3',
    destinationId: 'hn',
    name: 'Hoàn Kiếm Boutique',
    address: '18 Hàng Gai, Hoàn Kiếm, Hà Nội',
    rating: 4.8,
    reviewCount: 412,
    image:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    description: 'View phố cổ, cách Hồ Hoàn Kiếm vài phút đi bộ.',
    rooms: [
      {
        id: 'h3-r1',
        name: 'Phòng cổ điển',
        price: 1590000,
        capacity: 2,
        beds: '1 giường đôi',
        area: '24 m²',
        amenities: ['WiFi', 'Điều hòa'],
      },
      {
        id: 'h3-r2',
        name: 'Phòng gia đình',
        price: 2190000,
        capacity: 4,
        beds: '2 giường đôi',
        area: '38 m²',
        amenities: ['WiFi', 'Bếp nhỏ'],
      },
    ],
  },
  {
    id: 'h4',
    destinationId: 'dn',
    name: 'My Khe Ocean Resort',
    address: '120 Võ Nguyên Giáp, Đà Nẵng',
    rating: 4.6,
    reviewCount: 267,
    image:
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    description: 'Resort sát biển Mỹ Khê, bể bơi và spa.',
    rooms: [
      {
        id: 'h4-r1',
        name: 'Bungalow hướng biển',
        price: 2890000,
        capacity: 2,
        beds: '1 giường king',
        area: '40 m²',
        amenities: ['WiFi', 'Ban công', 'Bồn tắm ngoài trời'],
      },
      {
        id: 'h4-r2',
        name: 'Phòng Deluxe',
        price: 1990000,
        capacity: 2,
        beds: '1 giường đôi',
        area: '30 m²',
        amenities: ['WiFi', 'Minibar'],
      },
    ],
  },
  {
    id: 'h5',
    destinationId: 'pq',
    name: 'Sunset Bay Phú Quốc',
    address: 'Bãi Dài, Phú Quốc',
    rating: 4.9,
    reviewCount: 156,
    image:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    description: 'Khu nghỉ dưỡng biệt lập, bãi biển riêng.',
    rooms: [
      {
        id: 'h5-r1',
        name: 'Villa hồ bơi',
        price: 4590000,
        capacity: 4,
        beds: '2 phòng ngủ',
        area: '85 m²',
        amenities: ['WiFi', 'Hồ bơi riêng', 'Bếp'],
      },
    ],
  },
  {
    id: 'h6',
    destinationId: 'dl',
    name: 'Đà Lạt Mist Valley',
    address: '12 Đường Mimosa, Đà Lạt',
    rating: 4.4,
    reviewCount: 89,
    image:
      'https://images.unsplash.com/photo-1445019980599-00345384afe3?w=800&q=80',
    description: 'View thung lũng, không khí trong lành.',
    rooms: [
      {
        id: 'h6-r1',
        name: 'Phòng có lò sưởi',
        price: 1390000,
        capacity: 2,
        beds: '1 giường đôi',
        area: '28 m²',
        amenities: ['WiFi', 'Lò sưởi', 'Điều hòa'],
      },
    ],
  },
];

export function getHotelById(id) {
  return hotels.find((h) => h.id === id);
}

export function getDestinationName(destinationId) {
  return destinations.find((d) => d.id === destinationId)?.name ?? destinationId;
}

export function filterHotels(destinationId) {
  if (!destinationId) return hotels;
  return hotels.filter((h) => h.destinationId === destinationId);
}
