import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../store';
import {login} from '../store/reducers/authSlice';
import {useTheme} from '../hooks/useTheme';
import {ThemePallet} from '../constants/themes';
import Button from '../components/Button';
import TextInputField from '../components/forms/TextInputField';
import Spacer from '../components/Spacer';

const LoginScreen = () => {
  const [username, setUsername] = useState('latif');
  const [password, setPassword] = useState('202010');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = stylesObj(theme);

  const {isAuthenticated, error} = useAppSelector(state => state.auth);

  const handleLogin = () => {
    dispatch(login({username, password}));
  };

  if (isAuthenticated) {
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <Image source={require('./../assets/w-2.png')} style={styles.img} />
      <TextInputField
        placeholder="Username"
        value={username}
        autoCapitalize="none"
        onChangeText={setUsername}
        onBlur={undefined}
        name={'Username'}
        icon="user"
      />
      <Spacer />
      <TextInputField
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        onBlur={undefined}
        name={'Password'}
        icon="lock"
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Spacer />
      <Button
        title="Login"
        onPress={handleLogin}
        style={{
          backgroundColor: theme.primary,
          width: '100%',
          paddingVertical: 10,
        }}
      />
    </View>
  );
};

const stylesObj = (theme: ThemePallet) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: theme.bg,
      position: 'relative',
    },
    input: {
      height: 40,
      borderColor: theme.border,
      borderWidth: 1,
      width: '100%',
      marginBottom: 16,
      paddingLeft: 8,
      borderRadius: 5,
      color: theme.text,
    },
    error: {
      color: theme.error,
      marginBottom: 16,
    },
    img: {
      objectFit: 'cover',
      width: '80%',
      height: '15%',
      position: 'absolute',
      top: '10%',
    },
  });

export default LoginScreen;
