
const reservaSchema = {
  nome: {
    isString: {
      errorMessage: 'Nome deve ser uma string',
    },
    isLength: {
      errorMessage: 'Name é obrigatório',
      options: { min: 1 },
    },
  },
  cpf: {
    isString: {
      errorMessage: 'CPF deve ser uma string',
    },
    isLength: {
      errorMessage: 'CPF é obrigatório',
    },
  },
  quantidadePessoas: {
    isNumeric: {
      errorMessage: 'QuantidadePessoas deve ser um número',
    },
    isLength: {
      errorMessage: 'QuantidadePessoas é obrigatório',
    },
  },
  data: {
    isString: {
      errorMessage: 'Data deve ser uma string',
    },
    isLength: {
      errorMessage: 'Data é  é obrigatória',
    },
  },
};

export {reservaSchema}