import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Meus Filmes. Seu lugar para adicionar filmes</Text>
        <Text style={styles.subtitle}>Clique na aba "FILMES" e adicione o que preferir.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#16247d',
    textAlign: 'center',
    marginBottom: 16,
    paddingTop: 50
  },
  subtitle: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
  },
});

export default Home;