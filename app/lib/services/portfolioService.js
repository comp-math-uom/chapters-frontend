import axios from "axios";
import batches from "@/app/data/batches";
import portfolioApi from "@/app/lib/services/portfolioApi";
import { supabase } from "@/app/lib/services/supabase";

const portfolioService = {

    async fetchGalleryItems({ featured = false, section = null, category = null } = {}) {
        try {
            const response = await portfolioApi.get('projects/all', {
                params: {
                    featured,
                    section: section || undefined,
                    category: category || undefined,
                }
            });
            const projects = response.data.projects;

            // Add this filter to protect against bad data
            const validProjects = projects.filter(project =>
                project.image && typeof project.image === 'string' && project.image.startsWith('http')
            );

            // Now, only map the projects that passed the filter
            return validProjects.map(project => ({
                id: project.id,
                src: project.image,
                width: project.width,
                height: project.height,
                topic: project.topic,
                description: project.description,
                date: project.date,
                batch: project.batch,
                featured: project.featured,
                section: project.section,
                category: project.category,
                contributors: project.contributors || [],
                searchTags: project.search_tags,
                visible: project.visibility,
            }));
        } catch (error) {
            console.error("Failed to fetch gallery items:", error);
            return [];
        }
    },

    async fetContributors() {
        try {
            const { data, error } = await supabase
                .from("profiles")
                .select("id, full_name, email, avatar_url")
                .order("full_name", { ascending: true });

            if (error) {
                throw error;
            }

            return (data || [])
                .filter((profile) => profile.full_name || profile.email)
                .map((profile) => ({
                    label: profile.full_name || profile.email,
                    value: profile.id,
                    email: profile.email,
                    image: profile.avatar_url || "",
                }));
        } catch (error) {
            console.error("Failed to fetch contributors from Supabase:", error);
            return [];
        }
    },

    async fetchBatches() {
        return batches;
    },

    async fetchGalleryItem(id, { includeHidden = false } = {}) {
        try {
            const url = includeHidden ? `/projects/${id}/admin` : `/projects/${id}`;
            const response = await portfolioApi.get(url);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch project ${id}:`, error);
            throw error;
        }
    },

    async filterItems(filterQuery) {
        try {
            const params = {
                query: filterQuery.searchText || undefined,
                section: filterQuery.section || undefined,
                category: filterQuery.category || undefined,
                batch: filterQuery.batch || undefined,
                year: filterQuery.year ? Number(filterQuery.year) : undefined,
                month: filterQuery.month ? Number(filterQuery.month) : undefined,
            };

            if (filterQuery.tags && filterQuery.tags.length > 0) {
                params.tags = filterQuery.tags;
            }

            const response = await portfolioApi.get('/projects/search', { params });
            const projects = response.data || [];
            return projects.map(project => ({
                id: project.id,
                src: project.image,
                width: project.width,
                height: project.height,
                topic: project.topic,
                description: project.description,
                date: project.date,
                batch: project.batch,
                featured: project.featured,
                section: project.section,
                category: project.category,
                contributors: project.contributors || [],
                searchTags: project.search_tags,
                visible: project.visibility,
            }));
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
            section: formData.section,
            category: formData.category,
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
        try {
            const response = await portfolioApi.post('/projects/create', payload);
            return response;
        } catch (error) {
            console.error("Error adding gallery item:", error.response || error.message);
            throw error;
        }
    },

    async updateGalleryItem(data) {
        const { id, image, ...rest } = data;
        let imageUrl = image;

        if (image instanceof File) {
            imageUrl = await this.uploadImage(image);
        }

        const payload = {
            ...rest,
            image: imageUrl,
        };

        return await portfolioApi.put(`/projects/${id}`, payload);
    },

    async deleteGalleryItem(id) {
        try {
            const response = await portfolioApi.delete(`projects/${id}`);
            return response;
        } catch (error) {
            console.error(`Error deleting project with ID ${id}:`, error);
            throw error;
        }
    }

};
export default portfolioService;