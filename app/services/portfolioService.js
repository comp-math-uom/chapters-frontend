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

export const feedbackService={
    async fetchFeedbacks(){
        return FeedbackData;
    }
}

export default portfolioService;