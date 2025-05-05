import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, RadioButton, Button, Text, Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { adicionarLivro } from '../redux/bookSlice';

const AddBookScreen = () => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [ano, setAno] = useState('');
  const [tipo, setTipo] = useState('fantasy');
  const [disponivel, setDisponivel] = useState(true);       // NOVO STATE!
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isFormValid = titulo && autor && ano;

  const handleAddBook = () => {
    dispatch(adicionarLivro({
      title: titulo,
      author: autor,
      year: ano,
      genre: tipo,
      available: disponivel, // PEGA O CHECK!
    }));
    setTitulo('');
    setAutor('');
    setAno('');
    setTipo('fantasy');
    setDisponivel(true);   // Reseta o checkbox ao adicionar
    navigation.navigate('Books');
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Título"
        value={titulo}
        onChangeText={setTitulo}
        mode="outlined"
        left={<TextInput.Icon name="book" />}
        style={styles.input}
      />
      <TextInput
        label="Autor"
        value={autor}
        onChangeText={setAutor}
        mode="outlined"
        left={<TextInput.Icon name="account" />}
        style={styles.input}
      />
      <TextInput
        label="Ano de Publicação"
        value={ano}
        onChangeText={v => setAno(v.replace(/[^0-9]/g, ''))}
        mode="outlined"
        left={<TextInput.Icon name="calendar" />}
        style={styles.input}
        keyboardType="numeric"
        maxLength={4}
      />
      <Text style={styles.tipoLabel}>Gênero:</Text>
      <RadioButton.Group onValueChange={setTipo} value={tipo}>
        <View style={styles.radioOption}>
          <RadioButton value="scifiction" />
          <Text>Ficção científica</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton value="fantasy" />
          <Text>Fantasia</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton value="realhistory" />
          <Text>Baseado em fatos reais</Text>
        </View>
      </RadioButton.Group>

      {/* CHECKBOX DE DISPONIBILIDADE */}
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={disponivel ? 'checked' : 'unchecked'}
          onPress={() => setDisponivel(!disponivel)}
        />
        <Text>Disponível</Text>
      </View>

      <Button 
        mode="contained" 
        onPress={handleAddBook}
        style={styles.button}
        disabled={!isFormValid}
      >
        Adicionar Livro
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { marginBottom: 16 },
  tipoLabel: { marginBottom: 8, fontSize: 16, fontWeight: 'bold' },
  radioOption: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 }, // NOVO
  button: { marginTop: 24 },
});

export default AddBookScreen;