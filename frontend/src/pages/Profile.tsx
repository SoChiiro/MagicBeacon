import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../routes/AppRoutes';
import styles from '../styles/ProfileStyles';

const Profile: React.FC = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.containerProfile}>
            <Text>Profile</Text>
        </View>
    )
}

export default Profile;
