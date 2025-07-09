import Image from "next/image";
import { competitionAllList, competitionExpectedList } from "../../sampleDatas";
import { useEffect, useState } from "react";
import SwitchCase from "../SwitchCase";

export default function List({ id }) {
    const [listId, setListId] = useState<number>(id);

    useEffect(() => {
        setListId(id);
    }, [id]);

    const list = (item) => (
        <div className="flex mb-2 cursor-pointer" key={item.id}>
            <div>
                <Image
                    src={item.image}
                    alt="list"
                    width={100}
                    height={50}
                    className="rounded-xl"
                />
            </div>
            <div className="ml-4">
                <div className="flex items-center">
                    <p className="text-xs text-gray-300 rounded-xl border border-gray-200 px-2 py-1">
                        {item.category}
                    </p>
                    <p className="text-xs text-gray-300 ml-2">{item.region}</p>
                </div>
                <h1 className="text-sm my-1">{item.title}</h1>
                <p className="text-xs text-gray-400">{item.schedule}</p>
            </div>
        </div>
    );

    return (
        <div className="pt-2">
            <SwitchCase
                tests={[
                    {
                        test: listId === 0,
                        component: (
                            <>{competitionAllList.map((item) => list(item))}</>
                        ),
                    },
                    {
                        test: listId === 1,
                        component: (
                            <>
                                {competitionExpectedList.map((item) =>
                                    list(item)
                                )}
                            </>
                        ),
                    },
                ]}
            />
        </div>
    );
}
