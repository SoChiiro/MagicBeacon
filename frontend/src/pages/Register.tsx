import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../routes/AppRoutes';
import styles from '../styles/RegisterStyles';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; username?: string; password?: string }>({});

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password: string) => {
    const passwordRegex = /^(?=.*\d)[A-Za-z\d]{6,}$/; // Minimum 6 caractères, au moins un chiffre
    return passwordRegex.test(password);
  };

  const isUsernameValid = (username: string) => {
    return username.length <= 20; // Maximum 20 caractères
  };

  const validateInputs = () => {
    const newErrors: { email?: string; username?: string; password?: string } = {};
    if (!isEmailValid(email)) newErrors.email = 'Veuillez entrer un email valide.';
    if (!isPasswordValid(password))
      newErrors.password = 'Le mot de passe doit comporter au moins 6 caractères et contenir un chiffre.';
    if (!isUsernameValid(username)) newErrors.username = 'Le nom d\'utilisateur doit comporter au maximum 20 caractères.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    const apiUrl = 'http://192.168.1.158:5000/api/users/registerWithProfile';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Inscription réussie!');
        navigation.navigate('Login');
      } else {
        const error = await response.json();
        alert(`Erreur : ${error.message}`);
      }
    } catch (error) {
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <View style={styles.containerRegister}>
      <Text style={styles.title}>Inscription à Magic Beacon</Text>

      <TextInput
        style={[styles.input, errors.email && { borderColor: 'red' }]}
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
        }}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={[styles.input, errors.username && { borderColor: 'red' }]}
        placeholder="Username"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          if (errors.username) setErrors((prev) => ({ ...prev, username: undefined }));
        }}
      />
      {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

      <TextInput
        style={[styles.input, errors.password && { borderColor: 'red' }]}
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
        }}
        secureTextEntry
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
