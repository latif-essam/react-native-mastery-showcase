import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const AddPost = () => {
  // navigate to new screen
  const navigation = useNavigation();
  const handleAddPost = () => {
    navigation.navigate('NewPost');
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleAddPost}>
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
    backgroundColor: 'dodgerblue',
    borderRadius: '50%',
    elevation: 20,
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
});
