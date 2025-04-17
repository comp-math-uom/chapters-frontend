import photos from "@/app/data/photos";
import contributors from "@/app/data/contributors";
import axios from "axios";
import batches from "@/app/data/batches";

const API_URL = "http://localhost:3000/portfolio";

const portfolioService = {

    async fetchGalleryItems() {
        return photos;
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

    async deleteGalleryItem(id) {
        return await axios.delete(`${API_URL}/${id}`);
    }
};
export default portfolioService;