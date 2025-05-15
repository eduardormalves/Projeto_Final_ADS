import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import BarberIcon from '../../assets/logo_barber.png';

export default props => {

  const [barbeiros, setBarbeiros] = useState([]);
  
  const navigation = useNavigation();

  const fetchBarbeiros = async () => {
    try{
      const response = await fetch('http://localhost:3000/modelBarbeiro');
      if(response.ok){
        const data = await response.json();
        setBarbeiros(data);
        
      }
    }catch(error){
      console.error(error);
    }
  }

  const removeBarbeiro = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/modelBarbeiro/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        fetchBarbeiros(); // Atualiza a lista após a exclusão
      } else {
        console.error('Erro ao excluir o barbeiros:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir o barbeiros:', error);
    }
  };
  

  useEffect(()=>{
    fetchBarbeiros();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nossos Barbeiros</Text>
      <TouchableOpacity onPress={() => navigation.navigate('BarbeirosAdd')}>
        <FontAwesome name="plus" size={24} color="black" />
      </TouchableOpacity>
      <FlatList
        data={barbeiros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={BarberIcon} style={styles.image} />
            <Text style={styles.id}>{item.id}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.info}>{item.email}</Text>
            <Text style={styles.info}>{item.telefone}</ Text>
            <View style={styles.icons}>
              <View style={styles.icons2}> 
                <TouchableOpacity onPress={() => navigation.navigate('BarbeirosUpdate')}>
                  <FontAwesome name="pencil" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View style={styles.icons2}> 
                <TouchableOpacity onPress={() => removeBarbeiro(item.id)}>
                  <FontAwesome name="trash" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={styles.container}
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
    height: 240,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    margin: 10,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  id: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  info: {
    fontSize: 14,
    color: '#666',
  },
  icons: {
    margin: '10px',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  icons2: {
    alignItems: 'center',
    marginInline: '20px',
  },
});