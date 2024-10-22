import photos from "@/app/data/photos";
import contributors from "@/app/data/contributors";
import {FeedbackData} from "@/app/data/Feedbacks";

const portfolioService = {
    async fetchGalleryItems() {
        return photos;
    },

    async fetContributors() {
        return contributors;
    },

    async fetchGalleryItem(id) {
        return photos.find(photo => photo.id === id);
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

    async addGalleryItem(photo) {
        photos.push(photo);
    },

    async updateGalleryItem(id, photo) {
        const index = photos.findIndex(photo => photo.id === id);
        photos[index] = photo;
    },

    async deleteGalleryItem(id) {
        const index = photos.findIndex(photo => photo.id === id);
        photos.splice(index, 1);
    }
};
export default portfolioService;