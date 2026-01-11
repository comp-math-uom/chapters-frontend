import portfolioApi from "@/app/lib/services/portfolioApi";
import { formatDistanceToNow } from "date-fns";

export const feedbackService = {
    async fetchFeedbacks(projectId) {
        try {
            const response = await portfolioApi.get(`/projects/${projectId}/feedback`);
            return response.data.map(item => ({
                id: item.id,
                userName: item.username,
                content: item.content,
                timeAgo: formatDistanceToNow(new Date(
                    (item.created_at.includes("Z") || item.created_at.includes("+"))
                        ? item.created_at
                        : `${item.created_at}Z`
                ), { addSuffix: true }),
                userAvatar: null
            }));
        } catch (error) {
            console.error("Failed to fetch feedbacks", error);
            return [];
        }
    },

    async createFeedback(projectId, feedbackData) {
        try {
            const response = await portfolioApi.post(`/projects/${projectId}/feedback`, feedbackData);
            return response.data;
        } catch (error) {
            console.error("Error creating feedback:", error);
            throw error;
        }
    }
}
