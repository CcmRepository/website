import { Poppins } from "next/font/google";
import { Montserrat } from "next/font/google";
import "./globals.css";

import Header from './components/Header';

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
    title: "PT Cikal Citra Mapan",
    description: "Welcome to PT Cikal Citra Mapan, where we bring your furniture dreams to life with a blend of precision and passion. We're all about crafting quality pieces that match your unique style. Let's work together to create something incredible for your space that really reflects your vibe. We're here to help you style your space just the way you like it!"
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${poppins.variable} ${montserrat.variable}`} style={{ paddingTop: 64 }}>
                <Header />
                {children}
            </body>
        </html>
    );
}
