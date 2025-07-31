"use client";

import "@ant-design/v5-patch-for-react-19";
import { useState } from "react";
import { Input } from "antd";
import TableGrid from "@/components/presentational/Table";
import ListService from "services/api/ListService";
import { columDatas, expandableItems } from "@/app/home/columDatas";
import { List, ListInfo } from "@/types/resultListType";

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

    const onChangeSearchWord = (e: any) => {
        setName(e.target.value);
    };

    const clearAll = () => {
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
            setResultList([]);
            return;
        }

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
                    level: value.level,
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

    return (
        <div className="px-4 pt-20 pb-2">
            <div className="pb-5 flex w-full">
                <Search
                    placeholder="이름을 입력해 주세요."
                    value={name}
                    onChange={(e) => onChangeSearchWord(e)}
                    onSearch={handleSearch}
                />
            </div>
            <div className="mb-2">
                <button
                    onClick={clearAll}
                    className="cursor-pointer text-xs border px-2 py-1 rounded-lg border-gray-200 text-gray-400 hover:border-blue-500 hover:text-blue-500"
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
                expandableItems={expandableItems(resultListInfo)}
                expandedRowKeys={expandedRowKeys}
                setExpandedRowKeys={setExpandedRowKeys}
                pagination={pagination}
                setPagination={setPagination}
                resultListInfo={resultListInfo}
                getListInfo={getListInfo}
            />
        </div>
    );
};

export default HomePage;
