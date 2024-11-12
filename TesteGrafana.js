// import React, { useEffect, useState } from 'react';
// import { LineChart } from 'react-native-chart-kit';
// import { View, Dimensions, ActivityIndicator } from 'react-native';
 
// const screenWidth = Dimensions.get('window').width;
 
// const TesteGrafana = () => {
//   const [data, setData] = useState(null);  // Inicialmente null para checar se os dados foram carregados
//   const [loading, setLoading] = useState(true); // Estado de loading para exibir carregando enquanto os dados não chegam
 
//   useEffect(() => {
//     const fetchData = async () => {
//       const apiKey = 'SEU_TOKEN_API';
//       const dashboardUid = 'UID_DO_DASHBOARD';
 
//       try {
//         const response = await fetch(`http://SEU_GRAFANA_URL/api/dashboards/uid/${dashboardUid}`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${apiKey}`,
//             'Content-Type': 'application/json',
//           },
//         });
 
//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Erro ao buscar dados do Grafana: ${errorText}`);
//         }
 
//         const jsonData = await response.json();
 
//         // Processar jsonData e formatar os dados conforme esperado pela biblioteca de gráficos
//         const processedData = {
//           labels: ['Label1', 'Label2', 'Label3'], // Ajuste conforme necessário
//           datasets: [{
//             data: [20, 45, 28], // Ajuste conforme necessário, extraia os dados do jsonData
//           }],
//         };
 
//         setData(processedData);
//       } catch (error) {
//         console.error('Erro ao buscar dados:', error);
//       } finally {
//         setLoading(false);  // Após os dados serem carregados ou falharem, muda o loading para false
//       }
//     };
 
//     fetchData();
//   }, []); // A dependência vazia [] significa que este efeito será executado apenas uma vez ao carregar o componente.
 
//   // Exibir um indicador de carregamento enquanto os dados estão sendo recuperados
//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }
 
//   // Exibir o gráfico com os dados carregados
//   return (
//     <View>
//       <LineChart
//         data={data}
//         width={screenWidth}
//         height={220}
//         chartConfig={{
//           backgroundColor: '#ffffff',
//           decimalPlaces: 2,
//           color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
//           style: {
//             borderRadius: 16,
//           },
//         }}
//         style={{
//           marginVertical: 8,
//           borderRadius: 16,
//         }}
//       />
//     </View>
//   );
// };
 
// export default TesteGrafana;