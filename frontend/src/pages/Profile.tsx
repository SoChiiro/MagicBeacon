import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import { RouteProp, useRoute, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../routes/AppRoutes';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';


import styles from '../styles/ProfileStyles';

import DeckComponents from '../components/DeckComponents'; 

const Profile: React.FC = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Profile'>>();

  const email = params?.user?.email || null;
  const token = params?.user?.token || null;

  const [userId, setUserId] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [updatedUsername, setUpdatedUsername] = useState<string | null>(null);
  const [updatedDescription, setUpdatedDescription] = useState<string | null>(null);
  const [updatedLocation, setUpdatedLocation] = useState<string | null>(null);
  const [updatedStore, setUpdatedStore] = useState<string | null>(null);

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

  const getProfile = async (id: string) => {
    if (!token) {
      setErrorMessage('Le token est manquant pour récupérer le profil.');
      return;
    }

    try {
      const response = await fetch(`http://192.168.1.148:5000/api/profile/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        setUpdatedUsername(data.userId.username);
        setUpdatedDescription(data.description);
        setUpdatedLocation(data.location);
        setUpdatedStore(data.favoriteStore);
      } else {
        const error = await response.json();
        setErrorMessage(error.error || "Erreur lors de la récupération du profil.");
      }
    } catch (error) {
      setErrorMessage("Impossible de récupérer le profil de l'utilisateur.");
    }
  };

  const updateProfile = async () => {
    if (!userId || !token) return;

    try {
      const response = await fetch(`http://192.168.1.148:5000/api/profile/modification/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          username: updatedUsername,
          description: updatedDescription,
          location: updatedLocation,
          favoriteStore: updatedStore,
        }),
      });

      if (response.ok) {
        setIsEditing(false); // Sort du mode édition et recharge le profil
      } else {
        const error = await response.json();
        setErrorMessage(error.error || "Erreur lors de la mise à jour du profil.");
      }
    } catch (error) {
      setErrorMessage('Impossible de mettre à jour le profil.');
    }
  };

  const uploadImage = async (uri: string) => {
    if (!userId || !token) {
      setErrorMessage('Les informations utilisateur ou le token sont manquants.');
      return;
    }
  
    const formData = new FormData();
    formData.append('photo', {
      uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
      type: 'image/jpeg',
      name: 'profile_picture.jpg',
    } as any);
    
  
    try {
      const response = await fetch(`http://192.168.1.148:5000/api/profile/photo/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        // Mets à jour la photo du profil avec l'URL retournée
        setProfileData({ ...profileData, photo: data.photo });
      } else {
        const error = await response.json();
        setErrorMessage(error.error || "Erreur lors de la mise à jour de la photo.");
      }
    } catch (error) {
      setErrorMessage("Erreur lors de l'upload de l'image.");
    }
  };
  

  const selectImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
    };
  
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('L\'utilisateur a annulé la sélection d\'image');
      } else if (response.errorCode) {
        console.log('Erreur lors de la sélection de l\'image : ', response.errorMessage);
      } else {
        if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
  
          if (uri) {
            uploadImage(uri);
          } else {
            console.log('Aucune image n\'a été sélectionnée (uri est undefined)');
          }
        } else {
          console.log('Aucune image n\'a été sélectionnée');
        }
      }
    });
  };
  

  useEffect(() => {
    getId();
  }, [email, token]);

  useEffect(() => {
    if (userId) {
      getProfile(userId);
    }
  }, [userId, token]);

  // 🔄 Recharge le profil après modification
  useEffect(() => {
    if (!isEditing && userId) {
      getProfile(userId);
    }
  }, [isEditing]);

  // 🔄 Recharge aussi quand on revient sur l'écran
  useFocusEffect(
    useCallback(() => {
      if (userId) {
        getProfile(userId);
      }
    }, [userId])
  );

  return (
    <View style={styles.containerProfile}>
      <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(!isEditing)}>
        <Text style={styles.editButtonText}>✏️</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={selectImage} style={styles.profileImageWrapper}>
        <Image
          source={profileData?.photo ? { uri: profileData.photo } : require('../assets/pdpDefault.jpg')}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.editButton} activeOpacity={0.7} onPress={() => {
        console.log("Bouton pressé !");
        setIsEditing(!isEditing);
      }}>
        <Text style={styles.editButtonText}>✏️</Text>
      </TouchableOpacity>

      {/* <Image source={require('../assets/pdpDefault.jpg')} style={styles.profileImage} /> */}

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      {profileData ? (
        <View>
          {isEditing ? (
            <>
              <TextInput style={styles.input} value={updatedUsername || ''} onChangeText={setUpdatedUsername} placeholder="Modifier le nom d'utilisateur" />
              <TextInput style={[styles.input, styles.textarea]} value={updatedDescription || ''} onChangeText={setUpdatedDescription} placeholder="Modifier la description" multiline />
              <TextInput style={[styles.input, styles.textarea]} value={updatedLocation || ''} onChangeText={setUpdatedLocation} placeholder="Modifier la localisation" />
              <TextInput style={[styles.input, styles.textarea]} value={updatedStore || ''} onChangeText={setUpdatedStore} placeholder="Modifier le magasin préféré" />
              <TouchableOpacity style={styles.saveButton} onPress={updateProfile}>
                <Text style={styles.saveButtonText}>Enregistrer</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.profileText}>{profileData.userId.username}</Text>
              <Text style={styles.subProfileText}>📍 {profileData.location ?? 'Non renseigné'}</Text>
              <Text style={styles.subProfileText}>🏬 {profileData.favoriteStore ?? 'Non renseigné'}</Text>
              <View style={styles.section}>
                <Text style={styles.titleText}>À propos de moi</Text>
                <View style={styles.profileContainer}>
                  <Text style={styles.aboutText}>{profileData.description || 'Aucune description fournie.'}</Text>
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
        <DeckComponents
          decks={profileData?.decks}
          user={{
            token: token,
            id: userId ?? '',
            name: updatedUsername ?? '',
            email: email ?? '',
          }}
        />
      </View>
    </View>
  );
};

export default Profile;
