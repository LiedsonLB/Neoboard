import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

interface MesInfo {
  mes: string;
  valor: number;
  color: string;
}

const ColumnChart = () => {
  const [meses, setMeses] = useState<MesInfo[]>([]);

  useEffect(() => {
    const info: MesInfo[] = [
      {
        mes: 'Janeiro',
        valor: 1000,
        color: 'pink',
      },
      {
        mes: 'Fevereiro',
        valor: 2000,
        color: 'blue',
      },
      {
        mes: 'Março',
        valor: 3000,
        color: 'yellow',
      },
      {
        mes: 'Abril',
        valor: 7000,
        color: 'green',
      },
      {
        mes: 'Maio',
        valor: 4500,
        color: 'red',
      },
    ];

    setMeses(info);
  }, []);

  const labels = meses.map((item) => item.mes);
  const valoresDespesas = meses.map((item) => item.valor);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Gráfico de despesas',
        data: valoresDespesas,
        backgroundColor: 'rgba(91, 127, 255, 0.2)',
        borderColor: '#5B7FFF',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ColumnChart;
