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
                'x-user-id': blogData.user_id || '1'
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
                'x-user-id': blogData.user_id || '1',
            };
            const response = await axios.put(`${API_BASE_URL}/blogs/updateblog/${id}`, blogData, { headers });
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
    
    async getBlogComments(blogId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/blogs/blog/${blogId}/comments`);
            var orderedComments = response.data.sort((a, b) => new Date(b.commentedAt) - new Date(a.commentedAt));

            orderedComments.forEach(comment => {
                if (comment.replies && comment.replies.length > 0) {
                    comment.replies.sort((a, b) => new Date(b.repliedAt) - new Date(a.repliedAt));
                }
            });
            return orderedComments;
        } catch (error) {
            console.error(`Error fetching comments for blog ${blogId}:`, error);
            throw error;
        }
    },

    async addBlogComment(commentData) {
        try {
            const headers = {
                'x-user-id': commentData.user_id,
            };
            const response = await axios.post(`${API_BASE_URL}/blogs/write-comment`, commentData, { headers });
            return response.data;
        } catch (error) {
            console.error(`Error adding comment to blog ${blogId}:`, error);
            throw error;
        }
    },

    async addCommentReply(replyData) {
        try {
            const headers = {
                'x-user-id': replyData.user_id,
            };
            const response = await axios.post(`${API_BASE_URL}/blogs/reply-comment`, replyData, { headers });
            return response.data;
        } catch (error) {
            console.error(`Error adding reply to comment ${replyData.parentId}:`, error);
            throw error;
        }
    },

    async deleteBlogComment(commentId, blogId) {
        try {
            const headers = {
                'x-user-id': '1',
            };
            const response = await axios.delete(`${API_BASE_URL}/blogs/blog/${blogId}/comments/${commentId}`, { headers });
            return response.data;
        } catch (error) {
            console.error(`Error deleting comment ${commentId} from blog ${blogId}:`, error);
            throw error;
        }
    },

    async deleteCommentReply(replyId, userId) {
        try {
            const headers = {
                'x-user-id': userId,
            };
            const response = await axios.delete(`${API_BASE_URL}/blogs/delete-comment-reply/${replyId}`, { headers });
            return response.data;
        } catch (error) {
            console.error(`Error deleting reply ${replyId}:`, error);
            throw error;
        }
    },

    async updateComment(commentId, commentData, userId) {
        try {
            const headers = {
                'x-user-id': userId,
            };
            const response = await axios.put(`${API_BASE_URL}/blogs/edit-comment-reply/${commentId}`, commentData, { headers });
            return response.data;
        } catch (error) {
            console.error(`Error updating comment ${commentId}:`, error);
            throw error;
        }
    },

    async updateCommentReply(replyId, replyData, userId) {
        try {
            const headers = {
                'x-user-id': userId,
            };
            const response = await axios.put(`${API_BASE_URL}/blogs/edit-comment-reply/${replyId}`, replyData, { headers });
            return response.data;
        } catch (error) {
            console.error(`Error updating reply ${replyId}:`, error);
            throw error;
        }
    }
}

export default blogService;