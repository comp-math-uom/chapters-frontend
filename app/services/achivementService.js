import { achievements } from "@/app/data/achievements"

export const achievementService = {
    async getAchievements() {
        return achievements
    }
}

export default achievementService;