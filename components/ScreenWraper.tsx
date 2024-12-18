import {StyleSheet, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {useTheme} from '../hooks/useTheme';

const ScreenWrapper = ({children}: PropsWithChildren) => {
  const theme = useTheme();
  return (
    <View style={[styles.wrapper, {backgroundColor: theme.bg}]}>
      {children}
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
