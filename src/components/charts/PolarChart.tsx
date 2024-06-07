import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

interface Venda {
    Data: string;
    funcionarioId: number;
    produtoid: number;
    quantidadeProdutos: number;
    valor: number;
    comprador: string;
    regiaoId: number;
    formaPagamento: string;
    usuarioId: string;
}

const PaymentMethodsChart = ({ salesData }: { salesData: Venda[] }) => {
    const [paymentData, setPaymentData] = useState<{
        labels: string[];
        datasets: {
            data: number[];
            backgroundColor: string[];
        }[];
    }>({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [],
            },
        ],
    });

    useEffect(() => {
        const calculatePaymentData = () => {
            const salesByPaymentMethod = salesData.reduce((acc, venda) => {
                const paymentMethod = venda.formaPagamento;
                acc[paymentMethod] = (acc[paymentMethod] || 0) + venda.valor;
                return acc;
            }, {});

            const uniquePaymentMethods = Object.keys(salesByPaymentMethod);

            // Definindo cores personalizadas para cada forma de pagamento
            const paymentColors: Record<string, string> = {
                Dinheiro: '#2ecc71',
                'À vista': '#2ecc71',
                Pix: '#3498db',
                'Cartão (Crédito)': '#e74c3c',
                'Cartão (Débito)': '#f39c12',
                'Cartão': '#f39c12',
                Boleto: '#9b59b6',
                Cheque: '#f1c40f',
                Transferência: '#1abc9c',
                Dívida: '#1f1f1f',
            };

            // Atualizar os dados do gráfico com as formas de pagamento e cores personalizadas
            setPaymentData(prevData => ({
                ...prevData,
                labels: uniquePaymentMethods,
                datasets: [{
                    ...prevData.datasets[0],
                    data: uniquePaymentMethods.map(method => salesByPaymentMethod[method]),
                    backgroundColor: uniquePaymentMethods.map(method => paymentColors[method]),
                }],
            }));
        };

        calculatePaymentData();
    }, [salesData]);

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
