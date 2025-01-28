import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../routes/AppRoutes';
import styles from '../styles/ProfileStyles';

const AddDeck: React.FC = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'AddDeck'>>();
  const navigation = useNavigation();

  const email = params?.user?.email || null;
  const token = params?.user?.token || null;

  const [userId, setUserId] = useState<string | null>(null);
  const [deckName, setDeckName] = useState('');
  const [deckUrl, setDeckUrl] = useState('');
  const [commanderImage, setCommanderImage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 🔍 Récupère l'ID utilisateur
  const getId = async () => {
    if (!email || !token) {
      setErrorMessage('Les informations utilisateur ou le token sont manquants.');
      return;
    }

    try {
      const response = await fetch(`http://192.168.1.148:5000/api/profile/id/${email}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUserId(data.userId);
      } else {
        const error = await response.json();
        setErrorMessage(error.error || "Erreur lors de la récupération de l'ID.");
      }
    } catch (error) {
      setErrorMessage("Impossible de récupérer l'ID de l'utilisateur.");
    }
  };

  useEffect(() => {
    getId();
  }, [email, token]);

  // 📌 Fonction pour ajouter un deck
  const addDeck = async () => {
    if (!userId || !token || !deckName || !deckUrl) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch(`http://192.168.1.148:5000/api/profile/add-deck/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: deckName,
          url: deckUrl,
          commanderImage: commanderImage,
        }),
      });

      if (response.ok) {
        Alert.alert("Succès", "Deck ajouté avec succès !");
        navigation.goBack(); // 🔙 Retour à la page précédente après ajout
      } else {
        const error = await response.json();
        setErrorMessage(error.error || "Erreur lors de l'ajout du deck.");
      }
    } catch (error) {
      setErrorMessage('Impossible d’ajouter le deck.');
    }
  };

  return (
    <View style={styles.containerProfile}>
      <Text style={styles.titleText}>Ajouter un Deck</Text>

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Nom du deck"
        value={deckName}
        onChangeText={setDeckName}
      />

      <TextInput
        style={styles.input}
        placeholder="URL du deck"
        value={deckUrl}
        onChangeText={setDeckUrl}
      />

      <TextInput
        style={styles.input}
        placeholder="Image du commandant (URL)"
        value={commanderImage}
        onChangeText={setCommanderImage}
      />

      <TouchableOpacity style={styles.saveButton} onPress={addDeck}>
        <Text style={styles.saveButtonText}>Ajouter le Deck</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddDeck;
