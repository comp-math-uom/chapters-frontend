import blogApi from "@/app/lib/services/blogApi";

const adminBlogService = {
    async listAll(statusFilter = "all") {
        const res = await blogApi.get('/blogs/admin/blogs', { params: { status_filter: statusFilter } });
        return res.data || [];
    },

    async remove(id) {
        return await blogApi.delete(`/blogs/admin/blog/${id}`);
    },

    async setVisibility(id, visibility) {
        return await blogApi.patch(`/blogs/admin/blog/${id}/visibility`, null, { params: { visibility } });
    },
};

export default adminBlogService;
