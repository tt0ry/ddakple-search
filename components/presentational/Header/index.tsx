import Image from "next/image";

export default function Header() {
    return (
        <header>
            <div className="fixed max-w-[430px] left-0 right-0 mx-auto px-4 pt-6 pb-4 bg-white">
                <Image
                    src="/images/logo.svg"
                    alt="logo"
                    width={75}
                    height={22}
                />
                <div className="flex mt-4">
                    <div className="bg-gray-100 rounded-lg px-3 py-2 flex w-full">
                        <input
                            type="text"
                            placeholder="검색해 보세요."
                            className="border-hidden w-full outline-hidden text-sm"
                        />
                        <button className="cursor-pointer">
                            <Image
                                src="/icons/icon-search.svg"
                                alt="icon"
                                width={27}
                                height={27}
                                className="justify-center"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
