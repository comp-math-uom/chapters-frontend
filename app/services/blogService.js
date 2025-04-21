import { blogPreviews } from "@/app/data/blogPreviews";
import { blog } from "@/app/data/blog";

export const blogService = {
    async getBlogPreviews() {
        return blogPreviews
    },
    async getBlog(id) {
        return blog.find(blogEntry => blogEntry.id === id);
    }
}

export default blogService;