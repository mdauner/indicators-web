import React from 'react';
import { useTable, Column } from 'react-table';
import { DataSet } from './types';

interface Props {
  columns: Column<DataSet>[];
  data: DataSet[];
}

function Table({ columns, data }: Props) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable<DataSet>({
    columns,
    data
  });

  return (
    <div className="overflow-x-scroll">
      <table
        {...getTableProps()}
        className="text-left w-full border-collapse border mt-4 p-8"
      >
        <thead className="header">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="bg-white py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-r border-gray-300"
                >
                  <div className="flex items-center">
                    {column.render('Header')}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="body">
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="py-4 px-6 border-b border-r border-gray-300 text-xs bg-white text-right"
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(Table);
