import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Api from '../../Api';

export default props => {

  const navigation = useNavigation();

  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [clientes, setClientes] = useState('');

  const handleUpdate = async () => {
    try {
      const response =  await fetch(`http://localhost:3000/modelCliente/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name, telefone, senha})
      });
      if(response.ok){
        Alert.alert('Sucesso', 'Cliente atualizado com sucesso!');
        setName('');
        setEmail('');
        setTelefone('');
        setSenha('');
        setClientes(response);

        navigation.navigate('Clientes');
        
      }
    } catch (error) {
      console.error('Erro ao atualizar o cliente:', error);
      Alert.alert('Erro', 'Falha ao atualizar o cliente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualizar Cliente</Text>
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

          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
          />

          <Text style={styles.label}>Telefone:</Text>
          <TextInput
            style={styles.input}
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={senha}
          />

          <Button title="Atualizar Cliente" onPress={handleUpdate} />
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

