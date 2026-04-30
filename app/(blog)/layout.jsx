import InnerLayout from './innerLayout';

export const metadata = {
    title: "AI Blog & Updates",
    description: "Technical articles, degree updates, and research insights from the BSc Hons in AI program at the University of Moratuwa.",
    openGraph: {
        title: "AI Student Blog | University of Moratuwa",
        description: "Insights and updates from the UoM AI degree program.",
    }
};

export default function Layout({children}) {
    return <InnerLayout>{children}</InnerLayout>;
}