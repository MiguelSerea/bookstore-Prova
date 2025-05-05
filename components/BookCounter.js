import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

const BookCounter = () => {
  const total = useSelector(state => state.livros.lista.length);

  return (
    <View style={styles.counterContainer}>
      <Text style={styles.label}>Total de livros registrados: {total}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  counterContainer: { padding: 16, alignItems: 'center' },
  label: { fontSize: 16, marginBottom: 8 },
});

export default BookCounter;