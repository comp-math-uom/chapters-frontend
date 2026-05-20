import axios from "axios";
import portfolioApi from "@/app/lib/services/portfolioApi";

const aboutUsService = {
    async get() {
        try {
            const res = await portfolioApi.get('about-us');
            return res.data;
        } catch (err) {
            console.error("Failed to fetch About Us:", err);
            return null;
        }
    },

    async update(payload) {
        return await portfolioApi.put('about-us', payload);
    },

    async uploadImage(file) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('key', process.env.NEXT_PUBLIC_IMAGEBB_API_KEY);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`, formData);
        return response.data.data.url;
    },
};

export default aboutUsService;
