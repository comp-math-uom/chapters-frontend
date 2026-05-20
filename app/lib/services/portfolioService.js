import axios from "axios";
import batches from "@/app/data/batches";
import portfolioApi from "@/app/lib/services/portfolioApi";


// Normalize a project document from the backend into the shape the
// gallery / forms / modal components expect.
function normalizeProject(project) {
    if (!project) return null;
    return {
        id: project.id,
        src: project.image,
        image: project.image,
        width: project.width,
        height: project.height,
        topic: project.topic,
        title: project.topic,
        description: project.description,
        date: project.date,
        batch: project.batch,
        featured: project.featured,
        searchTags: project.search_tags || [],
        contributors: project.contributors || [],
        visible: project.visibility,
    };
}


function applyAdvancedFilters(items, { year, month, batch }) {
    let filtered = items;
    if (batch) filtered = filtered.filter((p) => p.batch === batch);
    if (year) {
        filtered = filtered.filter((p) => p.date && new Date(p.date).getFullYear().toString() === year.toString());
    }
    if (month) {
        filtered = filtered.filter((p) => p.date && (new Date(p.date).getMonth() + 1).toString() === month.toString());
    }
    return filtered;
}


const portfolioService = {

    /**
     * Paginated fetch. Returns `{items, total, page, limit}`.
     * Pass `featured: true` for the landing page; pass `page`/`limit` for listings.
     */
    async fetchProjectsPage({ featured = false, page = 1, limit = 12 } = {}) {
        try {
            const response = await portfolioApi.get('projects/all', {
                params: { featured, page, limit },
            });
            const projects = response.data.projects || [];
            const items = projects
                .filter((p) => p.image && typeof p.image === 'string' && p.image.startsWith('http'))
                .map(normalizeProject);
            return {
                items,
                total: response.data.total ?? items.length,
                page: response.data.page ?? page,
                limit: response.data.limit ?? limit,
            };
        } catch (error) {
            console.error("Failed to fetch projects:", error);
            return { items: [], total: 0, page, limit };
        }
    },

    /** Legacy helper used by some callers; returns just the items array. */
    async fetchGalleryItems(featuredOnly = false) {
        const result = await this.fetchProjectsPage({ featured: featuredOnly, limit: 100 });
        return result.items;
    },

    async fetchBatches() {
        return batches;
    },

    async fetchGalleryItem(id) {
        try {
            const response = await portfolioApi.get(`projects/${id}`);
            return normalizeProject(response.data);
        } catch (error) {
            console.error(`Failed to fetch gallery item ${id}:`, error);
            throw error;
        }
    },

    async filterItems(filterQuery) {
        const { searchText, advanced } = filterQuery || {};

        try {
            let items;
            if (searchText) {
                const response = await portfolioApi.get('projects/search/', { params: { query: searchText } });
                items = (response.data || [])
                    .filter((p) => p.image && typeof p.image === 'string' && p.image.startsWith('http'))
                    .map(normalizeProject);
            } else {
                items = await this.fetchGalleryItems(false);
            }
            if (advanced) items = applyAdvancedFilters(items, filterQuery);
            return items;
        } catch (error) {
            console.error("Failed to filter projects:", error);
            return [];
        }
    },

    async uploadImage(file) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('key', process.env.NEXT_PUBLIC_IMAGEBB_API_KEY);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`, formData);
            return response.data.data.url;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    },

    async addGalleryItem(formData) {
        let imageUrl = "";

        if (formData.image) {
            if (formData.image instanceof File) {
                imageUrl = await this.uploadImage(formData.image);
            } else {
                imageUrl = formData.image;
            }
        }

        const payload = {
            topic: formData.title,
            description: formData.description,
            batch: formData.batch,
            contributors: formData.contributors,
            search_tags: formData.searchTags,
            date: formData.date,
            visibility: formData.visible,
            featured: formData.featured,
            image: imageUrl,
            width: 1080,
            height: 720,
        };
        return await portfolioApi.post('/projects/create', payload);
    },

    async updateGalleryItem(id, formData) {
        let imageUrl = formData.image;
        if (formData.image && formData.image instanceof File) {
            imageUrl = await this.uploadImage(formData.image);
        }

        const payload = {
            topic: formData.title,
            description: formData.description,
            batch: formData.batch,
            contributors: formData.contributors,
            search_tags: formData.searchTags,
            date: formData.date,
            visibility: formData.visible,
            featured: formData.featured,
            image: imageUrl,
        };
        return await portfolioApi.put(`projects/${id}`, payload);
    },

    async deleteGalleryItem(id) {
        try {
            return await portfolioApi.delete(`projects/${id}`);
        } catch (error) {
            console.error(`Error deleting project with ID ${id}:`, error);
            throw error;
        }
    },
};

export default portfolioService;
