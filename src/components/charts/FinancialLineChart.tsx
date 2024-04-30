import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

interface MesInfo {
  mes: string;
  valor: number;
  color: string;
}

const FinancialLineChart = () => {
  const [meses, setMeses] = useState<MesInfo[]>([]);

  useEffect(() => {
    const info: MesInfo[] = [
      {
        mes: 'Janeiro',
        valor: 20,
        color: 'pink',
      },
      {
        mes: 'Fevereiro',
        valor: 40,
        color: 'blue',
      },
      {
        mes: 'Março',
        valor: 37,
        color: 'yellow',
      },
      {
        mes: 'Abril',
        valor: 58,
        color: 'green',
      },
      {
        mes: 'Maio',
        valor: 55,
        color: 'red',
      },
      {
        mes: 'Junho',
        valor: 60,
        color: 'red',
      },
      {
        mes: 'Julho',
        valor: 70,
        color: 'red',
      },
      {
        mes: 'Agosto',
        valor: 93,
        color: 'red',
      },
      {
        mes: 'Setembro',
        valor: 125,
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
        fill: false,
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

  return <Line className='chartFinancialLine' data={data} options={options} />;
};

export default FinancialLineChart;
