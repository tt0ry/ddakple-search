"use client";

import { useState } from "react";
import { tabBarItems } from "../../sampleDatas";
import List from "../List";

export default function Tabbar() {
    const [selectedId, setSelectedId] = useState<number>(0);

    const handleTabItem = (id) => {
        setSelectedId(id);
    };

    return (
        <div>
            <ul className="grid grid-cols-4 gap-2 w-full py-2">
                {tabBarItems.map((item, index) => (
                    <li
                        key={index}
                        className={`text-sm align-center w-full text-center pb-2 cursor-pointer ${
                            selectedId === item.id
                                ? "text-black border-b-2"
                                : "text-gray-400"
                        }`}
                        onClick={() => handleTabItem(item.id)}
                    >
                        {item.text}
                    </li>
                ))}
            </ul>
            <div>
                <List id={selectedId} />
            </div>
        </div>
    );
}
