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

    async addGalleryItem(data) {
        return await axios.post(API_URL, data)
    },

    async updateGalleryItem(data) {
        return await axios.put(`${API_URL}/${data.id}`, data)
    },

    // async deleteGalleryItem(id) {
    //     return await axios.delete(`${API_URL}/${id}`);
    // },

    async deleteGalleryItem(id) {
        try {
            // Step 1: Login to get access token
            const loginResponse = await axios.post('http://127.0.0.1:8000/admin/login', {
                username: 'admin1',
                password: 'securepass123'
            });
            const accessToken = loginResponse.data.access_token;

            // Step 2: Use access token to authenticate delete request
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };
            const response = await axios.delete(`http://127.0.0.1:8000/projects/${id}`, { headers });
            return response;
        } catch (error) {
            console.error(`Error deleting project with ID ${id}:`, error);
            throw error;
        }
    }

};
export default portfolioService;