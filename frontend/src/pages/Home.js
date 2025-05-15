import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import ImagemBackground from '../assets/barbearia_acinzentada.jpg';
import logoBarber from '../assets/logo_barber.png';

export default function Home({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={ImagemBackground}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Barbearia Clássica</Text>
        <Text style={styles.subtitle}>Estilo e Elegância ao seu Alcance</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Produtos')}
          >
            <Text style={styles.buttonText}>Produtos</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Cortes')}
          >
            <Text style={styles.buttonText}>Cortes</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Barbeiros')}
          >
            <Text style={styles.buttonText}>Barbeiros</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Agendamentos')}
          >
            <Text style={styles.buttonText}>Agende seu Horário</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Vendas')}
          >
            <Text style={styles.buttonText}>Vendas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Clientes')}
          >
            <Text style={styles.buttonText}>Clientes</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Graficos')}
          >
            <Text style={styles.buttonText}>Graficos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain'
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparência para destacar o texto
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#8B4513', // Cor marrom estilosa, típica de barbearias
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: { 
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});