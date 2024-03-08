import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = () => {
  const [meses, setMeses] = useState([]);

  useEffect(() => {
    const info = [
      {
        mes: 'janeiro',
        valor: 1000,
        color: 'pink'
      },
      {
        mes: 'fevereiro',
        valor: 2000,
        color: 'blue'
      },
      {
        mes: 'março',
        valor: 3000,
        color: 'yellow'
      },
      {
        mes: 'abril',
        valor: 7000,
        color: 'green'
      },
      {
        mes: 'Maio',
        valor: 1,
        color: 'red'
      },
    ];

    setMeses(info);
  }, []); // Utilizando useEffect para inicializar os meses apenas uma vez

  const labels = meses.map((item) => item.mes);
  const valores = meses.map((item) => item.valor);
  const colors = meses.map((item) => item.color);

  const data = {
    labels: labels,
    datasets: [
      {
        data: valores,
        backgroundColor: colors,
      },
    ],
  };

  return <Line data={data} />;
};

export default LineChart;
