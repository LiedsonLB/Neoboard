class Product {
    id: number;
    nome: string;
    img: string | undefined;
    vendido: number;

    constructor(id: number, nome: string, img: string | undefined, vendido: number) {
        this.id = id;
        this.nome = nome;
        this.img = img;
        this.vendido = vendido;
    }
}

export default Product;
