import React from "react";
import Header from "@/components/presentational/Header";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="scrollbar-hide">
            <Header />
            <main>{children}</main>
        </div>
    );
}
