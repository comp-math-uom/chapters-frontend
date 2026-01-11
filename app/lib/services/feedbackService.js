import portfolioApi from "@/app/lib/services/portfolioApi";
import { FeedbackData } from "@/app/data/Feedbacks";

export const feedbackService = {
    async fetchFeedbacks() {
        return FeedbackData;
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
