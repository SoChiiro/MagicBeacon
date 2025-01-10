import axios from 'axios';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const App = () => {
  const [data, setData] = useState(null); // Stocke les données de la réponse
  const [error, setError] = useState(null); // Stocke les erreurs éventuelles

  useEffect(() => {
    axios.get('http://192.168.1.158:5000')
      .then(response => {
        setData(response.data); // Stockez les données de la réponse
      })
      .catch(err => {
        setError(err.message); // Stockez l'erreur
      });
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>TCG App - Magic Beacon</Text>
      <Text style={{ marginTop: 20 }}>
        {data ? `Réponse du serveur : ${JSON.stringify(data)}` : "Chargement..."}
      </Text>
      {error && <Text style={{ marginTop: 20, color: 'red' }}>Erreur : {error}</Text>}
    </View>
  );
};

export default App;


