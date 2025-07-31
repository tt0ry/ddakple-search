import Header from "@/components/presentational/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
}
