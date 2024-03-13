import React, { useState } from 'react';
import { PolarArea } from 'react-chartjs-2';

const PaymentMethodsChart = () => {
    const [paymentData, setPaymentData] = useState({
        labels: ['Dinheiro', 'Pix', 'Cartão (Crédito)', 'Cartão (Débito)', 'Boleto', 'Cheque', 'Transferência', 'Em Dívida'],
        datasets: [
            {
                data: [2000, 1500, 3000, 2500, 0, 0, 0, 800],
                backgroundColor: [
                    '#2ecc71',
                    '#3498db',
                    '#e74c3c',
                    '#f39c12',
                    '#9b59b6',
                    '#f1c40f',
                    '#1abc9c',
                    '#1f1f1f',
                ],
            },
        ],
    });

    const options = {
        cutout: '70%',
        scale: {
            ticks: {
                beginAtZero: true,
            },
            gridLines: {
                color: 'rgba(0, 0, 0, 0.1)',
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'bottom' as 'bottom',
            },
        },
    };

    return <PolarArea data={paymentData} options={options} />;
};

export default PaymentMethodsChart;
