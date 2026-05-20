import axios from "axios";
import portfolioApi from "@/app/lib/services/portfolioApi";

function normalize(a) {
    if (!a) return null;
    return {
        id: a.id,
        title: a.title,
        description: a.description,
        category: a.category,
        date: a.date,
        image: a.image,
        recipients: a.recipients || [],
        batch: a.batch || "",
        searchTags: a.search_tags || [],
        width: a.width || 1200,
        height: a.height || 800,
        visible: a.visibility,
        featured: a.featured,
    };
}

const achievementService = {
    /**
     * Paginated achievements. Returns `{items, total, page, limit}`.
     */
    async fetchPage({ featured = false, page = 1, limit = 12 } = {}) {
        try {
            const res = await portfolioApi.get('achievements/all', {
                params: { featured, page, limit },
            });
            return {
                items: (res.data.achievements || []).map(normalize),
                total: res.data.total ?? 0,
                page: res.data.page ?? page,
                limit: res.data.limit ?? limit,
            };
        } catch (err) {
            console.error("Failed to fetch achievements:", err);
            return { items: [], total: 0, page, limit };
        }
    },

    async fetchAll(featuredOnly = false) {
        const result = await this.fetchPage({ featured: featuredOnly, limit: 100 });
        return result.items;
    },

    async fetchOne(id) {
        const res = await portfolioApi.get(`achievements/${id}`);
        return normalize(res.data);
    },

    async search(query) {
        try {
            const res = await portfolioApi.get('achievements/search/', { params: { query } });
            return (res.data || []).map(normalize);
        } catch (err) {
            console.error("Failed to search achievements:", err);
            return [];
        }
    },

    async uploadImage(file) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('key', process.env.NEXT_PUBLIC_IMAGEBB_API_KEY);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`, formData);
        return response.data.data.url;
    },

    async create(formData) {
        let imageUrl = "";
        if (formData.image instanceof File) {
            imageUrl = await this.uploadImage(formData.image);
        } else {
            imageUrl = formData.image;
        }
        const payload = {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            date: formData.date,
            image: imageUrl,
            recipients: formData.recipients || [],
            batch: formData.batch || null,
            search_tags: formData.searchTags || [],
            width: 1200,
            height: 800,
            visibility: formData.visible ?? true,
            featured: formData.featured ?? false,
        };
        return await portfolioApi.post('achievements/create', payload);
    },

    async update(id, formData) {
        let imageUrl = formData.image;
        if (formData.image instanceof File) {
            imageUrl = await this.uploadImage(formData.image);
        }
        const payload = {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            date: formData.date,
            image: imageUrl,
            recipients: formData.recipients,
            batch: formData.batch,
            search_tags: formData.searchTags,
            visibility: formData.visible,
            featured: formData.featured,
        };
        return await portfolioApi.put(`achievements/${id}`, payload);
    },

    async remove(id) {
        return await portfolioApi.delete(`achievements/${id}`);
    },
};

export default achievementService;
