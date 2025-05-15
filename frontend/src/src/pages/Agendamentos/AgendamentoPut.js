import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function AgendamentoPut() {
  const [id, setId] = useState('');
  const [dataHora, setDataHora] = useState('');

  const navigation = useNavigation();

  const handleUpdate = async () => {
    if (!id || !dataHora) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/modelAgendamento/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataHora }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Agendamento atualizado com sucesso!');
        navigation.navigate('Agendamentos');
      } else {
        Alert.alert('Erro', 'Não foi possível atualizar o agendamento.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualizar Agendamento</Text>
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="Data e Hora (AAAA-MM-DD HH:MM:SS)"
        value={dataHora}
        onChangeText={setDataHora}
      />
      <Button title="Atualizar" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
});
