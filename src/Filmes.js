import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Filmes = () => {
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const storedMovies = await AsyncStorage.getItem('movies');
      if (storedMovies !== null) {
        setMovies(JSON.parse(storedMovies));
      }
    } catch (error) {
      console.log('Erro ao obter filmes do AsyncStorage: ', error);
    }
  };

  const saveMovie = async () => {
    try {
      if (inputValue.trim() !== '') {
        const movie = {
          id: Date.now().toString(),
          title: inputValue,
        };

        const updatedMovies = [...movies, movie];

        await AsyncStorage.setItem('movies', JSON.stringify(updatedMovies));
        setMovies(updatedMovies);
        setInputValue('');
      }
    } catch (error) {
      console.log('Erro ao salvar o filme no AsyncStorage: ', error);
    }
  };

  const deleteMovie = async (movieId) => {
    try {
      const updatedMovies = movies.filter((movie) => movie.id !== movieId);
      await AsyncStorage.setItem('movies', JSON.stringify(updatedMovies));
      setMovies(updatedMovies);
    } catch (error) {
      console.log('Erro ao excluir o filme do AsyncStorage: ', error);
    }
  };

  const renderMovieItem = ({ item }) => (
    <View style={styles.movieItem}>
      <Text style={styles.movieTitle}>{item.title}</Text>
      <TouchableOpacity onPress={() => deleteMovie(item.id)}>
        <AntDesign name="delete" size={24} color="blue" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filmes</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          placeholder="Digite o nome do filme"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.addButton} onPress={saveMovie}>
          <Text style={styles.addButtonLabel}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id}
        style={styles.moviesList}
      />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#16247d',
    textAlign: 'center',
    paddingTop: 200,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#16247d',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  moviesList: {
    width: '100%',
    paddingTop: 20,
  },
  movieItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#16247d',
  },
  movieTitle: {
    flex: 1,
    fontSize: 16,
  },
});

export default Filmes;
