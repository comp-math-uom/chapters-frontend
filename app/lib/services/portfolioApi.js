import axios from 'axios';

const portfolioApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_PORTFOLIO_API_URL,
});

export default portfolioApi;