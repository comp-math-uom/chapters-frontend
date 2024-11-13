import {blogPreviews} from "@/app/data/blogPreviews";

export const blogService = {
    async getBlogPreviews() {
        return blogPreviews
    }
}

export default blogService;