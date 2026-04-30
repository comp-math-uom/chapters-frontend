import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers/Providers";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: {
        default: "C H A P T E R S | AI Portal - University of Moratuwa",
        template: "%s | C H A P T E R S"
    },
    description: "The official AI portal for BSc Hons in Artificial Intelligence students at the University of Moratuwa. Explore student portfolios, academic blogs, forum discussions, and degree updates.",
    keywords: ["AI", "Artificial Intelligence", "University of Moratuwa", "UoM", "BSc Hons AI", "Sri Lanka AI", "Machine Learning", "Student Portal", "CHAPTERS"],
    authors: [{ name: "BSc Hons AI Students, UoM" }],
    creator: "BSc Hons AI Students, UoM",
    publisher: "University of Moratuwa",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "C H A P T E R S | AI Portal - University of Moratuwa",
        description: "Official portal for BSc Hons in Artificial Intelligence students at UoM. Portfolios, blogs, forums, and degree updates.",
        url: "https://chapters-frontend-three.vercel.app",
        siteName: "Chapters",
        images: [
            {
                url: "/img/preview-img.png",
                width: 1264,
                height: 626,
                alt: "Chapters - University of Moratuwa AI Portal Preview",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "C H A P T E R S | AI Portal - University of Moratuwa",
        description: "Official portal for BSc Hons in Artificial Intelligence students at UoM.",
        images: ["/img/preview-img.png"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
