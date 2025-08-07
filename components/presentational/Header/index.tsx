"use client";

import Image from "next/image";

export default function Header(style) {
    return (
        <header className={style}>
            <div className="max-w-[768px] pt-8 pb-10 bg-white z-10">
                <Image
                    src="/images/logo.svg"
                    alt="logo"
                    width={85}
                    height={22}
                />
            </div>
        </header>
    );
}
