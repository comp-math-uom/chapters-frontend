"use client";

import PortfolioSectionPage from "@/app/components/portfolio/PortfolioSectionPage";

export default function ProjectsPage() {
    return (
        <PortfolioSectionPage
            section="projects"
            title="PROJECTS"
            description="Explore student work organized by batch, category, and tech stack."
            categoryOptions={["1st-year projects", "2nd-year projects", "Research projects", "Final-year projects"]}
            createUrl="/portfolio/add-item"
            showFeatured={true}
        />
    );
}
