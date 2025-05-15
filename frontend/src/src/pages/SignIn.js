import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';



export default function LoginScreen() {

    const endpoint = "http://localhost:3000/modelCliente";
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
  
    const handleLogin = async () => {

      if (email === '' || senha === '') {
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        return;
      }
  
      try {
        const response = await fetch(endpoint);
        const clientes = await response.json();
  
        if (response.ok && typeof clientes === 'object' && clientes.length > 0) {
          let autenticado = false;
  
          for (let i = 0; i < clientes.length; i++) {
            if (clientes[i].email === email && clientes[i].senha === senha) {
              autenticado = true;
              break;
            }
          }
  
          if (autenticado) {
            Alert.alert('Sucesso', 'Login bem-sucedido!');
            navigation.navigate('Home');
          } else {
            Alert.alert('Erro', 'Email ou senha inválidos.');
          }
        } else {
          Alert.alert('Erro', 'Falha ao buscar clientes no servidor.');
        }
      } catch (error) {
        console.error('Erro ao realizar login:', error);
        Alert.alert('Erro', 'Falha ao realizar login. Tente novamente.');
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
  
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
  
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
  
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupLink}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
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
    signupContainer: {
      flexDirection: 'row',
      marginTop: 10,
    },
    signupText: {
      color: '#888',
    },
    signupLink: {
      color: '#4CAF50',
      fontWeight: 'bold',
    },
});  