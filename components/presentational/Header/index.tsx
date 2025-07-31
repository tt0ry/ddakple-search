"use client";

import Image from "next/image";

export default function Header() {
    return (
        <header>
            <div className="fixed max-w-[768px] left-0 right-0 mx-auto px-4 py-6 bg-white z-10">
                <Image
                    src="/images/logo.svg"
                    alt="logo"
                    width={75}
                    height={22}
                />
            </div>
        </header>
    );
}
