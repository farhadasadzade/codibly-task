import React, { FC } from "react";
import { useCreation } from "ahooks";
import { Table as AntTable } from "antd";
import { ITable } from "../../shared/models/interfaces";
import { TableColumns } from "./data";

const Table: FC<ITable> = ({
  dataSource,
  totalPaginations,
  handleChangePage,
  currentPage,
  handleClickRow,
}) => {
  const columns = useCreation(() => TableColumns, [dataSource]);

  return (
    <AntTable
      dataSource={dataSource}
      columns={columns}
      rowKey={(row) => row?.id}
      pagination={{
        defaultPageSize: 5,
        defaultCurrent: 1,
        onChange: handleChangePage,
        total: totalPaginations,
        current: currentPage,
      }}
      onRow={(record, rowIndex) => {
        return {
          onClick: () => handleClickRow(record),
        };
      }}
    />
  );
};

export default Table;
