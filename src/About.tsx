import React from 'react';
import {View, Text, Image, StyleSheet, Linking, ScrollView} from 'react-native';
import {useTheme} from '../hooks/useTheme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ThemePallet} from '../constants/themes';

const About = () => {
  const theme = useTheme();
  const styles = stylesObj(theme);

  const handleEmail = () => {
    Linking.openURL('mailto:latif_essam@outlook.com');
  };

  const handlePhoneCall = () => {
    Linking.openURL('tel:+201026042736');
  };

  const handlePortfolio = () => {
    Linking.openURL('https://portfolio-latifessams-projects.vercel.app/');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Name & Image Section */}
      <View style={styles.nameSection}>
        <Image
          source={require('../assets/pp.png')}
          style={styles.profileImage}
        />
        <View style={styles.nameText}>
          <Text style={styles.name}>Hello, I'm Latif</Text>
          <Text style={styles.jobTitle}>Front-End Engineer</Text>
        </View>
      </View>

      {/* Contact Info */}
      <View style={styles.contactInfo}>
        <Text style={styles.contactTitle}>Contact Information</Text>
        <Text style={styles.link} onPress={handleEmail}>
          <Icon name="envelope" size={18} color={theme.primary} />
          {'  '}latif_essam@outlook.com
        </Text>
        <Text style={styles.link} onPress={handlePhoneCall}>
          <Icon name="phone" size={18} color={theme.primary} />
          {'  '}+20 102-604-2736
        </Text>
        <Text style={styles.portfolioLink} onPress={handlePortfolio}>
          <Icon name="link" size={18} color={theme.primary} />
          {'  '}Portfolio
        </Text>
      </View>

      {/* About Me Section */}
      <View style={styles.aboutMe}>
        <Text
          style={[
            styles.aboutMeText,
            {textAlign: 'center', fontWeight: '600', color: theme.primary},
          ]}>
          My Engineering Philosophy
        </Text>
        <Text style={styles.aboutMeText}>
          As a Front-End Engineer, I strive to bring unique ideas to life using
          best practices like ATOMIC design and the latest tech tools, such as
          React, RN, TypeScript, and Redux.
        </Text>
        <Text style={styles.aboutMeText}>
          I follow the DRY, OCP, and KISS principles to ensure my code is
          maintainable, scalable, and efficient.
        </Text>
        <Text style={styles.aboutMeText}>
          I am keen to learn and hone my abilities to meet the requirements and
          go above and beyond in the job cycle development.
        </Text>
      </View>

      <View style={styles.enthusiasm}>
        <Text
          style={[
            styles.aboutMeText,
            {textAlign: 'center', fontWeight: '600', color: theme.primary},
          ]}>
          My Enthusiasm for React
        </Text>
        <Text style={styles.enthusiasmText}>
          I’m excited about RayaGate’s innovative, collaborative environment and
          the opportunity to work with a talented tech team.
        </Text>
        <Text style={styles.enthusiasmText}>
          As a React Native Developer, I’m eager to contribute to your projects
          and help drive the company’s success.
        </Text>
        <Text style={styles.enthusiasmText}>
          Outside of coding, I stay active with running, swimming, and
          volleyball, which keeps me focused and energized.
        </Text>
        <Text style={styles.enthusiasmText}>Thanks for consideration 😊</Text>
        <Text style={styles.enthusiasmText}>Greetings,</Text>
        <Text style={styles.enthusiasmText}>Latif.</Text>
      </View>
    </ScrollView>
  );
};

export default About;

const stylesObj = (theme: ThemePallet) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: theme.bg,
    },
    nameSection: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
      marginBottom: 30,
      justifyContent: 'space-between',
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 10,
      marginRight: 20,
    },
    nameText: {
      justifyContent: 'center',
    },
    name: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.primary,
    },
    jobTitle: {
      fontSize: 18,
      color: theme.text_secondary,
    },
    contactInfo: {
      marginBottom: 30,
      paddingHorizontal: 10,
    },
    contactTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.primary,
      marginBottom: 15,
      textAlign: 'center',
    },
    link: {
      fontSize: 16,
      color: theme.text_primary,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    portfolioLink: {
      fontSize: 16,
      color: theme.text_primary,
      textDecorationLine: 'underline',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    aboutMe: {
      marginBottom: 30,
      paddingHorizontal: 10,
    },
    aboutMeText: {
      fontSize: 16,
      color: theme.text_primary,
      marginBottom: 10,
      textAlign: 'left',
    },
    enthusiasm: {
      marginBottom: 30,
      paddingHorizontal: 10,
    },
    enthusiasmText: {
      fontSize: 16,
      color: theme.text_primary,
      marginBottom: 10,
    },
  });
