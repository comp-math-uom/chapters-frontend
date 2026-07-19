"use client";

import PortfolioSectionPage from "@/app/components/portfolio/PortfolioSectionPage";

export default function AchievementsPage() {
    return (
        <PortfolioSectionPage
            section="achievements"
            title="ACHIEVEMENTS"
            description="Highlights of awards, competitions, publications, and community impact."
            categoryOptions={["Awards", "Competitions", "Publications", "Talks"]}
            createUrl="/portfolio/add-item"
            showFeatured={false}
        />
    );
}
