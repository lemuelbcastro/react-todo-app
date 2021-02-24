import axios from '../utils/axios';

const todos = {
  addOne: async (user) => await axios.post('todos', user),
  removeOne: async (id) => await axios.delete(`todos/${id}`),
  fetchAll: async () => await axios.get('/todos'),
  fetchById: async (id) => await axios.get(`todos/${id}`),
  updateOne: async (id, user) => await axios.patch(`todos/${id}`, user),
};

export default todos;
