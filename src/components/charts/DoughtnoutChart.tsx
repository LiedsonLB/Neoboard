import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

const DoughnutChart = () => {
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

  const containerStyle = {
    width: '90%',
    margin: '0 auto'
  };

  return (
    <div style={containerStyle}>
      <div className='chartHome'>
        <Doughnut data={data} options={options} />
      </div>
      <div>
        <div id="container-doughnut-datas">
          <ul>
            <li className="doughnut-datas">
              <div>
                <p>Faturamento</p>
              </div>
            </li>

            <li className="doughnut-datas">
              <div>
                <p>Lucro</p>
              </div>
            </li>

            <li className="doughnut-datas">
              <div>
                <p>Pendências</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
