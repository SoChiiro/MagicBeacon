import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/DeckComponentsStyles';
import { RootStackParamList } from '../routes/AppRoutes'; // Import du type de la navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Deck {
  name: string;
  url: string;
  commanderImage: string;
}

interface DeckComponentsProps {
  decks: Deck[] | null;
  user: {
    token: string | null;
    id: string;
    name: string;
    email: string;
  };
}

const DeckComponents: React.FC<DeckComponentsProps> = ({ decks, user }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.section}>
      <View style={styles.profileContainer}>

        {decks && decks.length > 0 ? (
          <FlatList
            data={decks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.deckItem}>
                <Image source={{ uri: item.commanderImage }} style={styles.deckImage} />
                <Text style={styles.deckText}>{item.name}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                  <Text style={styles.deckLink}>🔗</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text style={styles.deckText}>Aucun deck ajouté.</Text>
        )}

        {/* Bouton pour ajouter un deck */}
        <TouchableOpacity
          style={styles.buttonProfileDefault}
          onPress={() =>
            navigation.navigate('AddDeck', {
              user: {
                token: user.token,
                id: user.id,
                name: user.name,
                email: user.email,
              },
            })
          }
        >
          <Text style={styles.AddingDeckButton}>+ Ajouter un deck</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeckComponents;
