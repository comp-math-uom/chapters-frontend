import { authors } from "@/app/data/authors";
import { blogComments } from "@/app/data/blogComment";
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BLOG_API;

export const blogService = {
    async likeBlog(blogId, userId, status = 1) {
        try {
            const response = await axios.post(`${API_BASE_URL}/blogs/blog/${blogId}/like`, { "like_value": status }, {
                headers: {
                    'x-user-id': userId
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error liking blog ${blogId} by user ${userId}:`, error);
            throw error;
        }
    },

    async isLikedByUser(blogId, userId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/blogs/blog/${blogId}/like-status`, {
                headers: {
                    'x-user-id': userId
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error checking if blog ${blogId} is liked by user ${userId}:`, error);
            throw error;
        }
    },

    async getBlogPreviewsFromAPI() {
        try {
            const response = await axios.get(`${API_BASE_URL}/blogs/blogs`);
            return response.data;
        } catch (error) {
            console.error("Error fetching blog previews:", error);
            throw error;
        }
    },

    async getBlogByIdFromAPI(id) {
        try {
            const response = await axios.get(`${API_BASE_URL}/blogs/blog/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching blog with ID ${id}:`, error);
            throw error;
        }
    },
    
    async createBlog(blogData) {
        try {
            const headers = {
                'x-user-id': '1',
            };
            const response = await axios.post(`${API_BASE_URL}/blogs/createblog`, blogData, { headers });
            return response.data;
        } catch (error) {
            console.error("Error creating blog:", error);
            throw error;
        }
    },

    async updateBlog(id, blogData) {
        try {
            const headers = {
                'x-user-id': '1',
            };
            const response = await axios.put(`${API_BASE_URL}/blogs/blog/${id}`, blogData, { headers });
            return response.data;
        } catch (error) {
            console.error(`Error updating blog with ID ${id}:`, error);
            throw error;
        }
    },

    async deleteBlog(id) {
        try {
            const headers = {
                'x-user-id': '1',
            };
            const response = await axios.delete(`${API_BASE_URL}/blogs/blogs/${id}`, { headers });
            return response.data;
        } catch (error) {
            console.error(`Error deleting blog with ID ${id}:`, error);
            throw error;
        }
    },

    async getAuthors() {
        return authors;
    },
    async getBlogComments() {
        return blogComments;
    }
}

export default blogService;