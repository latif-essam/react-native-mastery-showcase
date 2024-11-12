import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '../hooks/useTheme';
import {useNavigation} from '@react-navigation/native';

const Avatar = () => {
  const theme = useTheme();
  const navigation = useNavigation().navigate;
  return (
    <TouchableOpacity
      onPress={() => navigation('About')}
      style={[styles.container, {backgroundColor: theme.secondary}]}>
      <Icon name="user" color={theme.primary} />
    </TouchableOpacity>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    width: 22,
    height: 22,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
});
