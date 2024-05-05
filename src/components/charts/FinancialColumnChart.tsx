import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

interface MesInfo {
  mes: string;
  valor: number;
  color: string;
}

const FinancialColumnChart = () => {
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
        valor: 3900,
        color: 'red',
      },
      {
        mes: 'Junho',
        valor: 2500,
        color: 'red',
      },
      {
        mes: 'Julho',
        valor: 5600,
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
        label: 'Gráfico de Faturamento',
        data: valoresDespesas,
        backgroundColor: 'var(--secondy-color)',
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
    plugins: {
      legend: {
        display: true,
        labels: {
          filter: () => false
        }
      },
    },
  };

  return (
    <div  style={{fontSize: '.8rem', display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center'}}>
      <p className='text-historico'>Gráfico de Faturamento</p>
      <Bar className='graficColunm-financial' data={data} options={options} />
    </div>
  );
};

export default FinancialColumnChart;
