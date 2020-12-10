import axios from '../utils/axios';

const users = {
  addOne: async (user) => await axios.post('users', user),
  removeOne: async (id) => await axios.delete(`users/${id}`),
  fetchAll: async () => await axios.get('/users'),
  fetchById: async (id) => await axios.get(`users/${id}`),
  updateOne: async (id, user) => await axios.patch(`users/${id}`, user),
};

export default users;
