import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AuthenticatedScreen = ({ navigation, handleAuthentication }) => {
  const handleUploadPrescription = () => {
    // Navigate to the Upload Prescription screen
    navigation.navigate('UploadPrescription');
  };

  const handleMyPrescription = () => {
    // Navigate to the My Prescription screen
    navigation.navigate('MyPrescription');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <Button
            title="Upload Prescription"
            onPress={handleUploadPrescription}
            style={styles.uploadButton} // Apply style for Upload Prescription button
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="My Prescription"
            onPress={handleMyPrescription}
            style={styles.myPrescriptionButton} // Apply style for My Prescription button
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'space-between',
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
  },
  uploadButton: {
    color: '#3498db', // Custom style for Upload Prescription button

  },
  myPrescriptionButton: {
    color: '#2ecc71', // Custom style for My Prescription button
  },
  footer: {
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default AuthenticatedScreen;
