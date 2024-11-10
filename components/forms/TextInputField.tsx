import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native';
import {ThemePallet} from '../../constants/themes';
import {capitalizeFirstLetter, trimWhitespace} from '../../utils/helpers';
import {useTheme} from '../../hooks/useTheme';

interface TextInputFieldProps extends TextInputProps {
  icon?: string;
  name: string;
  trim?: boolean;

  onChangeText: (value: string) => void;
  onBlur:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  value: string;
}

const TextInputField = ({
  icon,
  name,
  trim = true,
  onChangeText,
  onBlur,
  value,
  ...rest
}: TextInputFieldProps) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  const [shown, setShown] = useState(name === 'password' ? true : false);
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={trim ? trimWhitespace(value) : value}
        placeholder={capitalizeFirstLetter(name)}
        placeholderTextColor={theme.textSecondary}
        style={styles.input}
        // note :show password is handled here only
        secureTextEntry={shown}
        {...rest}
      />
      {icon && name === 'password' ? (
        <Pressable onPress={() => setShown(!shown)}>
          <Icon
            color={theme.textSecondary}
            name={!shown ? 'comments' : (icon as never)}
            size={16}
          />
        </Pressable>
      ) : (
        <Icon name={icon as never} size={16} color={theme.textSecondary} />
      )}
    </View>
  );
};

export default TextInputField;

const stylesObj = (theme: ThemePallet) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: theme.bg_surface,
      borderRadius: 25,
      paddingVertical: 8,
      paddingHorizontal: 14,

      marginVertical: 2,
      flexDirection: 'row',
      width: '100%',
    },
    input: {
      fontSize: 12,
      width: '95%',
      color: theme.textPrimary,
    },
  });
