import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default props => {
  const [dataVenda, setDataVenda] = useState('');
  const [id, setId] = useState('');
  const navigation = useNavigation();

    
  const handleUpdate = async () => {
    if (dataVenda === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/modelVenda/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({dataVenda}),
      });
      if (response.ok) {
        Alert.alert('Sucesso', 'Venda atualizada com sucesso!');
        navigation.navigate('Vendas');
      } else {
        Alert.alert('Erro', 'Falha ao atualizar a venda.');
      }
    } catch (error) {
      console.error('Erro ao atualizar a venda:', error);
      Alert.alert('Erro', 'Falha ao atualizar a venda.');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualizar Venda</Text>
  
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="Data da Venda (DD/MM/AAAA)"
        value={dataVenda}
        onChangeText={setDataVenda}
      />
  
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Atualizar Venda</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
