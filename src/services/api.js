import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/';

export const fetchPhotos = async (query, page) => {
  const response = await axios.get('/search/photos', {
    params: {
      client_id: 'jdnWanAYBz4I4LA-0KQ5gyMHBwUpXTqBP-s4UeHq9Lk',
      query,
      page,
      per_page: 12,
    },
  });
  return response.data.results;
};
