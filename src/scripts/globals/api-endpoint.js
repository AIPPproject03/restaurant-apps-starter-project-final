// src/public/globals/api-endpoint.js
import CONFIG from './config';

const API_ENDPOINT = {
  LIST: `${CONFIG.BASE_URL}/list`,
  DETAIL: (id) => `${CONFIG.BASE_URL}/detail/${id}`, // Add endpoint for detail with restaurant id
};

export default API_ENDPOINT;
