import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export default props => {
  const navigation = useNavigation();
  const [clientes, setClientes] = useState([]);
  const [barbeiros, setBarbeiros] = useState([]);
  const [agendamento, setAgendamento] = useState({
    dataHora: '',
    fkIdBarbeiro: '',
    fkIdCliente: '',
  });

  const handleChange = (name, value) => {
    setAgendamento((prevAgendamento) => ({
      ...prevAgendamento,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    if (!agendamento.dataHora || !agendamento.fkIdBarbeiro || !agendamento.fkIdCliente) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    parseInt(agendamento.fkIdCliente);
    parseInt(agendamento.fkIdBarbeiro);

    console.log(agendamento.dataHora, agendamento.fkIdBarbeiro, agendamento.fkIdCliente);

    try {
      const response = await fetch('http://localhost:3000/modelAgendamento', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify( agendamento ),
      });

      console.log(agendamento)

      if (response.ok) {
        Alert.alert('Sucesso', 'Agendamento adicionado com sucesso!');
        navigation.navigate('Agendamentos');  
      } else {
        Alert.alert('Erro', 'Não foi possível adicionar o agendamento.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão.');
      console.error(error);
    }
  };
  
  const fetchClientes = async () => {
    try {
      const response = await fetch("http://localhost:3000/modelCliente");
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const fetchBarbeiro = async () => {
    try {
      const response = await fetch("http://localhost:3000/modelBarbeiro");
      const data = await response.json();
      setBarbeiros(data);
    } catch (error) {
      console.error('Erro ao buscar  barbeiros:', error);
    }
  };

  useEffect(() => {

    fetchClientes();
    fetchBarbeiro();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Agendamento</Text>

      <Text style={styles.label}>Selecione um Cliente:</Text>
      <Picker
        selectedValue={agendamento.fkIdCliente}
        onValueChange={(itemValue) => handleChange('fkIdCliente', itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Escolha um Cliente" value={undefined} />
        {clientes.map((cliente) => (
          <Picker.Item key={cliente.id} label={cliente.name} value={cliente.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Selecione um Barbeiro:</Text>
      <Picker
        selectedValue={agendamento.fkIdBarbeiro}
        onValueChange={(itemValue) => handleChange('fkIdBarbeiro', itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Escolha um Produto" value={undefined} />
        {barbeiros.map((barbeiro) => (
          <Picker.Item key={barbeiro.id} label={barbeiro.name} value={barbeiro.id} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Data e Hora (DD-MM-AAAA HH:MM)"
        value={agendamento.dataHora}
        onChangeText={(itemValue) => handleChange('dataHora', itemValue)}
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
