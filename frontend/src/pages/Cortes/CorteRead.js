import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import CorteIcon from '../../assets/logo_corte.png';

export default props => {

  const [cortes, setCortes] = useState([]);
  
  const navigation = useNavigation();

  const fetchCortes = async () => {
    try{
      const response = await fetch('http://localhost:3000/modelCorte');
      if(response.ok){
        const data = await response.json();
        setCortes(data);
        
      }
    }catch(error){
      console.error(error);
    }
  }
  
  const removeCortes = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:3000/modelCorte/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        fetchCortes(); // Atualiza a lista após a exclusão
      } else {
        console.error('Erro ao excluir o corte:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir o corte:', error);
    }
  };
  

  useEffect(()=>{
    fetchCortes();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nossos Cortes</Text>
      <TouchableOpacity onPress={() => navigation.navigate('CortesAdd')}>
        <FontAwesome name="plus" size={24} color="black" /> 
      </TouchableOpacity>
      <FlatList
        data={cortes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={CorteIcon} style={styles.image} />
            <Text style={styles.id}>{item.id}</Text>
            <Text style={styles.name}>{item.descricao}</Text>
            <Text style={styles.price}>{item.preco}</Text>
            <View style={styles.icons}>
              <View style={styles.icons2}> 
                <TouchableOpacity onPress={() => navigation.navigate('CortesUpdate')}>
                  <FontAwesome name="pencil" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View style={styles.icons2}> 
                <TouchableOpacity onPress={() => removeCortes(item.id)}>
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
    height: 220,
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
  price: {
    fontSize: 14,
    color: '#666',
  },
  icons: {
    margin: '10px',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  icons2: {
    alignItems: 'center',
    marginInline: '20px',
  },
});