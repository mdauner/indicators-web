import React, { useEffect, useState } from 'react';
import { CellProps, Column } from 'react-table';
import axios from 'axios';

import { Indicator, DataSet, IndicatorChoice } from './types';
import Table from './Table';
import Editor from './Editor';

const INDICATOR_CHOICES: IndicatorChoice[] = [
  {
    id: 'SP.POP.TOTL',
    label: 'Population, total'
  },
  {
    id: 'NY.GDP.MKTP.CD',
    label: 'GDP, total'
  },
  {
    id: 'EN.ATM.CO2E.PC',
    label: 'CO2 Emissions'
  },
  {
    id: 'SP.DYN.LE00.IN',
    label: 'Life Expectancy at Birth'
  },
  {
    id: 'TX.VAL.TECH.MF.ZS',
    label: 'High-technology exports (% of manufactured exports)'
  },
  {
    id: 'IP.PAT.NRES',
    label: 'Patent Application, non-residents'
  },
  {
    id: 'IP.PAT.RESD',
    label: 'Patent Application, residents'
  }
];

function App() {
  const [data, setData] = useState<DataSet[]>();
  const [indicator, setIndicator] = useState<Indicator>('SP.POP.TOTL');
  const [selectedDataSet, selectDataSet] = useState<DataSet>();
  const [selectedYear, selectYear] = useState<string>();
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    fetchData(indicator);
  }, [indicator]);

  useEffect(() => {
    if (selectedDataSet && selectedYear) {
      setNewValue(selectedDataSet.data[selectedYear] ?? '');
    }
  }, [selectedDataSet, selectedYear]);

  const fetchData = async function(indicator: Indicator) {
    const url = `${process.env.REACT_APP_API_BASE_URL}display_data/?indicator=${indicator}`;
    const response = await axios.get<DataSet[]>(url);
    setData(response.data);
  };

  const editCell = React.useCallback(function(dataSet: DataSet, year: string) {
    selectDataSet(dataSet);
    selectYear(year);
  }, []);

  async function onSaveCellValue() {
    const url = `${process.env.REACT_APP_API_BASE_URL}display_data/${
      selectedDataSet!.id
    }/`;
    try {
      await axios.patch<DataSet>(url, {
        year: selectedYear,
        value: newValue
      });

      fetchData(indicator);
      setNewValue('');
      selectDataSet(undefined);
      selectYear(undefined);
    } catch {
      console.warn('Error');
    }
  }

  const columns: Column<DataSet>[] = React.useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'country',
        sticky: 'left',
        Cell: ({ cell }: CellProps<DataSet>) => (
          <div className="font-bold">{cell.value}</div>
        )
      },
      ...Object.keys(data?.[0].data ?? {}).map((year) => ({
        id: year,
        Header: () => <div>{year}</div>,
        accessor: `data[${year}]`,
        Cell: ({ cell }: CellProps<DataSet>) => (
          <div>
            {cell.value
              ? new Intl.NumberFormat('en-US', {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1
                }).format(cell.value)
              : '---'}
          </div>
        )
      }))
    ],
    [data]
  );

  return (
    <div className="w-screen flex justify-center">
      <div className="p-8 container mx-auto flex flex-col bg-white my-16 shadow-lg rounded-lg w-full">
        <div className="flex lg:items-center flex-col lg:flex-row">
          <div className="flex-1 text-lg lg:text-3xl font-bold uppercase mb-4 lg:mb-0">
            World Bank data
          </div>
          <div className="flex items-center">
            <label
              className="w-56 lg:text-right lg:mr-2"
              htmlFor="indicator-select"
            >
              Select an indicator:
            </label>
            <select
              id="indicator-select"
              className="block appearance-none w-full bg-gray-300 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={(event) =>
                setIndicator(event.target.value as Indicator)
              }
            >
              {INDICATOR_CHOICES.map(({ label, id }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {!data ? (
          <div className="w-full h-64 flex justify-center items-center">
            <div className="font-bold text-2xl">Loading ...</div>
          </div>
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              selectedDataSetId={selectedDataSet?.id}
              selectedYear={selectedYear}
              onClickCell={editCell}
            />
            <Editor
              selectedDataSet={selectedDataSet}
              selectedYear={selectedYear}
              value={newValue}
              onChange={setNewValue}
              onSave={onSaveCellValue}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
