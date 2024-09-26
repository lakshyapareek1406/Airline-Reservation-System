import React, { useState, useEffect } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import useFetch from '../../../Components/hooks/useFetch';
import { BASE_URL } from '../../../Components/Utils/config';

const PieCharts = () => {
  const { data: roundTourCount } = useFetch(`${BASE_URL}tourbooks/search/roundTourCount`);
  const { data: oneWayTourCount } = useFetch(`${BASE_URL}tourbooks/search/oneWayTourCount`);

  const [data, setData] = useState([
    { name: 'Round Tours', value: 0 },
    { name: 'One Way Tours', value: 0 },
  ]);

  useEffect(() => {
    if (roundTourCount !== undefined && oneWayTourCount !== undefined) {
      setData([
        { name: 'Round Tours', value: roundTourCount },
        { name: 'One Way Tours', value: oneWayTourCount },
      ]);
    }
  }, [roundTourCount, oneWayTourCount]);

  const COLORS = ['#F25252', '#2B6AED'];
  
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
        <h2 className='text-xl font-bold'>Tour Type</h2>
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

export default PieCharts;
