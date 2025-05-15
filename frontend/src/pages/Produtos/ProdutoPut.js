import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default props => {

  const navigation = useNavigation();

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [quantidadeEstoque, setQuantidadeEstoque] = useState('');
  const [preco, setPreco] = useState('');
  const [produtos, setProdutos] = useState([]);

  const handleUpdate = async () => {
    try {
      const response =  await fetch(`http://localhost:3000/modelProduto/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, preco, quantidadeEstoque})
      });
      if(response.ok){
        Alert.alert('Sucesso', 'Corte atualizado com sucesso!');
        setName('');
        setQuantidadeEstoque('');
        setPreco('');
        setProdutos(response);
        
        navigation.navigate('Produtos');
      }
    } catch (error) {
      console.error('Erro ao atualizar o produto:', error);
      Alert.alert('Erro', 'Falha ao atualizar o produto.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualizar Produto</Text>
        <View style={styles.form}>
          <Text style={styles.label}>ID:</Text>
          <TextInput
            style={styles.input}
            value={id}
            onChangeText={setId}
          />
          
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Estoque:</Text>
          <TextInput
            style={styles.input}
            value={quantidadeEstoque}
            onChangeText={setQuantidadeEstoque}
          />

          <Text style={styles.label}>Preço:</Text>
          <TextInput
            style={styles.input}
            value={preco}
            onChangeText={setPreco}
            keyboardType="numeric"
          />

          <Button title="Atualizar Produto" onPress={handleUpdate} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardPrice: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 10,
  },
});

