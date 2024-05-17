interface Produto {
  id?: number;
  nome: string;
  picture?: string;
  NameImg: string;
  descricao: string;
  categoria: string;
  precoAtual: number;
  faturamento: number;
  numVendas: number;
  usuarioId: string | null;
}

export default Produto;