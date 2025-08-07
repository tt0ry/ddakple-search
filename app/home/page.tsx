"use client";

import "@ant-design/v5-patch-for-react-19";
import { useState } from "react";
import { Input } from "antd";
import Image from "next/image";
import TableGrid from "@/components/presentational/Table";
import ListService from "services/api/ListService";
import { columDatas, expandableItems } from "@/app/home/columDatas";
import { List } from "@/types/resultListType";
import Maybe from "@/components/presentational/Maybe";

const HomePage = ({}) => {
    const { Search } = Input;
    const PAGE_SIZE = 10;

    const [resultList, setResultList] = useState<List[]>([]);
    const [resultListInfo, setResultListInfo] = useState([]);
    const [name, setName] = useState<string>("");

    const [filterValue, setFilterValue] = useState({});
    const [sortValue, setSortValue] = useState({});

    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [loading, setLoading] = useState<boolean>(false);
    const [isSearchName, setIsSearchName] = useState<boolean>(false);

    const onChangeSearchWord = (e: any) => {
        const { value } = e.target;
        setName(value);
    };

    const filterClearAll = () => {
        setFilterValue({});
        setSortValue({});
    };

    const handleSortColumn = (pagination, filters, sorter) => {
        setFilterValue(filters);
        setSortValue(sorter);

        setPagination({
            current: pagination.current || 1,
            pageSize: pagination.pageSize || 10,
        });

        if (!Array.isArray(sorter)) {
            setSortValue({
                columnKey: sorter.columnKey,
                order: sorter.order,
            });
        }

        setExpandedRowKeys([]);
    };

    const handleSearch = (value) => {
        if (!value.trim()) {
            return;
        }

        setIsSearchName(true);
        setSortValue({});
        setResultListInfo([]);

        getList(value);
    };

    const getList = async (value): Promise<void> => {
        setLoading(true);
        setPagination({ current: 1, pageSize: pagination.pageSize });
        setExpandedRowKeys([]);

        setFilterValue({});
        setSortValue({});

        try {
            const conditions = {
                name: value,
            };

            const { data } = await ListService.getList(conditions);
            setResultList(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const getListInfo = async (value): Promise<void> => {
        const rowKey = value.id;

        if (!resultListInfo[rowKey]) {
            try {
                const conditions = {
                    name: name,
                    competitionId: value.competitionId,
                    category: value.category,
                    tournamentType: value.tournamentType,
                    source: value.source,
                };

                const { data } = await ListService.getListInfo(conditions);
                setResultListInfo((prev) => ({
                    ...prev,
                    [rowKey]: data,
                }));
            } catch (e) {
                console.error(e);
            }
        }
    };

    const isSearched = resultList.length > 0 || isSearchName;

    return (
        <>
            <header>
                <div
                    className={
                        isSearched
                            ? "px-4 py-6"
                            : "flex align-center justify-center pt-50"
                    }
                >
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={isSearched ? 85 : 105}
                        height={22}
                    />
                </div>
            </header>
            <div
                className={
                    isSearched
                        ? "px-4 pt-4 pb-3"
                        : "px-6 pt-20 flex align-center justify-center"
                }
            >
                <div className="pb-4 w-full">
                    <Search
                        placeholder="이름을 입력해 주세요."
                        value={name}
                        onChange={(e) => onChangeSearchWord(e)}
                        onSearch={handleSearch}
                        size={isSearched ? "middle" : "large"}
                        allowClear
                    />
                </div>
                <Maybe
                    test={isSearched}
                    children={
                        <>
                            <div className="mb-2">
                                <button
                                    onClick={filterClearAll}
                                    className="cursor-pointer text-xs border px-2 py-1 rounded-lg border-gray-300 text-gray-400 hover:border-blue-500 hover:text-blue-500"
                                >
                                    필터 초기화
                                </button>
                            </div>
                            <TableGrid
                                loading={loading}
                                columns={columDatas(filterValue, sortValue)}
                                dataSource={resultList || []}
                                pageSize={PAGE_SIZE}
                                handleSortColumn={handleSortColumn}
                                expandableItems={expandableItems(
                                    resultListInfo
                                )}
                                expandedRowKeys={expandedRowKeys}
                                setExpandedRowKeys={setExpandedRowKeys}
                                pagination={pagination}
                                setPagination={setPagination}
                                resultListInfo={resultListInfo}
                                getListInfo={getListInfo}
                            />
                        </>
                    }
                />
            </div>
        </>
    );
};

export default HomePage;
