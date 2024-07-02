import axios from 'axios';

const apiDevsBurger = axios.create({
  baseURL: 'https://backend-devsburger.vercel.app/',
});

export default apiDevsBurger;
