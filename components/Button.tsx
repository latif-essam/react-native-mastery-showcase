// Button.tsx
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {ThemePallet} from '../constants/themes';
import {useTheme} from '../hooks/useTheme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
}

const Button = ({onPress, title, type = 'primary', style}: ButtonProps) => {
  const theme = useTheme();
  const styles = stylesObj(theme);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: type === 'primary' ? theme.primary : theme.secondary},
        style,
      ]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const stylesObj = (theme: ThemePallet) =>
  StyleSheet.create({
    container: {
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      textAlign: 'center',
      color: 'white', // Text color is white for contrast
      fontSize: 12,
      fontWeight: '500',
    },
  });
