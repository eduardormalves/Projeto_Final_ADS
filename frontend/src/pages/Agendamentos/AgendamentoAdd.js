import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default props => {
  const [cliente, setCliente] = useState('');
  const [barbeiro, setBarbeiro] = useState('');
  const [dataHora, setDataHora] = useState('');

  const handleAdd = async () => {
    if (cliente === '' || barbeiro === '' || dataHora === '') {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/modelAgendamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cliente, barbeiro, dataHora }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Agendamento adicionado com sucesso!');
        setCliente('');
        setBarbeiro('');
        setDataHora('');
      } else {
        Alert.alert('Erro', 'Não foi possível adicionar o agendamento.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Agendamento</Text>
      <TextInput
        style={styles.input}
        placeholder="Cliente"
        value={cliente}
        onChangeText={setCliente}
      />
      <TextInput
        style={styles.input}
        placeholder="Barbeiro"
        value={barbeiro}
        onChangeText={setBarbeiro}
      />
      <TextInput
        style={styles.input}
        placeholder="Data e Hora (AAAA-MM-DD HH:MM:SS)"
        value={dataHora}
        onChangeText={setDataHora}
      />
      <Button title="Adicionar" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
});