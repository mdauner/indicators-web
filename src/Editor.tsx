import React from 'react';
import { DataSet } from './types';

interface Props {
  selectedDataSet?: DataSet;
  selectedYear?: string;
  value?: string;
  onChange: (value: string) => void;
  onSave: () => void;
}

export default function Editor({
  selectedDataSet,
  selectedYear,
  value,
  onChange,
  onSave
}: Props) {
  if (!selectedDataSet || !selectedYear) {
    return null;
  }

  return (
    <div className="mt-8 flex items-center">
      <div>
        Update value of {selectedDataSet.country} ({selectedYear}):
      </div>
      <input
        type="number"
        className="ml-4 bg-white border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        onClick={onSave}
        disabled={!value || isNaN(parseFloat(value))}
        className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save
      </button>
    </div>
  );
}
