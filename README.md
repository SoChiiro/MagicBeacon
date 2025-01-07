# Magic Beacon
![image](https://github.com/user-attachments/assets/46a49f9d-2b73-4c97-933d-fa57c39d03c0)

Bienvenue dans **Magic Beacon**, une application mobile innovante pour les joueurs de jeux de cartes à collectionner (*Trading Card Games*), et plus particulièrement pour les fans de **Magic: The Gathering**. Cette application vise à devenir un réseau social dédié à la communauté des joueurs en leur permettant de se connecter, d’organiser des parties, et de partager leur passion.

---

## ✨ Fonctionnalités principales (prévues)

### 🎮 1. Profils personnalisés
- Créez un profil utilisateur pour afficher vos préférences de jeu.
- Ajoutez vos decks via des liens ou des intégrations avec des plateformes comme **Scryfall**,  **Moxfield** ou **Archidekt**.
- Indiquez vos boutiques ou lieux préférés pour jouer.

### 🏢 2. Recherche de joueurs et boutiques
- **Géolocalisation** : Trouvez d’autres joueurs proches de chez vous.
- Localisez des boutiques et des événements organisés près de chez vous.

### ✉️ 3. Chat et interactions sociales
- Ajoutez des amis et discutez avec eux en temps réel.
- Organisez des parties et des rencontres directement depuis l’application.

### 🎴 4. Gestion des decks
- Importez ou créez vos decks.
- Consultez des suggestions de cartes pour améliorer vos stratégies.

### ❤️ 5. Compteurs de points de vie
- Utilisez un compteur de points de vie intégré adapté à différents formats (*Standard, Commander*, etc.).
- Suivez les scores en temps réel pour les parties multi-joueurs.

### 🏆 6. Tournois et classements (futur)
- Organisez des tournois en ligne ou en physique.
- Suivez les classements locaux, régionaux et mondiaux.

---

## 🌐 Technologies utilisées

### Frontend
- **React Native** : Framework pour le développement mobile multi-plateforme (*iOS* et *Android*).
- **React Navigation** : Pour la gestion des différents écrans.
- **Axios** : Pour les appels API.

### Backend
- **Node.js** : Serveur backend.
- **Express.js** : Framework pour les routes et les API.
- **MongoDB** : Base de données NoSQL pour stocker les utilisateurs, decks et événements.

### APIs tierces
- **Scryfall API** : Pour intégrer les cartes et les détails des decks.
- **Google Maps API** : Pour la géolocalisation des joueurs et des boutiques.

### Authentification
- **Firebase Authentication** : Gérer les connexions via e-mail, Google, ou Facebook.

---

## ⚡ Fonctionnalités futures (roadmap)
- Système de matchmaking basé sur les préférences des joueurs.
- Organisation de tournois avec gestion des scores.
- Analyse des parties et statistiques de performance.
- Intégration avec d’autres plateformes populaires comme **Moxfield** ou **TappedOut**.

---

## 📊 Licence

Ce projet est sous licence **MIT**. Vous êtes libre de l'utiliser, le modifier et le distribuer.

---

Merci de votre intérêt pour **Magic Beacon** ! Si vous avez des questions ou des suggestions, n’hésitez pas à ouvrir une issue ou me contacter directement.

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
