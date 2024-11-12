import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {useAppSelector, useAppDispatch} from '../store';
import {setTheme} from '../store/reducers/themeSlice';
import {useTheme} from '../hooks/useTheme';
import {ThemePallet} from '../constants/themes';

const Settings = () => {
  const isDarkModeInitial =
    useAppSelector(state => state.theme.color) === 'dark';
  const [isDarkMode, setIsDarkMode] = React.useState(isDarkModeInitial);
  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    dispatch(setTheme(isDarkMode ? 'light' : 'dark'));
  };

  const theme = useTheme();
  const styles = stylesObj(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toggle Theme</Text>
      <View style={styles.toggleContainer}>
        <Text style={styles.darkModeText}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
    </View>
  );
};

export default Settings;

const stylesObj = (theme: ThemePallet) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      backgroundColor: theme.bg, // Apply the background color from the theme
      padding: 20,
      elevation: 10,
    },
    title: {
      fontSize: 18,
      color: theme.text_primary,
    },
    toggleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    darkModeText: {
      fontSize: 16,
      color: theme.text_secondary,
      marginRight: 10,
    },
  });
