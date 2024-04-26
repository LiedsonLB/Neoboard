import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';

const PaymentMethodsChart = () => {
    const [paymentData, setPaymentData] = useState({
        labels: ['Dinheiro', 'Pix', 'Cartão (Crédito)', 'Cartão (Débito)', 'Boleto', 'Cheque', 'Transferência', 'Em Dívida'],
        datasets: [
            {
                data: [2000, 1500, 3000, 2500, 1000, 2000, 400, 800],
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
        cutout: '0%',
        plugins: {
            legend: {
                display: false,
                position: 'left' as 'left',
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Pie className='pizzaChart' data={paymentData} options={options} style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default PaymentMethodsChart;
