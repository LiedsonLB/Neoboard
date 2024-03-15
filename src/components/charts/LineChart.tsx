import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

interface MesInfo {
  mes: string;
  valor: number;
  color: string;
}

const LineChart = () => {
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
        valor: 7000,
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
        valor: 1000,
        color: 'red',
      },
    ];

    setMeses(info);
  }, []);

  const labels = meses.map((item) => item.mes);
  const valores = meses.map((item) => item.valor);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Valores Mensais',
        data: valores,
        fill: true,
        backgroundColor: 'rgba(91, 127, 255, 0.3)',
        borderColor: '#5B7FFF',
        borderWidth: 2,
        pointBackgroundColor: '#5B7FFF', // Cor dos pontos
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false, // Ocultar linhas de grade no eixo X
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Cor das linhas de grade no eixo Y
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
