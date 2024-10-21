import photos from "@/app/data/photos";

const portfolioService = {
    async fetchGalleryItems() {
        return photos;
    }
};

export default portfolioService;