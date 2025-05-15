import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default props => {
  const [agendamentos, setAgendamentos] = useState([]);
  const navigation = useNavigation();

  const fetchAgendamentos = async () => {
    try {
      const response = await fetch('http://localhost:3000/modelAgendamento');
      if (response.ok) {
        const data = await response.json();
        setAgendamentos(data);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os agendamentos.');
      console.error(error);
    }
  };

  const deleteAgendamento = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/modelAgendamento/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        Alert.alert('Sucesso', 'Agendamento removido!');
        fetchAgendamentos();
      } else {
        Alert.alert('Erro', 'Falha ao remover o agendamento.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro de conexão.');
    }
  };

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Agendamentos</Text>
      <TouchableOpacity onPress={() => navigation.navigate('AgendamentosAdd')}>
        <FontAwesome name="plus" size={24} color="black" /> 
      </TouchableOpacity>
      <FlatList
        data={agendamentos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>Cliente: {item.cliente}</Text>
            <Text style={styles.text}>Barbeiro: {item.barbeiro}</Text>
            <Text style={styles.text}>Data: {item.dataHora.split('T')[0]}</Text>
            <Text style={styles.text}>Hora: {item.dataHora.split('T')[1]}</Text>
            <TouchableOpacity onPress={() => deleteAgendamento(item.id)}>
              <FontAwesome name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent:"center", alignItems:"center", backgroundColor: '#f4f4f4' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  text: { fontSize: 16 },
});