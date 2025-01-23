import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
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

  const getId = async () => {
    if (!email || !token) {
      setErrorMessage("Les informations utilisateur ou le token sont manquants.");
      return;
    }

    const apiUrl = `http://192.168.1.148:5000/api/profile/id/${email}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserId(data.userId);
      } else {
        const error = await response.json();
        setErrorMessage(error.error || "Une erreur est survenue lors de la récupération de l'ID.");
      }
    } catch (error) {
      setErrorMessage("Impossible de récupérer l'ID de l'utilisateur.");
    }
  };

  const getProfile = async (id: string) => {
    if (!token) {
      setErrorMessage("Le token est manquant pour récupérer le profil.");
      return;
    }

    const apiUrl = `http://192.168.1.148:5000/api/profile/${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else {
        const error = await response.json();
        setErrorMessage(error.error || "Une erreur est survenue lors de la récupération du profil.");
      }
    } catch (error) {
      setErrorMessage("Impossible de récupérer le profil de l'utilisateur.");
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
      {/* {profileData && (
        <Image
          source={
            profileData.photo
              ? { uri: profileData.photo }
              : require('../assets/pdpDefault.jpg')
          }
          style={styles.profileImage}
        />
      )} */}
      <Image
        source={{ uri: 'https://i.pinimg.com/474x/47/ba/71/47ba71f457434319819ac4a7cbd9988e.jpg' }}
        style={styles.profileImage}
        />



      <Text style={styles.title}>Profil</Text> 
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      {profileData ? (
        <View>
          <Text style={styles.welcomeText}>Bienvenue, {profileData.userId.username} !</Text>
          <Text style={styles.detailsText}>Email : {profileData.userId.email}</Text>
          <Text style={styles.detailsText}>Description : {profileData.description || 'Aucune description fournie.'}</Text>
        </View>
      ) : !errorMessage ? (
        <Text style={styles.loadingText}>Chargement des données...</Text>
      ) : null}
    </View>
  );
};

export default Profile;

const localStyles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
