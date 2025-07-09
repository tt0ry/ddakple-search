import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "React App",
    description: "Web site created with Next.js.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </head>
            <body>
                <div className="max-w-[430px] mx-auto bg-white min-h-screen shadow scrollbar-hide">
                    {children}
                </div>
            </body>
        </html>
    );
}
