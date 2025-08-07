import SwitchCase from "@/components/presentational/SwitchCase";
import {
    DATE_REPLACE_FORMAT,
    REGEX_DATE,
    REGEX_SPECIAL_CHARACTER,
} from "constants/regex";

export const columDatas = (filterValue, sortValue) => [
    {
        title: "이름",
        dataIndex: ["user1", "user2"],
        className: "font-sm",
        width: "9%",
        render: (text, record) => (
            <span>
                {record.user1}/<br />
                {record.user2}
            </span>
        ),
    },
    {
        title: "종목",
        dataIndex: "category",
        className: "font-sm table-title",
        filters: [
            {
                text: "남복",
                value: "남복",
            },
            {
                text: "여복",
                value: "여복",
            },
            {
                text: "혼복",
                value: "혼복",
            },
            {
                text: "남단",
                value: "남단",
            },
            {
                text: "여단",
                value: "여단",
            },
        ],
        onFilter: (value, record) => record.category.includes(value as string),
        filteredValue: filterValue.category || null,
    },
    {
        title: "연령",
        dataIndex: "age",
        className: "font-sm",
        width: "11%",
    },
    {
        title: "급수",
        dataIndex: "level",
        className: "font-sm",
        width: "8.5%",
        filters: [
            {
                text: "자강",
                value: "자강",
            },
            {
                text: "준자강",
                value: "준자강",
            },
            {
                text: "A",
                value: "A",
            },
            {
                text: "B",
                value: "B",
            },
            {
                text: "C",
                value: "C",
            },
            {
                text: "D",
                value: "D",
            },
            {
                text: "E",
                value: "E",
            },
            {
                text: "F",
                value: "F",
            },
            {
                text: "초심",
                value: "초심",
            },
        ],
        onFilter: (value, record) => record.level.includes(value as string),
        filteredValue: filterValue.level || null,
    },
    {
        title: "대회명",
        dataIndex: "competitionName",
        className: "font-sm",
    },
    {
        title: "대회년도",
        dataIndex: "competitionYear",
        className: "font-sm",
        width: "11%",
        key: "competitionYear",
        filters: [
            {
                text: "2025",
                value: "2025",
            },
            {
                text: "2024",
                value: "2024",
            },
            {
                text: "2023",
                value: "2023",
            },
            {
                text: "2022",
                value: "2022",
            },
            {
                text: "2021",
                value: "2021",
            },
        ],
        onFilter: (value, record) =>
            record.competitionYear.includes(value as string),
        filteredValue: filterValue.competitionYear || null,
        sorter: (a, b) => a.competitionYear - b.competitionYear,
        sortOrder:
            sortValue?.columnKey === "competitionYear" ? sortValue.order : null,
    },
    {
        title: "최종순위",
        dataIndex: "ranking",
        className: "font-sm",
        width: "9%",
        render: (text) => {
            if (text === "-") {
                return text;
            } else {
                return text.concat("", "위");
            }
        },
    },
    {
        title: "지역",
        dataIndex: "region",
        className: "font-sm",
        width: "11%",
        render: (text) => (
            <span>{text.toString().replace(REGEX_SPECIAL_CHARACTER, " ")}</span>
        ),
    },
    {
        title: "출처",
        dataIndex: "source",
        className: "font-sm",
        width: "11%",
    },
];

const teamScoreResult = (item) => {
    const score1 = parseInt(item.group1Score, 10);
    const score2 = parseInt(item.group2Score, 10);

    let result1 = "";
    let result2 = "";

    if (score1 > score2) {
        result1 = "승";
        result2 = "패";
    } else if (score2 > score1) {
        result1 = "패";
        result2 = "승";
    }

    return { group1: { result: result1 }, group2: { result: result2 } };
};

export const expandableItems = (resultListInfo) => (record) => {
    const items = resultListInfo[record.id] || [];
    return (
        <div>
            <ul className="flex flex-col w-full">
                <SwitchCase
                    tests={[
                        {
                            test: items.length > 0,
                            component: (
                                <>
                                    {items.map((item, index) => {
                                        const scoreResult =
                                            teamScoreResult(item);
                                        return (
                                            <li
                                                key={index}
                                                className="border-b border-gray-200 py-4"
                                            >
                                                <div className="flex justify-center items-center">
                                                    <p className="font-base mr-5 font-semibold">
                                                        {item.tournamentType}
                                                    </p>
                                                    <p className="font-base font-semibold">
                                                        {item.date.replace(
                                                            REGEX_DATE,
                                                            DATE_REPLACE_FORMAT
                                                        )}{" "}
                                                        {item.time}
                                                    </p>
                                                    <p className="font-base ml-5 font-bold">
                                                        {item.courtNum}코트{" "}
                                                        {item.num}번
                                                    </p>
                                                </div>
                                                <div className="grid grid-cols-3 gap-x-8 w-full text-center pt-5">
                                                    <div>
                                                        <p className="font-bold">
                                                            {
                                                                scoreResult
                                                                    .group1
                                                                    .result
                                                            }
                                                        </p>
                                                        <p className="font-sm">
                                                            {item.group1User1}
                                                        </p>
                                                        <p className="font-sm">
                                                            {item.group1User2}
                                                        </p>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <p
                                                            className={`${
                                                                scoreResult
                                                                    .group1
                                                                    .result ===
                                                                "승"
                                                                    ? "text-blue-600"
                                                                    : "text-red-600"
                                                            } font-bold text-2xl w-8`}
                                                        >
                                                            {item.group1Score}
                                                        </p>
                                                        <p className="text-xs border rounded-2xl border-gray-300 py-1 w-14">
                                                            {item.round}
                                                        </p>
                                                        <p
                                                            className={`${
                                                                scoreResult
                                                                    .group2
                                                                    .result ===
                                                                "승"
                                                                    ? "text-blue-600"
                                                                    : "text-red-600"
                                                            } font-bold text-2xl w-8`}
                                                        >
                                                            {item.group2Score}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">
                                                            {
                                                                scoreResult
                                                                    .group2
                                                                    .result
                                                            }
                                                        </p>
                                                        <p className="font-sm">
                                                            {item.group2User1}
                                                        </p>
                                                        <p className="font-sm">
                                                            {item.group2User2}
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </>
                            ),
                        },
                    ]}
                    defaultComponent={
                        <p className="text-center font-sm text-gray-400">
                            데이터가 없습니다.
                        </p>
                    }
                />
            </ul>
        </div>
    );
};
