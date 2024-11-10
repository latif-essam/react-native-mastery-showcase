import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewPost from '../src/NewPost';
import PostsScreen from '../src/PostsScreen';
import LoginScreen from '../src/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="Home"
          component={PostsScreen}
          options={{title: 'Welcome', headerShown: false}}
        />
        <Stack.Screen
          name="newPost"
          options={{title: 'New Post'}}
          component={NewPost}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
