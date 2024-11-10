import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
}
const Button = ({onPress, title, type = 'primary', style}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {backgroundColor: type === 'primary' ? 'dodgerblue' : 'transparent'},
        style,
      ]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: '50%',
    borderRadius: 2,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
  },
});
