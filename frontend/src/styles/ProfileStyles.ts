import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerProfile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FCD7AD',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 10,
  },
  profileImage: {
    width: 100, // Taille du cercle
    height: 100,
    borderRadius: 50, // Rend l'image circulaire
    alignSelf: 'center', // Centre l'image horizontalement
    marginBottom: 20, // Espacement avec le texte
  },
  
  
});

export default styles;