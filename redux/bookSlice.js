import { createSlice } from '@reduxjs/toolkit';

export const bookSlice = createSlice({
  name: 'livros',
  initialState: {
    lista: [],
  },
  reducers: {
    adicionarLivro: (state, action) => {
      state.lista.push({
        ...action.payload,
        id: Date.now().toString(), // único para cada livro
      });
    },
    removerLivro: (state, action) => {
      state.lista = state.lista.filter(livro => livro.id !== action.payload);
    },
    editarLivro: (state, action) => {
      state.lista = state.lista.map(livro =>
        livro.id === action.payload.id ? { ...action.payload } : livro
      );
    },
  },
});

export const { adicionarLivro, removerLivro, editarLivro } = bookSlice.actions;
export default bookSlice.reducer;