import InnerLayout from './innerLayout';

export const metadata = {
    title: "CHAPTERS | Blogs",
    description: "Chapters - AI/ML Portal",
};

export default function Layout({children}) {
    return <InnerLayout>{children}</InnerLayout>;
}