import axios from '../utils/axios';

export async function login(data) {
  return await axios.post('/auth/login', data);
}
