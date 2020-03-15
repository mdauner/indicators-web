import React from 'react';
import { useTable, Column, useSortBy, Cell } from 'react-table';
import { useSticky } from 'react-table-sticky';
import { DataSet } from './types';

interface Props {
  columns: Column<DataSet>[];
  data: DataSet[];
  selectedDataSetId?: number;
  selectedYear?: string;
  onClickCell: (dataSet: DataSet, year: string) => void;
}

function Table({
  columns,
  data,
  selectedDataSetId,
  selectedYear,
  onClickCell
}: Props) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable<DataSet>(
    {
      columns,
      data
    },
    useSortBy,
    useSticky
  );

  function isYearCell(cell: Cell<DataSet>) {
    return Number.isInteger(parseInt(cell.column.id));
  }

  function isCellSelected(cell: Cell<DataSet>) {
    return (
      selectedYear === cell.column.id &&
      selectedDataSetId === cell.row.original.id
    );
  }

  function getCellClasses(cell: Cell<DataSet>) {
    return `py-4 px-6 border-b border-r border-gray-300 text-xs bg-white text-right ${
      isYearCell(cell) ? ' cursor-pointer' : ''
    } ${isCellSelected(cell) ? 'bg-gray-400' : ''}`;
  }

  function onClick(cell: Cell<DataSet>) {
    if (isYearCell(cell)) {
      onClickCell(cell.row.original, cell.column.id);
    }
  }

  return (
    <div className="overflow-x-scroll">
      <table
        {...getTableProps()}
        className="table sticky text-left w-full border-collapse border mt-4 p-8"
      >
        <thead className="header">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="bg-white py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-r border-gray-300"
                >
                  <div className="flex items-center">
                    {column.render('Header')}
                    <div className="ml-2">
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </div>
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
                      className={getCellClasses(cell)}
                      onClick={() => onClick(cell)}
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
