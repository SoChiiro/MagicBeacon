import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerProfile: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FCD7AD',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileText: {
    fontSize: 24,
    fontWeight: '600',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 2, 
  },
  idProfileText: {
    fontSize: 16,
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 10,
    color: '#C3423F',
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
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#4C4C47',          // Couleur de l'ombre
    shadowOffset: { width: 2, height: 8 },  // Position de l'ombre
    shadowOpacity: 0.8,           // Transparence de l'ombre
    shadowRadius: 6,              // Rayon de l'ombre
    elevation: 10,                // Pour Android
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8, 
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 16,
    color: '#333', 
    backgroundColor: '#f9f9f9', 
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#4C4C47',
    padding: 8,
    borderRadius: 50,
    elevation: 3, // Ombre pour Android
    shadowColor: '#000', // Ombre pour iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  editButtonText: {
    fontSize: 18,
    color: '#333',
  },
  textarea: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#C3423F',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  section: {
    marginVertical: 20,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4C4C47',
    textAlign: 'center',
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 14,
    color: '#FFFFFF',
    paddingHorizontal: 2,
  },
  profileContainer: {
    backgroundColor: '#4C4C47',
    borderRadius: 12,
    padding: 15,
    width: '99%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  deckText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  
  
});

export default styles;