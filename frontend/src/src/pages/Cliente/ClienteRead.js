import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import ClienteIcon from '../../assets/img_cliente.jpg';

export default props => {

  const [clientes, setClientes] = useState([]);
  
  const navigation = useNavigation();

  const fetchClientes = async () => {
    try{
      const response = await fetch('http://localhost:3000/modelCliente');
      if(response.ok){
        const data = await response.json();
        setClientes(data);
        
      }
    }catch(error){
      console.error(error);
    }
  }
  
  const removeCliente = async (id) => {
    Alert.alert(
      'Confirmação',
      'Você tem certeza que deseja excluir este cliente?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Exclusão cancelada'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const response = await fetch(`http://localhost:3000/modelCliente/${id}`, {
                method: 'DELETE',
              });
        
              if (response.ok) {
                fetchClientes(); // Atualiza a lista após a exclusão
              } else {
                console.error('Erro ao excluir o corte:', response.statusText);
              }
            } catch (error) {
              console.error('Erro ao excluir o corte:', error);
            }
          },
        },
      ],
      { cancelable: false } // Impede que o alerta seja fechado clicando fora dele
    );
  };
  

  useEffect(()=>{
    fetchClientes();
  }, [])

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Perfis Cadastrados</Text>

      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={ClienteIcon} style={styles.image} />
            <Text style={styles.profileName}>{item.name}</Text>
            <Text style={styles.profileEmail}>{item.email}</Text>
            <Text style={styles.profilePhone}>{item.telefone}</Text>
            <View style={styles.icons}>
              <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('ClientesUpdate')}>
                <FontAwesome name="pencil" size={24} color="#4CAF50" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon} onPress={() => removeCliente(item.id)}>
                <FontAwesome name="trash" size={24} color="#F44336" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.flatListContainer}
        numColumns={4}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold'
  },
  card: {
    width: 150,
    height: 220,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    margin: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  icons: {
    margin: '10px',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  icon: {
    alignItems: 'center',
    marginInline: '20px',
  },
  profileName:{
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileEmail:{
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profilePhone:{
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
});