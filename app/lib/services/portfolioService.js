import photos from "@/app/data/photos";
import contributors from "@/app/data/contributors";
import axios from "axios";
import batches from "@/app/data/batches";
import portfolioApi from "@/app/lib/services/portfolioApi";

const API_URL = "http://localhost:3000/portfolio";

const portfolioService = {

    async fetchGalleryItems() {
        try {
            const response = await portfolioApi.get('projects/all?featured=true');
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
                searchTags: project.search_tags,
                visible: project.visibility,
            }));
        } catch (error) {
            console.error("Failed to fetch gallery items:", error);
            return [];
        }
    },

    async fetContributors() {
        return contributors;
    },

    async fetchBatches() {
        return batches;
    },

    async fetchGalleryItem(id) {
        return photos.find(photo => photo.id == id);
    },

    async filterItems(filterQuery) {
        let filteredItems = photos;
        if (!filterQuery.advanced) {
            filteredItems = filteredItems.filter(photo => {
                if (photo.topic.includes(filterQuery.searchText)) {
                    return true;
                } else if (photo.description.includes(filterQuery.searchText)) {
                    return true;
                }
                return false;
            });
        } else {
            if (filterQuery.batch !== "") {
                filteredItems = filteredItems.filter(photo => {
                    console.log(photo.batch, filterQuery.batch);
                    return photo.batch === filterQuery.batch
                });
            }
            if (filterQuery.year !== "") {
                filteredItems = filteredItems.filter(photo => {
                    console.log(new Date(photo.date).getFullYear(), filterQuery.year);
                    return new Date(photo.date).getFullYear().toString() === filterQuery.year;
                });
            }
            if (filterQuery.month !== "") {
                filteredItems = filteredItems.filter(photo => {
                    console.log(new Date(photo.date).getMonth().toString(), filterQuery.month);
                    return new Date(photo.date).getMonth().toString() === filterQuery.month
                });
            }
        }
        return filteredItems;
    },

    async addGalleryItem(formData) {
        const payload = {
            topic: formData.title,
            description: formData.description,
            batch: formData.batch,
            contributors: formData.contributors,
            search_tags: formData.searchTags,
            date: formData.date,
            visibility: formData.visible,
            featured: formData.featured,

            // Add the hardcoded image data as requested         //TODO: integrate image upload later
            image: "https://i.ibb.co/12345/my-portfolio-image.jpg",
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
        return await axios.put(`${API_URL}/${data.id}`, data)
    },

    // async deleteGalleryItem(id) {
    //     return await axios.delete(`${API_URL}/${id}`);
    // },

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