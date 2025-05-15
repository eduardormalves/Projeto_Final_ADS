import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import dadosCorte from './dadosCorte';

export default function App() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Transformar os dados importados para o formato do grÃ¡fico
    const labels = dadosCorte.map(item => item.tipoCorte); // Extrair os nomes dos cortes
    const values = dadosCorte.map(item => item.valor); // Extrair os valores dos cortes

    setChartData({
      labels,
      datasets: [
        {
          data: values,
        },
      ],
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Valores dos Cortes de Cabelo</Text>
      {chartData ? (
        <BarChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={220}
          yAxisLabel="R$"
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: '#707070',
            backgroundGradientFrom: '#707070',
            backgroundGradientTo: '#707070',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      ) : (
        <Text>Carregando...</Text>
      )}
    </View>
  );
}