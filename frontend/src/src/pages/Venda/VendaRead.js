import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import VendaIcon from '../../assets/logo_vendas.png';

export default props => {

  const [vendas, setVendas] = useState([]);
  
  const navigation = useNavigation();
  
  //Venda - id, dataVenda, fkIdCliente, fkIdProduto

  const fetchVendas = async () => {
    try {
      const response = await fetch("http://localhost:3000/modelVenda");
      const data = await response.json();
      setVendas(data);
    } catch (error) {
      console.error('Erro ao buscar vendas2:', error);
    }
  }

  const removeVenda = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:3000/modelVenda/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        fetchVendas(); // Atualiza a lista após a exclusão
      } else {
        console.error('Erro ao excluir a venda:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir a venda:', error);
    }
  };
  

  useEffect(()=>{
    fetchVendas();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nossas Vendas</Text>
      <TouchableOpacity onPress={() => navigation.navigate('VendasAdd')}>
        <FontAwesome name="plus" size={24} color="black" />
      </TouchableOpacity>
      <FlatList
        data={vendas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={VendaIcon} style={styles.image} />
            <Text style={styles.id}>{item.id}</Text>
            <Text style={styles.name}>{item.dataVenda}</Text>
            <View style={styles.icons}>
              <View style={styles.icons2}> 
                <TouchableOpacity onPress={() => navigation.navigate('VendasUpdate')}>
                  <FontAwesome name="pencil" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View style={styles.icons2}> 
                <TouchableOpacity onPress={() => removeVenda(item.id)}>
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