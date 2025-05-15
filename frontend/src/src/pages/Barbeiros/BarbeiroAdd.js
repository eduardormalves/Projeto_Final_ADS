import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Barbeiro - id, name, email, telefone, senha

export default function RegisterBarbeiro() {

  const endpoint = "http://localhost:3000/modelBarbeiro";
  const navigation = useNavigation();


  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async() => {
    if (name === '' || email === '' || telefone === '' || senha === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    } else {
        try{
          const response = await fetch(endpoint,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({name, email, telefone, senha})
            });
            if(response.ok){
              Alert.alert("Barbeiro inserido com sucesso!");
              navigation.navigate('Barbeiros');
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
        placeholder="exemplo@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        placeholder="(xx)xxxxx-xxxx"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType='phone-pad'
      />
      <TextInput
        style={styles.input}
        placeholder='Senha'
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={senha}
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