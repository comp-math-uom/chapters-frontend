import blogApi from "@/app/lib/services/blogApi";

const API_BASE_URL = process.env.NEXT_PUBLIC_BLOG_API;

export const blogService = {
    async likeBlog(blogId, _userId, status = 1) {
        try {
            const response = await blogApi.post(`${API_BASE_URL}/blogs/blog/${blogId}/like`, { "like_value": status });
            return response.data;
        } catch (error) {
            console.error(`Error liking blog ${blogId}:`, error);
            throw error;
        }
    },

    async isLikedByUser(blogId, _userId) {
        try {
            const response = await blogApi.get(`${API_BASE_URL}/blogs/blog/${blogId}/like-status`);
            return response.data;
        } catch (error) {
            console.error(`Error checking like status for blog ${blogId}:`, error);
            throw error;
        }
    },

    /**
     * Paginated preview fetch. Returns `{items, total, page, limit}`.
     */
    async getBlogPreviewsPage({ page = 1, limit = 12 } = {}) {
        try {
            const response = await blogApi.get(`${API_BASE_URL}/blogs/public/blogs`, {
                params: { page, limit },
            });
            const data = response.data || {};
            return {
                items: data.items || [],
                total: data.total ?? 0,
                page: data.page ?? page,
                limit: data.limit ?? limit,
            };
        } catch (error) {
            console.error("Error fetching blog previews:", error);
            return { items: [], total: 0, page, limit };
        }
    },

    /** Legacy callers that want the full array (capped to 100 for safety). */
    async getBlogPreviewsFromAPI() {
        const result = await this.getBlogPreviewsPage({ limit: 100 });
        return result.items;
    },

    async getBlogByIdFromAPI(id) {
        try {
            const response = await blogApi.get(`${API_BASE_URL}/blogs/public/blog/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching blog with ID ${id}:`, error);
            throw error;
        }
    },

    async createBlog(blogData) {
        try {
            const response = await blogApi.post(`${API_BASE_URL}/blogs/createblog`, blogData);
            return response.data;
        } catch (error) {
            console.error("Error creating blog:", error);
            throw error;
        }
    },

    async updateBlog(id, blogData) {
        try {
            const response = await blogApi.put(`${API_BASE_URL}/blogs/updateblog/${id}`, blogData);
            return response.data;
        } catch (error) {
            console.error(`Error updating blog with ID ${id}:`, error);
            throw error;
        }
    },

    async deleteBlog(id) {
        try {
            const response = await blogApi.delete(`${API_BASE_URL}/blogs/blogs/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting blog with ID ${id}:`, error);
            throw error;
        }
    },

};

export default blogService;
