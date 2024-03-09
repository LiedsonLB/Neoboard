import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import 'chartjs-plugin-datalabels';
ChartJS.register(...registerables);

const DoughnutChart = () => {
    const data = {
        labels: ['Faturamento', 'Lucro', 'Pendências'],
        datasets: [
            {
                data: [300, 100, 50],
                backgroundColor: ['#D9D9D9', '#1B2947', '#5B7FFF'],
                hoverBackgroundColor: ['#D9D9D9', '#1B2947', '#5B7FFF'],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        cutout: '50%',
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            formatter: (value: any, context: any) => {
              const sum = context.dataset.data.reduce((acc: any, val: any) => acc + val, 0);
              const percentage = ((value / sum) * 100).toFixed(2) + '%';
              return percentage;
            },
            color: '#fff',
            anchor: 'end',
            align: 'start',
            offset: 8,
          },
        },
      } as const;

    return (
        <div>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default DoughnutChart;
