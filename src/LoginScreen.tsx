import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native'; // Use React Navigation to navigate
import {useAppSelector} from '../store';
import {login} from '../store/reducers/authSlice';

const LoginScreen = () => {
  const [username, setUsername] = useState('latif');
  const [password, setPassword] = useState('202010');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Get authentication status and error from the Redux store
  const {isAuthenticated, error} = useAppSelector(state => state.auth);

  const handleLogin = () => {
    dispatch(
      login({
        username,
        password,
      }),
    );
  };

  // Navigate to Home screen upon successful authentication
  if (isAuthenticated) {
    navigation.navigate('Home'); // Assuming you have set up a Home screen in your navigation
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        autoCapitalize="none"
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    marginBottom: 16,
    paddingLeft: 8,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});

export default LoginScreen;
