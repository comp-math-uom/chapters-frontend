import { redirect } from "next/navigation";

// The legacy /portfolio entry point now lives at /portfolio/projects.
// Achievements have their own page at /portfolio/achievements.
export default function PortfolioRedirect() {
    redirect("/portfolio/projects");
}
