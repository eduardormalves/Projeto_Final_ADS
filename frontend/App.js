import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import Home from './src/pages/Home';
import Produto from './src/pages/Produtos/ProdutoRead';
import Corte from './src/pages/Cortes/CorteRead';
import Barbeiro from './src/pages/Barbeiros/BarbeiroRead';
import Venda from './src/pages/Venda/VendaRead';
import Cliente from './src/pages/Cliente/ClienteRead';
import Agendamento from './src/pages/Agendamentos/AgendamentoRead';
import Grafico from './src/pages/Graficos/graficos';

import CortesAdd from './src/pages/Cortes/CorteAdd';
import CortesUpdate from './src/pages/Cortes/CortePut';

import ProdutosAdd from './src/pages/Produtos/ProdutoAdd';
import ProdutosUpdate from './src/pages/Produtos/ProdutoPut';

import BarbeirosAdd from './src/pages/Barbeiros/BarbeiroAdd';
import BarbeirosUpdate from './src/pages/Barbeiros/BarbeiroPut';

import VendasAdd from './src/pages/Venda/VendaAdd';
import VendasUpdate from './src/pages/Venda/VendaPut';

import ClientesUpdate from './src/pages/Cliente/ClientePut';

import AgendamentosAdd from './src/pages/Agendamentos/AgendamentoAdd';
import AgendamentosUpdate from './src/pages/Agendamentos/AgendamentoPut';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Produtos" component={Produto} />
        <Stack.Screen name="Cortes" component={Corte} />
        <Stack.Screen name="Barbeiros" component={Barbeiro} />
        <Stack.Screen name="Vendas" component={Venda} />
        <Stack.Screen name="Clientes" component={Cliente} />
        <Stack.Screen name="Agendamentos" component={Agendamento} />
        <Stack.Screen name="Graficos" component={Grafico} />
        
        <Stack.Screen name="CortesAdd" component={CortesAdd} />
        <Stack.Screen name="CortesUpdate" component={CortesUpdate} />

        <Stack.Screen name="ProdutosAdd" component={ProdutosAdd} />
        <Stack.Screen name="ProdutosUpdate" component={ProdutosUpdate} />

        <Stack.Screen name="BarbeirosAdd" component={BarbeirosAdd} />
        <Stack.Screen name="BarbeirosUpdate" component={BarbeirosUpdate} />

        <Stack.Screen name="VendasAdd" component={VendasAdd} />
        <Stack.Screen name="VendasUpdate" component={VendasUpdate} />

        <Stack.Screen name="ClientesUpdate" component={ClientesUpdate} />

        <Stack.Screen name="AgendamentosAdd" component={AgendamentosAdd} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



//<Stack.Screen name="AgendamentosUpdate" component={AgendamentosUpdate} />
