interface Produto {
  nome: string;
  picture?: string;
  NameImg: string;
  descricao: string;
  categoria: string;
  precoAtual: string;
  usuarioId: string | null;
}

export default Produto;