const config = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  hourlyImageUrl: import.meta.env.VITE_HOURLY_IMAGE_URL || 'hourly.jpg',
};

export default config