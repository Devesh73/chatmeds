import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { getFirestore, collection, addDoc, setDoc, doc } from '@firebase/firestore';
import AuthenticatedScreen from './screens/AuthenticatedScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyA5U_fgm-5VNdn0FLFp_n2_UZbsLb0TzNg",
  authDomain: "chatmeds-6f108.firebaseapp.com",
  projectId: "chatmeds-6f108",
  storageBucket: "chatmeds-6f108.appspot.com",
  messagingSenderId: "131636071667",
  appId: "1:131636071667:web:ca55710cf6713793b03b86"
};
const app = initializeApp (firebaseConfig);
const firestore = getFirestore(app);
const AuthScreen = ({name, setName, phone, setPhone, city, setCity, state, setState, dob, setDOB, email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
      {!isLogin && (
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />
      )}
      {!isLogin && (
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone Number"
          keyboardType="phone-pad"
        />
      )}
      {!isLogin && (
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="City"
        />
      )}
      {!isLogin && (
        <TextInput
          style={styles.input}
          value={state}
          onChangeText={setState}
          placeholder="State"
        />
      )}
      {!isLogin && (
        <TextInput
          style={styles.input}
          value={dob}
          onChangeText={setDOB}
          placeholder="Date of Birth (YYYY-MM-DD)"
        />
      )}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </View>
    </View>
  );
}



export default App = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [dob, setDOB] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);
  const handleAuthentication = async () => {
    try {
      if (user) {
        // If user is already authenticated, log out
        console.log('User logged out successfully!');
        await signOut(auth);
      } else {
        // Sign in or sign up
        if (isLogin) {
          // Sign in
          await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed in successfully!');
        } else {
          // Sign up
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const newUser = userCredential.user;
          console.log('User created successfully!', newUser.uid);

          // Store user details in Firestore
          
          // Reference to the 'users' collection
// Reference to the users collection
const usersCollection = collection(firestore, 'users');

// Reference to the user document using the user's email as the document ID
const userDocRef = doc(usersCollection, email);

// Reference to the user details subcollection within the user's document
const userDetailsCollection = collection(userDocRef, 'userDetails');

// Data to be stored in the user details document
const userDetailsData = {
  name: name,
  phone: phone,
  city: city,
  state: state,
  dob: dob,
};

// Set the document in the user details subcollection
await setDoc(doc(userDetailsCollection), userDetailsData);

          console.log('User details stored in Firestore.');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        // Show user's email if user is authenticated
        <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
      ) : (
        // Show sign-in or sign-up form if user is not authenticated
        <AuthScreen
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        city={city}
        setCity={setCity}
        state={state}
        setState={setState}
        dob={dob}
        setDOB={setDOB}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        handleAuthentication={handleAuthentication}
        
      />
      )}
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});
