import { blogPreviews } from "@/app/data/blogPreviews";
import { blog } from "@/app/data/blog";
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BLOG_API;

export const blogService = {
    async getBlogPreviewsFromAPI() {
        try {
            const response = await axios.get(`${API_BASE_URL}/blogs/blogs`);
            return response.data;
        } catch (error) {
            console.error("Error fetching blog previews:", error);
            throw error;
        }
    },

    async getBlogPreviews() {
        return blogPreviews
    },
    async getBlog(id) {
        return blog.find(blogEntry => blogEntry.id === id);
    }
}

export default blogService;