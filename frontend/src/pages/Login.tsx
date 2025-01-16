import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../routes/AppRoutes'; // Assurez-vous que le chemin est correct

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Typage pour la navigation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLoginTest = () => {
    console.log('Login with:', { email, password });
    alert('Connection successful!');
  };

  const handleLogin = async () => {
    const apiUrl = 'http://192.168.1:5000/api/users/login';

    const emailTest : string = 'testBearer@example.com'
    const passwordTest : String = 'admin123'


    console.log("email", email),
    console.log("password",password)

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
      });
      
      console.log("body", response)

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        alert('Connexion réussie!');
      } else {
        const error = await response.json();
        alert(`Erreur : ${error.message}`);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };
  

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.containerLogin}>
      <Text style={styles.title}>Magic Beacon</Text>
      <Text style={styles.title}>Login</Text>
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
      {/* <Button style={styles.loginButton} title="Login" onPress={handleLogin} /> */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>

        <Text style={styles.registerText}>
            Pas encore de compte ?{' '}
        </Text>
        <TouchableOpacity onPress={navigateToRegister}>
            <Text style={styles.link}>Inscrivez-vous !</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor : '#FCD7AD',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    // color: '#FCD7AD'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor : 'white',
    color: '#2D2D2A',
    width : '90%'
  },
  registerText: {
    textAlign: 'center',
    marginTop : 15,
  },
  loginButton: {
    backgroundColor: '#C3423F',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 15,
    width : '70%',
    justifyContent : 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop : 15,
  },
});

export default Login;
