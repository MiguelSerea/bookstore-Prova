import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  DataTable,
  Dialog,
  Portal,
  Button,
  Text,
  Chip,
  IconButton,
  TextInput,
  Menu,
  Checkbox,
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { removerLivro, editarLivro } from '../redux/bookSlice';
import BookCounter from '../components/BookCounter';

const GENRES = [
  { key: 'all', label: 'Todos' },
  { key: 'scifiction', label: 'Ficção científica' },
  { key: 'fantasy', label: 'Fantasia' },
  { key: 'realhistory', label: 'Baseado em fatos reais' },
];

const genreMap = {
  scifiction: 'Ficção científica',
  fantasy: 'Fantasia',
  realhistory: 'Baseado em fatos reais',
};

const genreOptions = [
  { label: 'Ficção científica', value: 'scifiction' },
  { label: 'Fantasia', value: 'fantasy' },
  { label: 'Baseado em fatos reais', value: 'realhistory' },
];

const BookListScreen = () => {
  const books = useSelector(state => state.livros.lista);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState('all');
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [bookToEdit, setBookToEdit] = useState(null);

  const [menuVisible, setMenuVisible] = useState(false);
  const [validationError, setValidationError] = useState('');

  const filteredBooks =
    filter === 'all' ? books : books.filter(book => book.genre === filter);

  const showDeleteDialog = (bookId) => {
    setBookToDelete(bookId);
    setVisibleDialog(true);
  };

  const handleDeleteBook = () => {
    if (bookToDelete) {
      dispatch(removerLivro(bookToDelete));
    }
    setVisibleDialog(false);
    setBookToDelete(null);
  };

  const handleSaveEdit = () => {
    const { title, author, year, genre, available } = bookToEdit || {};

    if (!title || !author || !year || !genre) {
      setValidationError('Todos os campos devem ser preenchidos.');
      return;
    }

    setValidationError('');
    dispatch(editarLivro(bookToEdit));
    setBookToEdit(null);
  };

  return (
    <View style={styles.container}>
      <BookCounter />
      <View style={styles.filterContainer}>
        {GENRES.map(g => (
          <Chip
            key={g.key}
            selected={filter === g.key}
            onPress={() => setFilter(g.key)}
            style={styles.chip}
            icon={g.key === 'all' ? 'filter' : undefined}>
            {g.label}
          </Chip>
        ))}
      </View>

      <DataTable>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title style={styles.colTitle}>Título</DataTable.Title>
          <DataTable.Title style={styles.colAno}>Ano</DataTable.Title>
          <DataTable.Title style={styles.colAutor}>Autor</DataTable.Title>
          <DataTable.Title style={styles.colGenero}>Gênero</DataTable.Title>
          <DataTable.Title style={styles.colDisponivel}>Disponível?</DataTable.Title>
          <DataTable.Title style={styles.colActions} numeric>Ações</DataTable.Title>
        </DataTable.Header>

        {filteredBooks.length === 0 ? (
          <DataTable.Row>
            <DataTable.Cell><Text>Nenhum livro encontrado.</Text></DataTable.Cell>
          </DataTable.Row>
        ) : (
          filteredBooks.map(book => (
            <DataTable.Row key={book.id}>
              <DataTable.Cell style={styles.colTitle}>
                <Text
                  numberOfLines={1}
                  style={!book.available ? styles.rowUnavailable : {}}
                >
                  {book.title}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell style={styles.colAno} numeric>
                <Text
                  style={[
                    { paddingRight: 10, minWidth: 50, textAlign: 'center' },
                    !book.available ? styles.rowUnavailable : {},
                  ]}
                >
                  {book.year}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell style={styles.colAutor}>
                <Text
                  numberOfLines={1}
                  style={[
                    { paddingLeft: 10 },
                    !book.available ? styles.rowUnavailable : {},
                  ]}
                >
                  {book.author}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell style={styles.colGenero}>
                <Text style={!book.available ? styles.rowUnavailable : {}}>
                  {genreMap[book.genre]}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell style={styles.colDisponivel}>
                <View style={{ alignItems: 'center', width: '100%' }}>
                  <Checkbox status={book.available ? 'checked' : 'unchecked'} disabled />
                </View>
              </DataTable.Cell>
              <DataTable.Cell style={styles.colActions} numeric>
                <IconButton icon="pencil" size={18} onPress={() => setBookToEdit(book)} />
                <IconButton icon="delete" size={18} onPress={() => showDeleteDialog(book.id)} />
              </DataTable.Cell>
            </DataTable.Row>
          ))
        )}
      </DataTable>

      {/* Diálogo de Exclusão */}
      <Portal>
        <Dialog visible={visibleDialog} onDismiss={() => setVisibleDialog(false)}>
          <Dialog.Title>Confirmar exclusão</Dialog.Title>
          <Dialog.Content>
            <Text>Tem certeza que deseja excluir este livro?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisibleDialog(false)}>Cancelar</Button>
            <Button onPress={handleDeleteBook}>Excluir</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Diálogo de Edição */}
      <Portal>
        <Dialog visible={!!bookToEdit} onDismiss={() => setBookToEdit(null)}>
          <Dialog.Title>Editar Livro</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Título"
              value={bookToEdit?.title || ''}
              onChangeText={text => setBookToEdit({ ...bookToEdit, title: text })}
            />
            <TextInput
              label="Ano"
              keyboardType="numeric"
              value={bookToEdit?.year || ''}
              onChangeText={text => setBookToEdit({ ...bookToEdit, year: text })}
            />
            <TextInput
              label="Autor"
              value={bookToEdit?.author || ''}
              onChangeText={text => setBookToEdit({ ...bookToEdit, author: text })}
            />

            {/* Combobox de Gênero */}
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setMenuVisible(true)}
                  style={{ marginTop: 10 }}>
                  {genreMap[bookToEdit?.genre] || 'Selecionar gênero'}
                </Button>
              }>
              {genreOptions.map(option => (
                <Menu.Item
                  key={option.value}
                  onPress={() => {
                    setBookToEdit({ ...bookToEdit, genre: option.value });
                    setMenuVisible(false);
                  }}
                  title={option.label}
                />
              ))}
            </Menu>

            {/* Checkbox para Disponível */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <Checkbox
                status={bookToEdit?.available ? 'checked' : 'unchecked'}
                onPress={() => setBookToEdit({ ...bookToEdit, available: !bookToEdit?.available })}
              />
              <Text>Disponível</Text>
            </View>

            {validationError ? (
              <Text style={{ color: 'red', marginTop: 8 }}>{validationError}</Text>
            ) : null}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setBookToEdit(null)}>Cancelar</Button>
            <Button onPress={handleSaveEdit}>Salvar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  filterContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  chip: { marginRight: 8, marginBottom: 8 },
  tableHeader: { backgroundColor: '#f5f5f5' },

  colTitle:      { flex: 2.3, minWidth: 90, paddingRight: 8 },
  colAno:        { flex: 0.9, minWidth: 45, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5 },
  colAutor:      { flex: 1.6, minWidth: 80, paddingLeft: 10 },
  colGenero:     { flex: 1.6, minWidth: 85, paddingLeft: 8 },
  colDisponivel: { flex: 1, alignItems: 'center', justifyContent: 'center', minWidth: 45 },
  colActions:    { flex: 0.8, alignItems: 'flex-end', minWidth: 60 },

  rowUnavailable: { color: 'red' }, // <- Adicionado para texto vermelho
});

export default BookListScreen;