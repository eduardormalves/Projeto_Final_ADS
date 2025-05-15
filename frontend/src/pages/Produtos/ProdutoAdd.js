import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function RegisterProduto() {

  const endpoint = "http://localhost:3000/modelProduto";
  const navigation = useNavigation();


  const [preco, setPreco] = useState('');
  const [name, setName] = useState('');
  const [quantidadeEstoque, setQuantidadeEstoque] = useState('');

  const handleRegister = async() => {
    if (preco === '' || name === '' || quantidadeEstoque === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    } else {
        try{
          const response = await fetch(endpoint,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({preco, name, quantidadeEstoque})
            });
            if(response.ok){
              Alert.alert("Produto inserido com sucesso!");
              navigation.navigate('Produtos');
            }
        }catch(error){
            console.error(error);
        }
      Alert.alert('Sucesso', 'Cadastro bem-sucedido!');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Estoque"
        value={quantidadeEstoque}
        onChangeText={setQuantidadeEstoque}
      />
      <TextInput
        style={styles.input}
        placeholder="9.99"
        value={preco}
        onChangeText={setPreco}
      />
      

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  corteContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  corteText: {
    color: '#888',
  },
  corteLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});