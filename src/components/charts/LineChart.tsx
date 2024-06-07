import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { format } from 'date-fns';
ChartJS.register(...registerables);

interface Venda {
  Data: string;
  valor: number;
}

const LineChart = ({ vendas }: { vendas: Venda[] }) => {
  const [dadosVendas, setDadosVendas] = useState<number[]>([]);

  useEffect(() => {
    // Extrair os valores das vendas para os dados do gráfico
    const valoresVendas = vendas.map((venda) => venda.valor);
    setDadosVendas(valoresVendas);
  }, [vendas]);

  const labels = vendas.map((venda) => format(new Date(venda.Data), 'dd/MM'));

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Valores Mensais',
        data: dadosVendas,
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

  return <Line className='chartLine' data={data} options={options} />;
};

export default LineChart;