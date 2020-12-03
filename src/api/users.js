import axios from '../utils/axios';

const users = {
  create: async (user) => await axios.post('users', user),
  getAll: async () => await axios.get('/users'),
  get: async (id) => await axios.get(`users/${id}`),
  update: async (id, user) => await axios.patch(`users/${id}`, user),
  delete: async (id) => await axios.delete(`users/${id}`),
};

export default users;
