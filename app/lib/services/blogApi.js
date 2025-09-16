import axios from 'axios';

const blogApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BLOG_API,
});

export default blogApi;