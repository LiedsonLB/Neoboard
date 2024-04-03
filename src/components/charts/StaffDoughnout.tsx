import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

const StaffDoughnout = () => {
  const data = {
    labels: ['Faturamento', 'Lucro', 'Pendências'],
    datasets: [
      {
        data: [300, 100, 50],
        backgroundColor: ['#D9D9D9', '#1B2947', '#5B7FFF'],
        borderWidth: 5,
        hoverBorderColor: '#ffffff'
      },
    ],
  };

  const options = {
    cutout: '50%',
    plugins: {
      legend: {
        display: false,
      },
    },
  } as const;

  return (
    <div className='chartStaff'>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default StaffDoughnout;
