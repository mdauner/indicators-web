import React, { useEffect } from 'react';
import axios from 'axios';
import { Indicator, DataSet } from './types';

function App() {
  useEffect(() => {
    fetchData('SP.POP.TOTL');
  });

  const fetchData = async function(indicator: Indicator) {
    let url = `${process.env.REACT_APP_API_BASE_URL}display_data/?indicator=${indicator}`;
    const response = await axios.get<DataSet[]>(url);
    console.log(response);
  };

  return <div className=""></div>;
}

export default App;
