import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../hooks/useTheme';
import RotatingImage from '../components/RotatingImage';

const WelcomeScreen = ({navigation}) => {
  const theme = useTheme();

  return (
    <ImageBackground
      source={require('./../assets/welcome.png')}
      style={styles.container}>
      {/* Overlay Filter */}
      <View
        style={[styles.overlay, {backgroundColor: theme.bg, opacity: 0.15}]}
      />

      {/* Content */}
      <View style={styles.content}>
        <RotatingImage
          source={require('./../assets/rn_logo.png')}
          style={styles.logo}
        />{' '}
        <View style={styles.textContent}>
          <Text style={[styles.title, {color: '#ccc'}]}>
            React Native Mastery Showcase
          </Text>
          <Text style={[styles.subtitle, {color: '#ccff'}]}>
            Dev by Latif Essam
          </Text>
          <Text style={[styles.catchphrase, {color: theme.primary}]}>
            You know the business, I know the chemistry
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: theme.primary}]}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
    height: '90%',
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  textContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  catchphrase: {
    fontSize: 18,
    marginBottom: 40,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WelcomeScreen;
