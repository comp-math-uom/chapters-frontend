import InnerLayout from './innerLayout';

export const metadata = {
    title: "CHAPTERS | Portfolio",
    description: "Chapters - AI/ML Portal",
};

export default function Layout({children}) {
    return <InnerLayout>{children}</InnerLayout>;
}