import React, { ReactElement } from "react";
import { Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface TableProps {
    columns: ColumnsType<any>;
    dataSource: Array<any>;
    style?: React.CSSProperties;
    className?: string | "";
    total?: number;
    page?: number;
    pageSize?: number;
    onClick?: (event: any, record: any, rowIndex: number) => void;
    handleSortColumn?: (pagination: any, filters: any, sorter: any) => void;
    expandableItems?: any;
    loading?: boolean;
    expandedRowKeys?: any[];
    setExpandedRowKeys?: any;
    pagination?: any;
    setPagination?: any;
    resultListInfo?: any[];
    getListInfo?: any;
}

const TableGrid = ({
    columns,
    dataSource,
    style,
    className,
    total,
    page,
    pageSize,
    onClick,
    handleSortColumn,
    expandableItems,
    loading,
    expandedRowKeys,
    setExpandedRowKeys,
    pagination,
    setPagination,
    resultListInfo,
    getListInfo,
}: TableProps): ReactElement => {
    return (
        <Table
            className={className}
            columns={columns}
            dataSource={dataSource}
            showSorterTooltip={false}
            sortDirections={["ascend", "descend", null]}
            style={style}
            rowKey="id"
            scroll={{ x: "736px" }}
            pagination={{
                position: ["bottomCenter"],
                current: pagination.current,
                pageSize: pagination.pageSize,
                onChange: (page, pageSize) => {
                    setPagination({ current: page, pageSize });
                    setExpandedRowKeys([]);
                },
            }}
            onChange={(pagination: any, filters: any, sorter: any) =>
                handleSortColumn(pagination, filters, sorter)
            }
            onRow={(record: any, rowIndex: any): any => {
                return {
                    onClick: (event): any =>
                        onClick && onClick(event, record, rowIndex),
                };
            }}
            locale={{ emptyText: "조회 결과가 없습니다." }}
            expandable={{
                expandedRowRender: expandableItems,
                expandedRowKeys: expandedRowKeys,
                expandRowByClick: true,
                expandIcon: () => null,
                showExpandColumn: false,
                onExpand: async (expanded, record) => {
                    const rowKey = record.id;
                    if (expanded) {
                        if (
                            !expandedRowKeys.includes(rowKey) &&
                            !resultListInfo[rowKey]
                        ) {
                            await getListInfo(record);
                        }
                        setExpandedRowKeys((prev) => [...prev, rowKey]);
                    } else {
                        setExpandedRowKeys((prev) =>
                            prev.filter((key) => key !== rowKey)
                        );
                    }
                },
            }}
            loading={loading ? { indicator: <Spin /> } : false}
        />
    );
};

export default TableGrid;
