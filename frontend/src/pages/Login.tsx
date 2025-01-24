import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../routes/AppRoutes';
import styles from '../styles/LoginStyles';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // const navigateToProfile = () => {
  //   navigation.navigate('Profile', { user: data });
  // };

  const handleLogin = async () => {
    const apiUrl = 'http://192.168.1.148:5000/api/users/login';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      console.log(response)

      if (response.ok) {
        const data = await response.json();
        console.log("Données à envoyer :", data)
        navigation.navigate('Profile', { user: data })
        // navigateToProfile('Profile', { user: data });
      } else {
        const error = await response.json();
        alert(`Erreur : ${error.message}`);
      }
    } catch (error) {
      console.error('Erreur dans le handleLogin :', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.containerLogin}>
      <Text style={styles.title}>Magic Beacon</Text>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>Pas encore de compte ?{' '}</Text>
      <TouchableOpacity onPress={navigateToRegister}>
        <Text style={styles.link}>Inscrivez-vous !</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
