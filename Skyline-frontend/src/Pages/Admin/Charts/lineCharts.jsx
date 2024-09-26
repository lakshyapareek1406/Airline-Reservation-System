import React, { useState, useEffect } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import useFetch from '../../../Components/hooks/useFetch';
import { BASE_URL } from '../../../Components/Utils/config';
import PieCharts from './PieCharts';
import PieCharts2 from './pieCharts2';

const Chart = () => {
  const { data: economyTourCount } = useFetch(`${BASE_URL}tourbooks/search/getbusinesstotalprice`);
  const { data: businessTourCount } = useFetch(`${BASE_URL}tourbooks/search/geteconomytotalprice`);

  // Initial data for the bar chart
  const initialData = [
    { name: 'Business Tour Total Price', value: 0 },
    { name: 'Economy Tour Total Price', value: 0 },
  ];

  // State to hold the data for the bar chart
  const [chartData, setChartData] = useState(initialData);

  useEffect(() => {
    // Update chartData when roundTourCount or oneWayTourCount changes
    if (economyTourCount !== undefined && businessTourCount !== undefined) {
      setChartData([
        { name: 'Economy Tour Total Price', value: businessTourCount },
        { name: 'Business Tour Total Price', value: economyTourCount },
      ]);
    }
  }, [economyTourCount, businessTourCount]);

  return (
    <div className='flex mt-[3px]  gap-[30px]'>
      <div className='basis-[70%] bg-white shadow-md cursor-pointer rounded-[4px]'>
        <div className='bg-[#F8F9FC] flex items-center justify-between  px-[20px] border-[#EDEDED] md-[20px]'>
          <h2>Amount Overview</h2>
          <FaEllipsisV color='gray' className='cursor-pointer' />
        </div>
        <div>
          <ResponsiveContainer width="70%" height={500}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <PieCharts2/>
      <div>
        <PieCharts />
      </div>
    </div>
  );
};

export default Chart;
