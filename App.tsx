import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useAppSelector} from './store';
import PostsScreen from './src/PostsScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const state = useAppSelector(state => state.posts);
  console.log({state});
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <Text>No</Text>
      </View>
      <PostsScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'dodgerblue',
    height: 200,
    width: '100%',
  },
});

export default App;
