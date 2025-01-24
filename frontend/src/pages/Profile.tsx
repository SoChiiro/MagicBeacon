import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../routes/AppRoutes';
import styles from '../styles/ProfileStyles';

const Profile: React.FC = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Profile'>>();

  const email = params?.user?.email || null;
  const token = params?.user?.token || null;

  const [userId, setUserId] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false); // Mode édition activé ou non
  const [updatedUsername, setUpdatedUsername] = useState<string | null>(null);
  const [updatedDescription, setUpdatedDescription] = useState<string | null>(null);

  const getId = async () => {
    if (!email || !token) {
      setErrorMessage('Les informations utilisateur ou le token sont manquants.');
      return;
    }

    const apiUrl = `http://192.168.1.148:5000/api/profile/id/${email}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserId(data.userId);
      } else {
        const error = await response.json();
        setErrorMessage(error.error || 'Une erreur est survenue lors de la récupération de l\'ID.');
      }
    } catch (error) {
      setErrorMessage('Impossible de récupérer l\'ID de l\'utilisateur.');
    }
  };

  const getProfile = async (id: string) => {
    if (!token) {
      setErrorMessage('Le token est manquant pour récupérer le profil.');
      return;
    }

    const apiUrl = `http://192.168.1.148:5000/api/profile/${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        setUpdatedUsername(data.userId.username); // Préremplit les champs d'édition
        setUpdatedDescription(data.description);
      } else {
        const error = await response.json();
        setErrorMessage(error.error || 'Une erreur est survenue lors de la récupération du profil.');
      }
    } catch (error) {
      setErrorMessage('Impossible de récupérer le profil de l\'utilisateur.');
    }
  };

  const updateProfile = async () => {
    if (!userId || !token) return;

    const apiUrl = `http://192.168.1.148:5000/api/profile/modification/${userId}`;
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: updatedUsername,
          description: updatedDescription,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData(data.profile); // Met à jour les données locales
        setIsEditing(false); // Désactive le mode édition
      } else {
        const error = await response.json();
        setErrorMessage(error.error || 'Une erreur est survenue lors de la mise à jour du profil.');
      }
    } catch (error) {
      setErrorMessage('Impossible de mettre à jour le profil.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getId();
    };

    fetchData();
  }, [email, token]);

  useEffect(() => {
    if (userId) {
      getProfile(userId);
    }
  }, [userId, token]);

  return (
    <View style={styles.containerProfile}>
      {/* Bouton pour activer/désactiver le mode édition */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setIsEditing(!isEditing)}
      >
        <Text style={styles.editButtonText}>✏️</Text>
      </TouchableOpacity>

      {/* Image de profil */}
      <Image
        source={require('../assets/pdpDefault.jpg')}
        style={styles.profileImage}
      />

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      {profileData ? (
        <View>
          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                value={updatedUsername || ''}
                onChangeText={setUpdatedUsername}
                placeholder="Modifier le nom d'utilisateur"
              />
              <TextInput
                style={[styles.input, styles.textarea]}
                value={updatedDescription || ''}
                onChangeText={setUpdatedDescription}
                placeholder="Modifier la description"
                multiline
              />
              <TouchableOpacity style={styles.saveButton} onPress={updateProfile}>
                <Text style={styles.saveButtonText}>Enregistrer</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.profileText}>{profileData.userId.username}</Text>
              <Text style={styles.idProfileText}>@{profileData.userId.username}</Text>
              <View style={styles.section}>
                <Text style={styles.titleText}>À propos de moi</Text>
                <View style={styles.profileContainer}>
                <Text style={styles.aboutText}>
                  {profileData.description || 'Aucune description fournie.'}
                </Text>
                </View>
              </View>
            </>
          )}
        </View>
      ) : !errorMessage ? (
        <Text style={styles.loadingText}>Chargement des données...</Text>
      ) : null}

      {/* Section Mes Decks */}
      <View style={styles.section}>
        <Text style={styles.titleText}>Mes Decks</Text>
        <View style={styles.profileContainer}>
          <Text style={styles.deckText}>Mon Deck</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;
