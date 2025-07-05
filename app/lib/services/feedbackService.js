import { FeedbackData } from "@/app/data/Feedbacks";

export const feedbackService = {
    async fetchFeedbacks() {
        return FeedbackData;
    }
}
