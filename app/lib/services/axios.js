import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BLOG_API, // TODO: set your backend base URL
});

export default api;