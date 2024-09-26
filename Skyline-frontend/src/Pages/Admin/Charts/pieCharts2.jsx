import React, { useState, useEffect } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import useFetch from '../../../Components/hooks/useFetch';
import { BASE_URL } from '../../../Components/Utils/config';

const PieCharts2 = () => {
  const { data: MaleCount } = useFetch(`${BASE_URL}register/search/MaleCount`);
  const { data: FemaleCount } = useFetch(`${BASE_URL}register/search/FemaleCount`);

  const [data, setData] = useState([
    { name: 'Male', value: 0 },
    { name: 'Female', value: 0 },
  ]);

  useEffect(() => {
    if (MaleCount !== undefined && MaleCount !== undefined) {
      setData([
        { name: 'Male', value: MaleCount },
        { name: 'Female', value: MaleCount },
      ]);
    }
  }, [MaleCount, MaleCount]);

  const COLORS = ['#72CCFF', '#02B2AF'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className='basis-[30%] bg-white shadow-md cursor-pointer rounded-[4px] h-[559px]'>
      <div className='bg-[#F8F9FC] flex items-center justify-center py-[15px] px-[20px]  border-b-[1px] border-[#EDEDED]'>
        <h2 className='text-xl font-bold'>Passenger Gender</h2>
        <FaEllipsisV color='gray' className='cursor-pointer' />
      </div>
      <div className='pl-[35px]'>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <div className='grid grid-cols-4'>
          {data.map((item, index) => (
            <p key={index} className='cursor-pointer font-bold'>{item.name}</p>
          ))}
        </div>
        <div className='grid grid-cols-4 mt-[10px] '>
          {COLORS.map((item, index) => (
            <div className='h-[30px] w-[30px]' style={{ backgroundColor: item }} key={index}></div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default PieCharts2;
