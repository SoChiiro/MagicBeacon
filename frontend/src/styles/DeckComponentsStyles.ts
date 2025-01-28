import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    section: {
        marginVertical: 20,
        alignItems: 'center',
        width:'98%',
    },
    deckName:{
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '500',
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
    deckItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa', // Couleur de fond légère
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Ombre pour Android
        justifyContent: 'space-between', // Espacer le texte et le lien
      },
      deckText: {
        fontSize: 18,
        color: '#4C4C47',
        fontWeight: '500',
        flex: 1,
      },
      deckLink: {
        color: '#007BFF',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 18,
        alignSelf: 'flex-start', // Assurez-vous que le lien est bien à gauche ou droite selon besoin
      },
      
    deckImage: {
        width: "60%",
        height: 90,
        borderRadius: 5,
        marginRight: 10,
        backgroundColor: '#C3423F'
    },
    buttonProfileDefault : {
        backgroundColor: '#C3423F',
        padding: 8,
        elevation: 3, //Android
        shadowColor: '#000', // iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        borderRadius: 20,
        alignItems: 'center',
        marginTop:10,
    },
    AddingDeckButton : {
        fontSize: 12,
        color: '#FFFFFF',
        padding: 2,
        backgroundColor : '#C3423F'
    },
});

export default styles;