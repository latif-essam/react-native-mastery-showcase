import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../hooks/useTheme';

const AddPost = () => {
  const navigation = useNavigation();
  const theme = useTheme(); // Access the theme

  const handleAddPost = () => {
    navigation.navigate('NewPost');
  };

  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: theme.primary}]} // Primary color for background
      onPress={handleAddPost}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25, // Circular button
    elevation: 20,
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
});
