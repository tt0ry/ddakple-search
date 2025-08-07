import "@ant-design/v5-patch-for-react-19";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "딱플 배드민턴대회 검색",
    description:
        "딱플, 배드민턴, 배드민턴 대회, 배드민턴 대회 결과, 배드민턴 대회 순위, 배드민턴 대회 결과 찾기, 배드민턴 대회 결과 검색, 배드민턴 경기, 배드민턴 경기 결과, 딱플 배드민턴, 딱플레이, 딱플 검색, 배드민턴 대회 검색, 전국 배드민턴 대회, DDAKPLE, 배드민턴 대회 출전 기록",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </head>
            <body suppressHydrationWarning>
                <div className="max-w-[768px] mx-auto bg-white min-h-screen shadow">
                    {children}
                </div>
            </body>
        </html>
    );
}
