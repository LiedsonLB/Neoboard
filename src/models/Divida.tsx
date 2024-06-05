import Venda from './Venda'

interface Divida {
    id: number;
    idVenda: number;
    pago: boolean;
    venda: Venda;
}

export default Divida;  